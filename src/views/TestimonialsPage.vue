<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl w-screen px-2 sm:px-4 text-pretty">

        <HeadingElement>Tilbakemeldinger og historier fra brukerne</HeadingElement>
        <p class="max-w-2xl">Her finner du historier om og av personer som har fått spesialsykkel gjennom Quality Care og NAV, samt fortellinger om mestring.</p>
        
        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && posts.length === 0"
            loadingText="Laster historier..."
            errorText="Vi beklager, men vi klarte ikke å laste inn historiene akkurat nå. Prøv gjerne igjen senere."
            emptyTitle="Ingen historier funnet"
            emptyText="Vi kunne ikke finne tilbakemeldinger eller mestringshistorier for øyeblikket."
            :onRetry="fetchTestimonialsData"
            >
            <template #error-actions>
                <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                Tilbake til forsiden
                </NavigationLink>
            </template>
            
            <template #empty-actions>
                <NavigationLink :to="{ name: 'blogg' }" class="inline-block mt-6 text-sm hover:underline">
                Les bloggen vår
                </NavigationLink>
            </template>

            <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                <article v-for="post in posts" :key="post.id"
                    class="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-md hover:scale-101">
                
                    <div class="md:w-2/5 lg:w-1/3 w-full h-56 sm:h-64 md:h-auto p-4 flex-shrink-0"> 
                        <img :src="post.image" 
                            :alt="post.title" 
                            class="w-full h-full object-cover rounded" 
                            loading="lazy" />
                    </div>

                    <div class="md:w-3/5 lg:w-2/3 w-full p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                            <HeadingElement :level="2" class="mb-2">
                            
                                {{ post.title }}
                            </HeadingElement>
                            <p class="text-sm sm:text-base line-clamp-3 sm:line-clamp-4 md:line-clamp-5 mb-4">
                                {{ post.quote }}
                            </p>
                        </div>
                        <div class="mt-auto pt-2">
                            <NavigationLink
                                :to="{ name: 'blogg-post', params: { id: post.id } }"
                                class="text-xs font-semibold dark:font-normal text-primary dark:text-red-600 hover:underline after:absolute after:inset-0 z-10" 
                            >
                                Les hele innlegget
                            </NavigationLink>
                        </div>
                    </div>
                </article>
            </div>

        </DataStatusIndicator>
    </div>
</template>

<script setup>
    import { onMounted } from "vue";
    import { useTestimonials } from "@/composables/useTestimonials";
    import DataStatusIndicator from "@/components/common/DataStatusIndicator.vue";
    
    const { posts, errorState, isLoading, fetchPosts: fetchTestimonialsData } = useTestimonials();

    onMounted(async () => {
        fetchTestimonialsData();
    });
</script>