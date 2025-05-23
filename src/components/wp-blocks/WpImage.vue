<template>
    <figure v-if="url" class="block mx-auto max-w-lg my-8 lg:my-12" 
    >
        <div class="aspect-video rounded-md"> 
            <img
            :src="url"
            :alt="altTextComputed"
            class="w-full h-full object-cover rounded-lg" 
            loading="lazy"
            />
        </div>
        <figcaption
            v-if="caption"
            class="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 px-1"
            v-html="caption"
        ></figcaption>
    </figure>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        url: String,
        alt: String,
        caption: String,
        align: String,    
        className: String,
    });

    const altTextComputed = computed(() => {
        if (props.alt?.trim()) return props.alt;
        if (props.caption?.trim()) {
        let textContent = props.caption.replace(/<[^>]*>/g, ' ').replace(/\s\s+/g, ' ').trim();
        return textContent || 'Illustrasjonsbilde';
        }
        return 'Illustrasjonsbilde'; 
    });
</script>

<style scoped>
.no-top-margin {
    margin-top:-24px !important;
    border:2px solid pink !important;
}</style>