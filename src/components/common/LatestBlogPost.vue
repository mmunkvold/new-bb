<template>
    <p v-if="isLoading" class="flex justify-center items-center py-10">Laster...</p>
    <p v-else-if="errorMsg" class="text-center bg-gray-100 dark:bg-gray-900 p-4">
        {{ errorMsg }}
    </p>

    <article v-else-if="post" class="flex flex-col h-full"> 
        <span class="text-xs text-primary dark:text-red-500 font-semibold uppercase tracking-wider mb-1">Fra bloggen</span>
        <div v-if="post.image" class="px-5 pt-5">
            <img :src="post.image.src" :alt="post.image.alt" class="w-full h-40 object-cover rounded-t" />
        </div>

        <div class="p-5 flex flex-col flex-1">
            
            <HeadingElement :level="3">
                <NavigationLink :to="{ name: 'blogg-post', params: { slug: post.slug } }" class="">
                    {{ post.title }} 
                </NavigationLink>
            </HeadingElement>

            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">{{ post.excerpt }}.</p> 

            <div class="mt-auto sm:flex flex-col sm:flex-row text-left justify-between items-center text-xs text-gray-500 dark:text-gray-300">
                <div class="flex basis-full justify-between mb-3 sm:mb-0">
                    <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                   
                    <NavigationLink :to="{ name: 'blogg-post', params: { slug: post.slug } }" class="inline-block text-primary dark:text-red-500 font-bold dark:font-normal"> 
                        Les hele innlegget 
                    </NavigationLink>
               
                </div>
                <div class="basis-full text-right">
                    <NavigationLink :to="{ name: 'blogg'}" class="text-right inline-block text-gray-700 dark:text-gray-300 hover:underline"> 
                    Se flere blogginnlegg
                </NavigationLink>
                </div>
                
               
            </div>

        </div>
    </article>

    <p v-else class="text-center text-gray-500 py-10">Fant ingen blogginnlegg.</p>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import decodeHtmlEntities from "@/utils/decodeHtmlEntities";

    const post = ref(null);
    const isLoading = ref(true);
    const errorMsg = ref(null); 

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

    const fetchLatestPost = async () => {
    isLoading.value = true;
    post.value = null; 
    errorMsg.value = null; 

        try {
            const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?per_page=1&_embed=wp:featuredmedia`;
            const response = await fetch(apiUrl); 

            if (!response.ok) {
                throw new Error(`Nettverksfeil: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data && data.length > 0) {
            const latestPost = data[0]; 

            const featuredMedia = latestPost._embedded?.['wp:featuredmedia']?.[0];
            
            let imageSrc = placeholderImageUrl;
            let imageAlt = `Illustrasjonsbilde for ${decodeHtmlEntities(latestPost.title?.rendered || 'blogginnlegg')}`;
            
            if (featuredMedia) {
                imageSrc = featuredMedia.media_details?.sizes?.medium_large?.source_url 
                        || featuredMedia.media_details?.sizes?.large?.source_url 
                        || featuredMedia.source_url 
                        || placeholderImageUrl;
                imageAlt = decodeHtmlEntities(featuredMedia.alt_text?.trim() || imageAlt); 
            }
            const imageData = { src: imageSrc, alt: imageAlt };

            const cleanedTitle = decodeHtmlEntities(latestPost.title.rendered);
            let cleanedExcerpt = decodeHtmlEntities(latestPost.excerpt.rendered);
            cleanedExcerpt = cleanedExcerpt.replace(/<\/?p>/g, '').trim(); 

            post.value = {
                slug: latestPost.slug,
                title: cleanedTitle,
                excerpt: cleanedExcerpt,
                image: imageData,
                date: latestPost.date
            };

            } else {
                console.warn("Ingen innlegg funnet fra API.");
            }
        } catch (error) {
            console.error("Kunne ikke hente siste blogginnlegg:", error);
            errorMsg.value = "Kunne ikke laste inn siste blogginnlegg. Prøv igjen senere."; 
        } finally {
                isLoading.value = false;
        }
    };

    onMounted(fetchLatestPost);
</script>