<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl">
        <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-6">
            <NavigationLink :to="{ name: 'blogg' }" class="inline-flex gap-2 items-center text-xs hover:underline text-gray-600 dark:text-gray-400">
                <ArrowLeftIcon aria-hidden="true" class="h-4 w-4" />
                Tilbake til bloggoversikten
            </NavigationLink>
        </div>

        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && !post"
            loadingText="Laster innlegg..."
            errorText="Vi beklager, men vi klarte ikke å laste inn blogginnlegget akkurat nå. Prøv gjerne igjen senere eller gå tilbake til oversikten."
            emptyTitle="Innlegg ikke funnet"
            emptyText="Vi kunne ikke finne blogginnlegget du lette etter."
            :errorHeadingLevel="2"
            :emptyHeadingLevel="2"
            :onRetry="() => fetchPost(route.params.slug)"
        >
            <template #error-actions>
                <NavigationLink :to="{ name: 'blogg' }" class="inline-block mt-6 text-sm hover:underline">
                    Tilbake til bloggoversikten
                </NavigationLink>
            </template>
    
            <template #empty-actions>
                <NavigationLink :to="{ name: 'blogg' }" class="inline-block mt-6 text-sm hover:underline">
                Tilbake til bloggoversikten
                </NavigationLink>
            </template>

            <div v-if="post">
                <article>
                    <div class="mb-8">
                        <HeadingElement v-html="post.title.rendered" class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"></HeadingElement>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div class="flex items-center">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                        </div>
                        </div>
                    </div>
        
                    <div class="content-blocks mt-8 space-y-4 md:space-y-6 prose lg:prose-lg max-w-none dark:prose-invert prose-img:rounded-md prose-img:shadow prose-a:text-primary hover:prose-a:text-red-700 dark:prose-a:text-secondary dark:hover:prose-a:text-yellow-300">
                        <component
                            v-for="(block, index) in blocks"
                            :key="block.clientId || `block-${index}`"
                            :is="getBlockComponentName(block.blockName || block.name)"
                            :className="block.className"
                            :align="block.align"
                            :anchor="block.anchor || (block.attributes || block.attrs || {}).anchor"
                            v-bind="block.attributes || block.attrs"
                            :innerBlocks="block.innerBlocks || []"
                        />
                    </div>
                </article>
    
                <section class="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-gray-700" aria-labelledby="alle-kategorier-heading">
                    <HeadingElement :level="2" id="alle-kategorier-heading" class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Utforsk andre kategorier</HeadingElement>
                    <div v-if="isLoadingCategories" class="text-sm text-gray-500 dark:text-gray-400 italic">Laster kategorier...</div>
                    <div v-else-if="categories.length > 0" class="flex flex-wrap gap-2">
                        <NavigationLink
                            v-for="category in categories"
                            :key="category.id"
                            :to="{ name: 'blogg', query: { kategori: category.slug } }"
                            class="py-1 px-3 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-qc-yellow"
                            >
                            {{ category.name }}
                            <span class="ml-0.5 text-xs opacity-75">({{ category.count }})</span>
                        </NavigationLink>
                    </div>
                    <p v-else class="text-sm text-gray-500 dark:text-gray-400">Fant ingen andre kategorier.</p>
                </section>
    
                <nav v-if="previousPost || nextPost" class="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-gray-700" aria-label="Innleggsnavigasjon">
                    <div v-if="isLoadingNeighbors" class="text-center text-sm text-gray-400 dark:text-gray-500 mb-4 italic">Leter etter nabo-innlegg...</div>
                    <div class="flex justify-between items-start gap-4 flex-wrap">
                        <div class="text-left flex-1 min-w-[45%]">
                            <router-link
                                v-if="previousPost"
                                :to="{ name: 'blogg-post', params: { slug: previousPost.slug } }"
                                class="group block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Forrige innlegg</span>
                                <span class="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-qc-yellow transition-colors flex items-center gap-2">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 opacity-75 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span class="line-clamp-2" v-html="previousPost.title.rendered"></span>
                                </span>
                            </router-link>
                            <div v-else class="p-3">&nbsp;</div>
                        </div>
        
                        <div class="text-right flex-1 min-w-[45%]">
                            <router-link
                                v-if="nextPost"
                                :to="{ name: 'blogg-post', params: { slug: nextPost.slug } }"
                                class="group block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Neste innlegg</span>
                                <span class="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-qc-yellow transition-colors flex items-center justify-end gap-2">
                                <span class="line-clamp-2" v-html="nextPost.title.rendered"></span>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 opacity-75 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                </span>
                            </router-link>
                            <div v-else class="p-3">&nbsp;</div>
                        </div>
                    </div>
                </nav>
            </div>
        </DataStatusIndicator>

        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch, provide, defineAsyncComponent } from "vue";
    import { useRoute } from 'vue-router';
    import { useHead } from '@vueuse/head';
    import decodeHtmlEntities from "@/utils/decodeHtmlEntities";
    import DataStatusIndicator from '@/components/common/DataStatusIndicator.vue';

    const WpParagraph = defineAsyncComponent(() => import('@/components/wp-blocks/WpParagraph.vue'));
    const WpHeading = defineAsyncComponent(() => import('@/components/wp-blocks/WpHeading.vue'));
    const WpImage = defineAsyncComponent(() => import('@/components/wp-blocks/WpImage.vue'));
    const WpMore = defineAsyncComponent(() => import('@/components/wp-blocks/WpMore.vue'));
    const WpSeparator = defineAsyncComponent(() => import('@/components/wp-blocks/WpSeparator.vue'));
    const WpList = defineAsyncComponent(() => import('@/components/wp-blocks/WpList.vue'));
    const WpQuote = defineAsyncComponent(() => import('@/components/wp-blocks/WpQuote.vue'));
    const WpPullquote = defineAsyncComponent(() => import('@/components/wp-blocks/WpPullquote.vue'));
    const WpGallery = defineAsyncComponent(() => import('@/components/wp-blocks/WpGallery.vue'));
    const WpEmbed = defineAsyncComponent(() => import('@/components/wp-blocks/WpEmbed.vue'));
    const WpSpacer = defineAsyncComponent(() => import('@/components/wp-blocks/WpSpacer.vue'));
    const WpColumns = defineAsyncComponent(() => import('@/components/wp-blocks/WpColumns.vue'));
    const WpColumn = defineAsyncComponent(() => import('@/components/wp-blocks/WpColumn.vue'));
    const WpHtmlBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpHtmlBlock.vue'));
    const WpUnsupportedBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpUnsupportedBlock.vue'));

    const route = useRoute();
    const isLoading = ref(true);
    const post = ref(null);
    const blocks = ref([]);
    const errorState = ref(null);
    const previousPost = ref(null);
    const nextPost = ref(null);
    const isLoadingNeighbors = ref(false);
    const categories = ref([]);
    const isLoadingCategories = ref(false);

    const baseUrl = import.meta.env.VITE_WP_API_BASE_URL || 'https://blog.quality-care.no';

    const formatDate = (dateString) => { if (!dateString) return 'Ukjent dato'; try { const date = new Date(dateString); if (isNaN(date.getTime())) return dateString; return date.toLocaleString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric', }); } catch (e) { return 'Ugyldig dato'; } };

    const fetchCategories = async () => {
        isLoadingCategories.value = true;
        try {
            const excludeIds = post.value?.categories?.join(',') || '';
            const fetchUrl = `${baseUrl}/wp-json/wp/v2/categories?orderby=name&order=asc&per_page=50&hide_empty=true${excludeIds ? '&exclude=' + excludeIds : ''}`;
            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            categories.value = data.filter(cat => cat.slug !== 'uncategorized');
        } catch (error) {
            console.error("Kunne ikke hente kategorier:", error);
            categories.value = [];
        } finally {
            isLoadingCategories.value = false;
        }
    };

    const getBlockComponentName = (blockName) => {
        if (!blockName) return WpUnsupportedBlock;
        const blockMap = {
            'core/paragraph': WpParagraph, 'core/heading': WpHeading, 'core/image': WpImage, 'core/more': WpMore,
            'core/separator': WpSeparator, 'core/list': WpList, 'core/quote': WpQuote, 'core/pullquote': WpPullquote,
            'core/gallery': WpGallery, 'core/spacer': WpSpacer, 'core/columns': WpColumns, 'core/column': WpColumn,
            'core/embed': WpEmbed, 'core/html': WpHtmlBlock
        };
        const component = blockMap[blockName];
        if (!component) { console.warn(`Unsupported block type: ${blockName}`); }
        return component || WpUnsupportedBlock;
    };

    provide('getBlockComponentName', getBlockComponentName);

    const fetchPost = async (postSlug) => {
        isLoading.value = true; 
        post.value = null; 
        blocks.value = []; 
        errorState.value = null;
        previousPost.value = null; 
        nextPost.value = null; 
        isLoadingNeighbors.value = false;
    
        if (!postSlug) { 
            errorState.value = "Ingen innlegg-sti (slug) funnet."; 
            isLoading.value = false; 
            return; 
        }

        try {
            const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?slug=${postSlug}&_embed=author,wp:featuredmedia,wp:term`);
            if (!response.ok) { 
                if (response.status === 404) { 
                    throw new Error("Fant ikke blogginnlegget."); 
                } 
                throw new Error(`HTTP feil! status: ${response.status}`); 
            }
            const dataArray = await response.json(); // API returnerer en liste når man søker med slug

            if (!dataArray || dataArray.length === 0) { // Sjekk om listen er tom
                throw new Error(`Ingen blogginnlegg funnet for stien '${slugToFetch}'.`);
            }
            const data = dataArray[0]; // Ta det første (og forventede eneste) innlegget

            if (data.status !== 'publish') {
                throw new Error("Innlegget er ikke publisert eller tilgjengelig."); 
            }

            if (data && data.title) {
            const authorName = data._embedded?.author?.[0]?.name || 'Ukjent forfatter';
            let imageUrl = null; 
            let imageAlt = null;
            const featuredMedia = data._embedded?.['wp:featuredmedia']?.[0];
            const defaultAlt = `${decodeHtmlEntities(data.title?.rendered || 'innlegg')}`;
            if (featuredMedia) {
                imageUrl = featuredMedia.media_details?.sizes?.large?.source_url || featuredMedia.media_details?.sizes?.medium_large?.source_url || featuredMedia.source_url;
                imageAlt = decodeHtmlEntities(featuredMedia.alt_text?.trim() || defaultAlt);
            } else {
                imageAlt = defaultAlt;
            }

            post.value = {
                id: data.id, 
                title: data.title, 
                slug: data.slug,
                authorName: authorName, 
                date: data.date,
                featured_image_url: imageUrl, 
                featured_image_alt: imageAlt,
                excerpt: data.excerpt, 
                content: data.content,
                categories: data.categories || [],
                metaTitle: data.yoast_head_json?.title || null,
                metaDescription: data.yoast_head_json?.description || null
            };

            if (Array.isArray(data.block_data) && data.block_data.length > 0) blocks.value = data.block_data;
            else if (Array.isArray(data.blocks) && data.blocks.length > 0) blocks.value = data.blocks;
            else if (data.content?.rendered) {
                console.warn("Bruker fallback for blokker: viser rå HTML.");
                blocks.value = [{ blockName: 'core/html', attributes: { content: data.content.rendered }, innerBlocks: [] }];
            } else { blocks.value = []; }
    
            const neighborPromise = fetchNeighborPosts(post.value.date, post.value.id);
            const categoryPromise = fetchCategories();
            await Promise.all([neighborPromise, categoryPromise]);
    
            } else { throw new Error("Ufullstendige post-data mottatt."); }
        } catch (error) {
            console.error("Kunne ikke hente innlegg:", error);
            errorState.value = error.message || "En ukjent feil oppstod.";
            post.value = null; blocks.value = [];
        } finally { isLoading.value = false; }
    };

    const fetchNeighborPosts = async (currentDateISO, currentPostSlug) => {
        isLoadingNeighbors.value = true; previousPost.value = null; nextPost.value = null;
        const prevUrl = `${baseUrl}/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=1&before=${currentDateISO}&status=publish&_fields=id,title,slug&exclude=${currentPostSlug}`;
        const nextUrl = `${baseUrl}/wp-json/wp/v2/posts?orderby=date&order=asc&per_page=1&after=${currentDateISO}&status=publish&_fields=id,title,slug&exclude=${currentPostSlug}`;
        try {
            const [prevResponse, nextResponse] = await Promise.all([fetch(prevUrl),fetch(nextUrl)]);
            if (prevResponse.ok) { const prevData = await prevResponse.json(); if (prevData.length > 0) previousPost.value = prevData[0]; } else console.warn("Kunne ikke hente forrige innlegg:", prevResponse.statusText);
            if (nextResponse.ok) { const nextData = await nextResponse.json(); if (nextData.length > 0) nextPost.value = nextData[0]; } else console.warn("Kunne ikke hente neste innlegg:", nextResponse.statusText);
        } catch (error) { console.error("Feil ved henting av nabo-innlegg:", error); }
        finally { isLoadingNeighbors.value = false; }
    };

    watch(() => route.params.slug, (newSlug, oldSlug) => {
        const validSlug = newSlug && String(newSlug).trim() !== '';
        if (validSlug && newSlug !== oldSlug) {
            fetchPost(newSlug);
        } else if (!validSlug && oldSlug !== undefined) {
            errorState.value = "Ugyldig innleggs-sti (slug).";
            isLoading.value = false;
            post.value = null;
            blocks.value = [];
        }
    }, { immediate: true });

    const generateMetaDescription = (htmlContent) => {
        if (!htmlContent) return 'Les mer på Quality Care sine nettsider.';
        try {
            let desc = htmlContent;
            if (typeof document !== 'undefined') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = desc;
            desc = tempDiv.textContent || tempDiv.innerText || '';
            } else {
            desc = String(desc).replace(/<[^>]*>/g, '');
            }
            desc = desc.replace(/\s\s+/g, ' ').trim();
            const maxLength = 155;
            if (desc.length > maxLength) {
            desc = desc.substring(0, maxLength).trimEnd() + '...';
            }
            return desc || 'Les mer på Quality Care sine nettsider.';
        } catch(e) {
            console.error("Error generating meta description", e);
            return 'Les mer på Quality Care sine nettsider.';
        }
    };

    const siteName = 'Quality Care AS ';

        const pageTitle = computed(() => {
        if (isLoading.value) return `Laster innlegg... | ${siteName}`;
        if (errorState.value || !post.value) return `Innlegg ikke funnet | ${siteName}`;
        const decodedTitle = post.value.title?.rendered ? decodeHtmlEntities(post.value.title.rendered) : 'Blogginnlegg';
        return post.value.metaTitle || `${decodedTitle} | ${siteName}`;
    });

    const pageDescription = computed(() => {
        if (isLoading.value) return 'Laster innhold for blogginnlegg...';
        if (errorState.value || !post.value) return 'Kunne ikke laste innholdet for dette innlegget.';
        return post.value.metaDescription || generateMetaDescription(post.value.excerpt?.rendered || post.value.content?.rendered || '');
    });

    const ogImageUrl = computed(() => {
        let imageUrl = post.value?.featured_image_url || '/default-og-image.jpg';
        let defaultOgImage = '/placeholder.png';
        if (imageUrl === '/placeholder.png') {
            imageUrl = defaultOgImage;
        }
        if (imageUrl && typeof window !== 'undefined' && !imageUrl.startsWith('http')) {
            try {
            imageUrl = new URL(imageUrl, window.location.origin).href;
            } catch (e) {
            console.error("Kunne ikke lage absolutt OG image URL:", e);
            imageUrl = new URL(defaultOgImage, window.location.origin).href; 
            }
        } else if (!imageUrl || imageUrl === '/placeholder.png') {
            imageUrl = new URL(defaultOgImage, window.location.origin).href; 
        } else if (!imageUrl) { 
            imageUrl = new URL(defaultOgImage, window.location.origin).href;
        }
        return imageUrl;
    });

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

</script>