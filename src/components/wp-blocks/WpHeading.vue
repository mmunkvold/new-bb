<template>
    <component :is="tagName" :class="headingClasses" v-html="content"></component>
</template>

<script setup>
    import { computed } from 'vue';
    const props = defineProps({
        content: String,
        level: { type: Number, default: 2 }, // H2 er vanlig default
        textAlign: String
    });

    const tagName = computed(() => `h${props.level}`);

    const headingClasses = computed(() => {
        let classes = 'font-bold text-gray-900 mb-3 ';
        switch (props.level) {
            case 1: classes += 'text-4xl lg:text-5xl mt-6'; break;
            case 2: classes += 'text-3xl lg:text-4xl mt-8'; break;
            case 3: classes += 'text-2xl lg:text-3xl mt-6'; break;
            case 4: classes += 'text-xl lg:text-2xl mt-5'; break;
            default: classes += 'text-xl lg:text-2xl mt-5'; break;
        }
        if (props.textAlign === 'center') classes += ' text-center';
        if (props.textAlign === 'right') classes += ' text-right';
        return classes;
    });
</script>