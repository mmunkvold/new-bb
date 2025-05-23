<template>
    <component :is="`h${level}`">
        <slot></slot>
    </component>
</template>
  
<script setup>
    const props = defineProps({
        level: {
            type: Number,
            default: 1,
            validator: (value) => {
                return value >= 1 && value <= 6;
            },
        },
    });
</script>
    