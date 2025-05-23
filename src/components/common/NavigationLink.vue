<template>
    <a
        v-if="isExternal"
        target="_blank"
        rel="noopener"
        :class="{ 'underline': !props.noUnderline }"
        :href="props.to"
        >
        <slot></slot>
    </a>
    <router-link 
        v-else 
        v-bind="props" 
        :class="{ 'underline': !props.noUnderline }"
        >
        <slot></slot>
    </router-link>
</template>

<script setup>
    import { RouterLink } from "vue-router";
    import { computed } from "vue";
    
    const props = defineProps({
        ...RouterLink.props,
        noUnderline: {     
            type: Boolean,
            default: false 
        }
    });

    const isExternal = computed(() => {
        return typeof props.to === "string" && props.to.startsWith("http");
    });
</script>
