<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <HeadingElement :level="2" class="text-center mb-10 md:mb-16">
            Nyheter & aktuelt
        </HeadingElement>
        <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <LatestBlogPost class="p-4 bg-white dark:bg-gray-950 shadow-xl rounded-lg overflow-hidden"/>
            <SoMePost />
        </div>
    </div>  
</template>

<script setup>
    import LatestBlogPost from './LatestBlogPost.vue';
    import SoMePost from './SoMePost.vue';
</script>