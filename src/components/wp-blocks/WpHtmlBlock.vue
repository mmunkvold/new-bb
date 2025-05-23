<template>
    <div class="prose prose-lg lg:prose-xl prose-img:rounded-lg prose-a:text-gray-700 dark:prose-a:text-gray-400 hover:prose-a:text-gray-900 dark:hover:prose-a:text-gray-200 prose-a:transition-colors prose-a:duration-150" v-html="content">
    </div>
    
</template>

<script setup>
  
    defineProps({ content: String });
    // Vurder å legge DOMPurify her også hvis du bruker denne som fallback!
</script>