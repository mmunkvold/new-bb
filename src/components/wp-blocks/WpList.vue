// Fil: @/components/wp-blocks/WpList.vue - KORRIGERT

<template>
  <component
    :is="tag"
    :class="['wp-block-list', blockAttributes.className]" :style="blockStyles"
    :start="tag === 'ol' ? blockAttributes.start : undefined"
    :type="tag === 'ol' ? blockAttributes.type : undefined"
    :id="blockAttributes.anchor"
    v-bind="extraAttributes"
  >
    <template v-if="innerBlocks && innerBlocks.length > 0">
      <li
        v-for="(itemBlock, index) in innerBlocks"
        :key="itemBlock.clientId || `li-${index}`"
        v-bind="getListItemAttrs(itemBlock).anchor ? { id: getListItemAttrs(itemBlock).anchor } : {}"
      >
         <span v-if="getListItemAttrs(itemBlock).content" v-html="getListItemAttrs(itemBlock).content"></span>

        <template v-if="itemBlock.innerBlocks && itemBlock.innerBlocks.length > 0">
             <component
                v-for="(nestedBlock, nestedIndex) in itemBlock.innerBlocks"
                :key="nestedBlock.clientId || `nested-${nestedIndex}`"
                :is="getBlockComponentName(nestedBlock.blockName || nestedBlock.name)"
                :attributes="nestedBlock.attributes" 
                :attrs="nestedBlock.attrs"         
                :innerBlocks="nestedBlock.innerBlocks || []"
              />
         </template>
         <template v-else-if="!getListItemAttrs(itemBlock).content">
             </template>
      </li>
    </template>

    <template v-else-if="blockAttributes.values">
      <span v-html="blockAttributes.values"></span>
    </template>
  </component>
</template>

<script setup>
import { computed, inject, defineAsyncComponent } from 'vue';

// --- Inject getBlockComponentName (samme som før) ---
const getBlockComponentNameInjected = inject('getBlockComponentName');
const WpUnsupportedBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpUnsupportedBlock.vue')); // Sørg for at stien stemmer
const getBlockComponentName = (blockName) => {
    if (!getBlockComponentNameInjected) {
        console.error('getBlockComponentName was not provided.');
        return WpUnsupportedBlock;
    }
    return getBlockComponentNameInjected(blockName);
};
// --- Slutt på inject ---

const props = defineProps({
  // Definer begge som mulige props fra forelderkomponenten
  attributes: { type: Object, default: () => ({}) },
  attrs: { type: Object, default: null }, // Kan være null hvis 'attributes' brukes
  innerBlocks: { type: Array, default: () => [] },
});

// --- NY Computed: Slår sammen attrs og attributes for hovedblokken ---
// Prioriterer props.attrs hvis den finnes og ikke er null, ellers brukes props.attributes
const blockAttributes = computed(() => {
  // Hvis props.attrs er et objekt med nøkler, bruk det, ellers bruk props.attributes
  return (props.attrs && Object.keys(props.attrs).length > 0) ? props.attrs : props.attributes;
});

// --- NY Hjelpefunksjon: Henter attributter for et list item block ---
// Gjør det samme for list item: prioriterer 'attrs' hvis det finnes
const getListItemAttrs = (itemBlock) => {
  return (itemBlock?.attrs && Object.keys(itemBlock.attrs).length > 0) ? itemBlock.attrs : (itemBlock?.attributes || {});
};


// --- Bruker nå blockAttributes for å finne egenskaper ---
const tag = computed(() => (blockAttributes.value.ordered) ? 'ol' : 'ul');

const blockStyles = computed(() => {
    const styles = {};
    const style = blockAttributes.value.style; // Bruker den sammenslåtte
    if (style?.color?.text) styles.color = style.color.text;
    if (style?.color?.background) styles.backgroundColor = style.color.background;
    if (style?.typography?.fontSize) styles.fontSize = style.typography.fontSize;
    return styles;
});

 const extraAttributes = computed(() => {
    const attrs = {};
    if (tag.value === 'ol' && blockAttributes.value.reversed) {
        attrs.reversed = true;
    }
    return attrs;
});

</script>

<style scoped>
/* Samme stil som før... */
.wp-block-list { }
li { }
</style>