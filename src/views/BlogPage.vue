<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl w-screen px-2 sm:px-4 text-pretty">
        <HeadingElement>Blogg</HeadingElement>

        <div class="mt-4 mb-8 grid md:grid-cols-3 gap-10 items-start">
            <div class="md:col-span-2">
                <p class="sr-only">Filtrer etter kategori</p>
                <p v-if="loadingCategories" class="text-gray-500 text-sm italic">Laster kategorier...</p>
                <div v-else-if="categories.length > 0">
                    <FilterButtons
                        :filters="categoryFilterItems"
                        :activeFilter="selectedCategoryId"
                        @update:activeFilter="selectCategory"
                    />
                </div>
                <p v-else class="text-gray-500 text-sm">Fant ingen kategorier.</p>
            </div>

            <div class="relative">
                <label for="blog-search" class="sr-only">Søk i bloggen</label>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="blog-search"
                    v-model="searchQuery"
                    placeholder="Søk i innlegg..."
                    autocomplete="off"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
            </div>
        </div>

        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && posts.length === 0"
            :loadingText="`Laster innlegg${selectedCategoryId !== null || searchQuery ? ' som matcher filtrene' : ''}...`"
            errorText="Vi klarte ikke å laste inn blogginnlegg akkurat nå. Sjekk gjerne nettverkstilkoblingen din og prøv igjen."
            emptyTitle="Ingen blogginnlegg funnet"
            :emptyText="`Fant ingen blogginnlegg${selectedCategoryId !== null || searchQuery ? ' som matchet filtrene.' : '.'}`"
            :onRetry="() => refetchPosts(selectedCategoryId, searchQuery)"
        >
            <template #error-actions>
                <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                    Gå til forsiden
                </NavigationLink>
            </template>
            
            <template #empty-actions>
                <button v-if="selectedCategoryId !== null || searchQuery" @click="clearFilters" 
                    class="mt-6 inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    type="button"
                >
                    Nullstill filtre
                </button>
                <NavigationLink v-else :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                    Gå til forsiden
                </NavigationLink>
            </template>

            <div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <article v-for="post in posts" :key="post.id" class="relative outline-offset-2 transition-shadow duration-200 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:scale-101">
                        <div class="block aspect-video p-4 max-w-sm">
                            <img v-if="post.featured_image_url" :src="post.featured_image_url" :alt="post.featured_image_alt" class="w-full h-48 object-cover rounded" loading="lazy">
                            <img v-else src="/placeholder.png" alt="Bilde ikke funnet" class="min-w-full h-48 object-cover rounded" loading="lazy">
                        </div>

                        <div class="p-5 flex flex-col flex-1">
                            <time :datetime="post.date" class="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
                                {{ formatDate(post.date) }}
                            </time>
                            <HeadingElement :level="2" class="mb-2">
                                    <span v-html="post.title.rendered"></span>
                            </HeadingElement>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow leading-relaxed" v-html="post.excerpt.rendered">
                            </p>
                            <div class="mt-auto">
                                <NavigationLink
                                    :to="{ name: 'blogg-post', params: { slug: post.slug } }"
                                    class="text-xs font-semibold dark:font-normal text-primary dark:text-red-600 hover:underline after:absolute after:inset-0 z-10"
                                >
                                Les hele innlegget
                                </NavigationLink>
                            </div>
                        </div>
                    </article>
                </div>        
        
                <div class="mt-12 text-center">
                    <div v-if="loadingMore" class="text-center py-10">
                        <BicycleLoader />
                        <p class="text-gray-500 dark:text-gray-400 italic mt-2">Laster flere innlegg...</p>
                    </div>

                    <div v-if="!loadingPosts && !loadingMore && posts.length > 0 && currentPage >= totalPages" class="mt-12 text-center">
                        <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                            Alle innlegg er lastet inn.
                        </p>
                    </div>
                </div>
            </div>
        </DataStatusIndicator>
    </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted, onUnmounted } from "vue";
    import { usePosts } from "@/composables/usePosts";
    import { useHead } from '@vueuse/head';
    import DataStatusIndicator from "@/components/common/DataStatusIndicator.vue";

    const {
        posts,
        categories,
        loading: loadingPosts,
        loadingCategories,
        loadingMore,
        currentPage,
        totalPages,
        errorState,
        formatDate,
        refetchPosts,
        loadMore,
        fetchCategories
    } = usePosts({ postsPerPage: 12 });

    const selectedCategoryId = ref(null);
    const searchQuery = ref('');
    let debounceTimer = null;

    const isLoading = computed(() => loadingPosts.value && posts.value.length === 0);

    const categoryFilterItems = computed(() => {
        const allCategoriesButton = { 
            key: null,
            label: 'Alle kategorier', 
            isSpecial: true,
            count: totalPostCount.value
        };

        const individualCategoryButtons = categories.value.map(category => ({
            key: category.id,
            label: category.name,
            isSpecial: false,
            count: category.count
        }));

        return [allCategoriesButton, ...individualCategoryButtons];
    });

    const totalPostCount = computed(() => {
        if (!categories.value) return 0;
        return categories.value.reduce((sum, cat) => sum + (cat.count ?? 0), 0);
    });


    const selectCategory = (categoryId) => {
        if (selectedCategoryId.value === categoryId) {
            if (categoryId !== null) {
                selectedCategoryId.value = null;
                refetchPosts(null, searchQuery.value);
            }
            return;
        };
        selectedCategoryId.value = categoryId;
        refetchPosts(selectedCategoryId.value, searchQuery.value);
    };

    const debouncedFetchPosts = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            refetchPosts(selectedCategoryId.value, searchQuery.value);
        }, 500);
    };

    watch(searchQuery, debouncedFetchPosts);

    /* const loadMorePosts = () => {
        loadMore(selectedCategoryId.value, searchQuery.value);
    }; */

    const clearFilters = () => {
        selectedCategoryId.value = null;
        searchQuery.value = ''; 
        refetchPosts(null, '');
    };

    const canLoadMorePosts = computed(() => {
        return !loadingMore.value && posts.value.length > 0 && currentPage.value < totalPages.value;
    });

    /* const showLoadMore = computed(() => {
        return !loadingPosts.value && posts.value.length > 0 && currentPage.value < totalPages.value;
    }); */

    const handleScroll = () => {
  // Sjekker om brukeren er nær bunnen av dokumentet
  // (window.innerHeight + window.scrollY) er hvor langt ned brukeren har scrollet + høyden på vinduet
  // document.documentElement.offsetHeight er den totale høyden på hele siden
  // 200 (offset) er en buffer slik at vi laster litt før brukeren når helt bunnen
        const offset = 200; 
        if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - offset) {
            if (canLoadMorePosts.value) {
                loadMore(selectedCategoryId.value, searchQuery.value);
            }
        }
    };

    useHead({
        title: pageTitle,
        meta: computed(() => [
            { name: 'description', content: pageDescription.value },
            { property: 'og:title', content: pageTitle.value },
            { property: 'og:description', content: pageDescription.value },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: ogImageUrl.value },
            { property: 'og:url', content: typeof window !== 'undefined' ? window.location.href : '' },
        ]),
        link: computed(() => [
            { rel: 'canonical', href: typeof window !== 'undefined' ? window.location.href : '' }
        ])
    })

    onMounted(() => {
    // fetchCategories(); // Kalles fra usePosts sin onMounted nå
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>