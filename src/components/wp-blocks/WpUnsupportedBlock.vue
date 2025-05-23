<template>
    <div class="p-4 border border-dashed border-red-300 bg-red-50 dark:bg-none dark:border-red-500 text-primary text-sm rounded-md my-4">
        <p><strong>Unsupported block type:</strong> {{ blockName }}</p>
        <p class="mt-2 text-xs">This content block cannot be displayed correctly yet.</p>
        <pre v-if="attributes" class="mt-2 text-xs bg-red-100 dark:bg-none dark:border dark:border-red-500 p-2 rounded overflow-auto">{{ attributes }}</pre>
    </div>
</template>
  
<script setup>
    defineProps({
        blockName: String,
        attributes: Object
    });
</script>