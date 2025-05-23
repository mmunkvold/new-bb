<template>
    <button :class="buttonClass" type="button">
      <slot>Knappetekst</slot>
    </button>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        variant: String,
    });

    const buttonClass = computed(() => {
        const baseClasses = 'border rounded px-4 py-2 text-sm shadow-lg tracking-[0.04rem] transition-all duration-200 ease-in-out transform hover:scale-[.95] hover:shadow-md active:translate-y-1 active:shadow-sm disabled:border-none disabled:hover:opacity-100 disabled:transform-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-600';

        switch (props.variant) {
            case 'primary':
                return `${baseClasses} border-transparent bg-primary text-gray-100`;
            case 'secondary':
                return `${baseClasses} border-transparent bg-dark text-gray-100`;
            case 'white':
                return `${baseClasses} border-transparent bg-white text-dark`;
            case 'heroSecondary':
                return `${baseClasses} border-transparent bg-gradient-to-b from-gray-700 to-gray-900 text-gray-300`;
            case 'transparent':
                return `${baseClasses} dark:border-gray-800 bg-transparent`;
            case 'danger':
                return `${baseClasses} border-transparent bg-gradient-to-b from-red-500 to-primary dark:from-red-400 dark:to-red-600 text-white`;
            case 'warning':
                return `${baseClasses} border-transparent bg-gradient-to-b from-amber-200 to-amber-400 text-black`;
            case 'success':
                return `${baseClasses} border-transparent bg-gradient-to-b from-green-400 to-green-600 text-black`;
            default:
                return `${baseClasses} border-gray-300 dark:border-gray-700 bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-200`;
        }
    });

</script>