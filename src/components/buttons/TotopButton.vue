<template>
    <BaseButton 
        id="totop" 
        @click="scrollToTop"
        class="flex border border-gray-500 text-gray-600 dark:text-gray-300 text-xs hover:border-black hover:text-black hover:dark:border-white hover:dark:text-white fixed z-50 bottom-28 right-1 sm:bottom-48 sm:right-2"
        v-show="showButton"
        type="button"
    >
        <ArrowUpIcon class="w-4 h-4 font-bold mr-1.5" />
        til toppen
    </BaseButton>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

     let showButton = ref(false);

    const checkScroll = () => {
        window.scrollY > 500 ? showButton.value = true : showButton.value = false;
    };

    onMounted(() => {
        window.addEventListener('scroll', checkScroll);
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', checkScroll);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
</script>