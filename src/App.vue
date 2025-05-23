<template>
    <BaseLayout />
</template>

<script setup>
    import BaseLayout from './components/layouts/BaseLayout.vue';
    import { useRoute } from 'vue-router'
    import { useHead } from '@vueuse/head'

    const route = useRoute()

    const siteName = 'Quality Care AS'

    useHead(() => {
        const pageMeta = route.meta || {};
        const pageTitle = route.meta?.title;
        const metaTags = pageMeta.meta || [];
        const linkTags = pageMeta.link || []; 
        
        return {
            title: pageTitle ? `${pageTitle} | ${siteName}` : siteName,
            meta: metaTags,
            link: linkTags
        }
    })
</script>