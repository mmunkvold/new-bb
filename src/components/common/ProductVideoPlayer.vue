<template>
    <div>
        <div v-if="!showVideo" @click="showVideo = true" class="relative cursor-pointer group aspect-video rounded-lg shadow-md overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img
                :src="thumbnailUrl"
                :alt="`Thumbnail for ${productName}`"
                @error="onThumbnailError"
                loading="lazy"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 flex justify-center items-center bg-black/40 group-hover:bg-black/50 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="64" height="64" aria-hidden="true">
                    <path d="M8 5v14l11-7z"></path>
                </svg>
            </div>
        </div>
        <div v-if="showVideo" class="aspect-video rounded-lg shadow-md overflow-hidden">
            <iframe
                :src="embedUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                class="w-full h-full bg-black"
                :title="`${productName} video`"
            >
            </iframe>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';

    const props = defineProps({
        videoUrl: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            default: 'Produkt'
        }
    });

    const showVideo = ref(false);

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        let videoId = null;
        try {
            const urlObj = new URL(url);
            videoId = urlObj.searchParams.get('v');
            if (!videoId && urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1);
            else if (!videoId && urlObj.pathname.includes('/embed/')) videoId = urlObj.pathname.split('/embed/')[1];
        } catch (e) {}
            if (!videoId) {
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            videoId = match ? match[1] : null;
        }
            if (videoId) {
            const queryIndex = videoId.indexOf('?'); if (queryIndex !== -1) videoId = videoId.substring(0, queryIndex);
            const hashIndex = videoId.indexOf('#'); if (hashIndex !== -1) videoId = videoId.substring(0, hashIndex);
        }
            return videoId;
    };

    const videoId = computed(() => getYouTubeVideoId(props.videoUrl));

    const thumbnailUrl = computed(() => {
        return videoId.value ? `https://i.ytimg.com/vi/${videoId.value}/maxresdefault.jpg` : '/placeholder-image.jpg';
    });

    const embedUrl = computed(() => {
        return videoId.value ? `https://www.youtube-nocookie.com/embed/${videoId.value}?autoplay=1&rel=0&modestbranding=1&showinfo=0` : '';
    });

    const onThumbnailError = (event) => {
        const currentSrc = event.target.src;
        if (currentSrc.includes('maxresdefault.jpg')) {
            const ytId = videoId.value;
            if (ytId) event.target.src = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
            else event.target.src = '/placeholder-image.jpg';
        } else {
            event.target.src = '/placeholder-image.jpg';
        }
    };
</script>

<style scoped>
    @supports not (aspect-ratio: 16 / 9) {
        .aspect-video {
            padding-bottom: 56.25%; position: relative; height: 0; overflow: hidden;
        }
        .aspect-video > img, .aspect-video > iframe {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        }
    }
</style>