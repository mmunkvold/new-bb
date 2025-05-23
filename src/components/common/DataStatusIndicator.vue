<template>
    <div>
        <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400 py-10">
            <slot name="loading">
                <BicycleLoader aria-hidden="true" />
                <p class="mt-4 text-lg italic">{{ loadingText }}</p>
            </slot>
        </div>

        <div v-else-if="error" class="text-center text-gray-500 dark:text-gray-400 py-10">
            <slot name="error">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <HeadingElement :level="errorHeadingLevel" class="mt-2 text-lg font-medium dark:!text-gray-400">{{ errorTitle }}</HeadingElement>
                <p class="mt-2 text-sm">{{ errorText }}</p>
                <div class="mt-6 space-x-4">
                    <BaseButton 
                        v-if="onRetry" 
                        @click="onRetry" 
                        type="button"
                        class="inline-flex items-center "
                    >
                        Prøv igjen
                    </BaseButton>
                    <slot name="error-actions"></slot>
                </div>
            </slot>
        </div>

        <div v-else-if="isEmpty" class="text-center text-gray-500 dark:text-gray-400 py-10">
            <slot name="empty">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <HeadingElement :level="emptyHeadingLevel" class="mt-2 text-lg font-medium text-gray-900 dark:text-white">{{ emptyTitle }}</HeadingElement>
                <p class="mt-2 text-sm">{{ emptyText }}</p>
                <div class="mt-6">
                    <slot name="empty-actions"></slot>
                </div>
            </slot>
        </div>

        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

    defineProps({
        isLoading: {
            type: Boolean,
            default: false
        },
        error: {
            type: [Boolean, String, Object, Error],
            default: null
        },
        isEmpty: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: 'Laster...'
        },
        errorTitle: {
            type: String,
            default: 'Oisann! Noe gikk galt'
        },
        errorText: {
            type: String,
            default: 'Vi beklager, men vi klarte ikke å laste inn dataene akkurat nå. Prøv gjerne igjen senere.'
        },
        emptyTitle: {
            type: String,
            default: 'Ingen data funnet'
        },
        emptyText: {
            type: String,
            default: 'Vi fant ingen elementer som passer valget ditt.'
        },
        errorHeadingLevel: {
            type: Number,
            default: 2
        },
        emptyHeadingLevel: {
            type: Number,
            default: 2
        },
        onRetry: {
        type: Function,
        default: null 
        }
    });
</script>