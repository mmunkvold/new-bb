<template>
    <div>
        <section class="xl:mb-66">
            <HeroSection />
        </section>

        <section class="py-12 sm:py-16">
            <QCFeaturesComponent />
        </section>
        
        <section id="process" class="full-width py-12 sm:py-16"> 
            <ProcessComponent />
        </section> 

        <section class="full-width bg-primary dark:bg-red-600">
            <div class="mx-auto max-w-[1400px] flex flex-col sm:flex-row h-96">
                <div class="relative w-full h-full">
                    <video ref="videoPlayer" autoplay muted loop playsinline 
                        class="w-full h-full object-cover"
                        aria-label="Bakgrunnsvideo: Person sykler på liggesykkel nedover den svingete veien til Geiranger">
                        <source :src="coverVideo" type="video/mp4" />
                        <track kind="descriptions" src="/geiranger.vtt" srclang="no" label="Synstolking">
                        Din nettleser støtter ikke video.
                    </video>
                    <button 
                        @click="togglePlay" 
                        :aria-label="isPlaying ? 'Pause video' : 'Spill av video'"
                        class="absolute bottom-4 left-4 z-10 text-xs px-3 py-1 bg-gray-500 bg-opacity-50 rounded text-white hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        type="button"
                    >
                        {{ isPlaying ? '| |' : '▶' }}
                        </button>
                </div>
                <div class="w-full bg-primary text-white text-center flex flex-col justify-center items-center py-10">
                    <img src="@/assets/images/all-bikes.png" alt="3 tegnede hvite liggesykler" class="max-w-1/3 mb-2" />
                    <HeadingElement :level="2" class="!text-2xl sm:!text-3xl mb-4 !text-white">Utforsk vårt utvalg</HeadingElement>
                    <p class="text-lg max-w-sm !text-white">Se vårt brede sortiment av spesialsykler og finn modellen som passer best</p>
                    <NavigationLink :to="{ name: 'produkter'}" class="mt-7 inline-block bg-gray-900 hover:bg-gray-950 text-gray-100 link-btn !text-base">
                        se alle våre sykler
                    </NavigationLink>
                </div>                
            </div>
        </section>

        <section class="mt-36 sm:mt-0 py-12 sm:py-26">
            <TestimonialsComponent />
        </section>

        <section class="full-width bg-gray-100 dark:bg-gray-900 py-12 sm:py-16">
            <ActivitiesComponent />
        </section>

        <section id="20" class="full-width bg-primary text-white py-12 sm:py-16">
            <AnniversaryComponent />
        </section>

        <section class="full-width relative" :style="{ backgroundImage: `url(${wall})` }">
            <div class="absolute inset-0 bg-black opacity-0 dark:opacity-50 transition-opacity duration-300" aria-hidden="true" style="z-index: 0;"></div>
            <div class="relative" style="z-index: 1;">
                <BlogSoMeComponent />
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import HeroSection from '../components/common/HeroSection.vue'
    import TestimonialsComponent from '@/components/common/TestimonialsComponent.vue';
    import QCFeaturesComponent from '@/components/common/QCFeaturesComponent.vue';
    import ProcessComponent from '@/components/common/ProcessComponent.vue';
    import ActivitiesComponent from '@/components/common/ActivitiesComponent.vue';
    import coverVideo from '@/assets/videos/cover-video.mp4';
    import AnniversaryComponent from '@/components/common/AnniversaryComponent.vue';
    import wall from '@/assets/images/brick-wall.png';
    import BlogSoMeComponent from '@/components/common/BlogSoMeComponent.vue';

    const videoPlayer = ref(null);
    const isPlaying = ref(true);

    const togglePlay = () => {
        if (!videoPlayer.value) return;

        if (isPlaying.value) {
            videoPlayer.value.pause();
        } else {
            videoPlayer.value.play();
        }
        isPlaying.value = !isPlaying.value; 
    };

    onMounted(() => {
        if (videoPlayer.value) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                if (!videoPlayer.value.paused) {
                    videoPlayer.value.pause();
                    isPlaying.value = false;
                }
            } else {
                isPlaying.value = !videoPlayer.value.paused;
            }
        }
    });
</script>