<template>
    <div class="max-w-6xl mx-auto">
        <HeadingElement :level="2" class="text-center">
            Nyheter & aktuelt
        </HeadingElement>
        <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div class="lg:col-span-2 relative bg-white dark:bg-gray-900 shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden before:content-[''] before:absolute before:inset-y-0 before:left-1/2 before:-translate-x-1/2 before:w-10 before:bg-gradient-to-r before:from-white/0 before:via-black/10 before:to-white/0 before:hidden md:before:block">
                <div class="w-full md:w-1/2 p-5 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
                    <LatestBlogPost />
                </div>
    
                <div class="w-full md:w-1/2 p-5">
                    <NewsFromCompany />
                </div>
            </div>
            <SoMePost />
        </div>
    </div>   
</template>

<script setup>
    import LatestBlogPost from './LatestBlogPost.vue';
    import NewsFromCompany from './NewsFromCompany.vue';
    import SoMePost from './SoMePost.vue';

</script>