import { ref, readonly, onMounted } from 'vue';

const baseUrl = import.meta.env.VITE_WP_API_BASE_URL || '/';
const placeholderImageUrl = "/placeholder.png";

const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return dateString; }
};

export function usePosts(options = { postsPerPage: 9 }) {
    const posts = ref([]);
    const categories = ref([]);
    const isLoading = ref(false);
    const isLoadingCategories = ref(false);
    const isLoadingMore = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const errorState = ref(null);

    const postsPerPage = ref(options.postsPerPage);

    const fetchCategories = async () => {
        if (isLoadingCategories.value) return;
        isLoadingCategories.value = true;
        // errorState.value = null; // Vurder om feil i kategorilasting skal nullstille hovedfeil
        try {
            const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories?orderby=name&order=asc&per_page=50&hide_empty=true`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} ved henting av kategorier.`);
            const data = await response.json();
            categories.value = data.filter(cat => cat.slug !== 'uncategorized').map(cat => ({...cat, count: cat.count ?? 0}));
        } catch (error) {
            console.error("Kunne ikke hente kategorier:", error);
            categories.value = [];
            if (!errorState.value) errorState.value = "Kunne ikke laste kategorier.";
        } finally {
            isLoadingCategories.value = false;
        }
    };

    const fetchPosts = async (page = 1, append = false, categoryId = null, searchQuery = '') => {
        if (!append) {
            isLoading.value = true;
            posts.value = [];
        } else {
            isLoadingMore.value = true;
        }
        if (page === 1 && !append) { 
            errorState.value = null;
        }

        const params = new URLSearchParams();
        params.append('_embed', 'wp:featuredmedia');
        params.append('orderby', 'date');
        params.append('order', 'desc');
        params.append('per_page', postsPerPage.value.toString());
        params.append('page', page.toString());
        if (categoryId !== null && categoryId !== undefined && String(categoryId).trim() !== '') { params.append('categories', categoryId); }
        const query = searchQuery?.trim() ?? '';
        if (query !== '') { params.append('search', query); }

        const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`;

        try {
            const response = await fetch(apiUrl);
            const totalPagesHeader = response.headers.get('X-WP-TotalPages');
            totalPages.value = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} ved henting av innlegg.`);
            const data = await response.json();

            const mappedPosts = data.map(post => {
                let imageUrl = placeholderImageUrl;
                let imageAlt = `Bilde for ${post.title?.rendered || 'innlegg'}`;
                const media = post._embedded?.['wp:featuredmedia']?.[0];
                if (media) {
                    imageUrl = media.media_details?.sizes?.medium_large?.source_url
                                || media.media_details?.sizes?.large?.source_url
                                || media.source_url
                                || placeholderImageUrl;
                    imageAlt = media.alt_text?.trim() || imageAlt;
                }
                return {
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    date: post.date,
                    content: post.content,
                    featured_image_url: imageUrl, 
                    featured_image_alt: imageAlt 
                };
            });

            if (append) {
                posts.value.push(...mappedPosts);
            } else {
                posts.value = mappedPosts;
            }
            currentPage.value = page;

        } catch (error) {
            console.error(`Kunne ikke hente innlegg (side ${page}):`, error);
            if (!append) { posts.value = []; totalPages.value = 1; currentPage.value = 1; }
            errorState.value = error.message || "Kunne ikke laste innlegg.";
        } finally {
            isLoading.value = false;
            isLoadingMore.value = false;
        }
    };
    
    const refetchPosts = async (categoryId = null, searchQuery = '') => {
        await fetchPosts(1, false, categoryId, searchQuery);
    };

    const loadMore = async (categoryId = null, searchQuery = '') => {
        if (!isLoadingMore.value && currentPage.value < totalPages.value) {
            const nextPage = currentPage.value + 1;
            await fetchPosts(nextPage, true, categoryId, searchQuery);
        }
    };

    onMounted(() => {
        fetchCategories();
        fetchPosts(1, false, null, '');
    });

    return {
        posts: readonly(posts),
        categories: readonly(categories),
        loading: readonly(isLoading),
        loadingCategories: readonly(isLoadingCategories),
        loadingMore: readonly(isLoadingMore),
        currentPage: readonly(currentPage),
        totalPages: readonly(totalPages),
        errorState: readonly(errorState),
        formatDate,
        refetchPosts,
        loadMore,
        fetchCategories
    };
}