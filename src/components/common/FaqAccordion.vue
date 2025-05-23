<template>
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadingElement :level="2" v-if="title" class="md:text-center">
            {{ title }}
        </HeadingElement>
        <div class="mt-6 space-y-3">
            <div
                v-for="item in localItems"
                :key="item.id"
                class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm"
            >
                <button
                    @click="toggleFaq(item.id)"
                    class="flex justify-between items-center w-full text-left p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900/50 focus:outline-none"
                    type="button"
                >
                    {{ item.question }}
                    <span
                        class="text-gray-500 transform transition-transform duration-300 ease-in-out"
                        :class="{ 'rotate-180': item.open }"
                    >
                        <svg class="h-5 w-5 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
                <transition name="fade-faq">
                    <div
                        v-if="item.open"
                        class="p-3 border-t border-gray-200 dark:border-none"
                    >
                        <p>{{ item.answer }}</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        title: String,
        items: {
            type: Array,
            required: true
        }
    })

    const localItems = ref(props.items.map(item => ({
        ...item,
        open: false,
        id: item.id ?? crypto.randomUUID()
    })))

    const toggleFaq = id => {
        localItems.value = localItems.value.map(item => ({
            ...item,
            open: item.id === id ? !item.open : item.open
        }))
    }
</script>

<style scoped>
    .fade-faq-enter-active,
    .fade-faq-leave-active {
        transition: opacity 0.3s ease-in-out;
    }

    .fade-faq-enter-from,
    .fade-faq-leave-to {
        opacity: 0;
    }
</style>
