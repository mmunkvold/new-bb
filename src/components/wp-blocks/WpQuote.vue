<template>
    <blockquote
      :class="['wp-block-quote', attributes.className, alignmentClass]"
      :style="blockStyles"
      :id="attributes.anchor"
    >
      <div class="wp-block-quote__content">
          <template v-if="innerBlocks && innerBlocks.length > 0">
          <component
              v-for="(innerBlock, index) in innerBlocks"
              :key="innerBlock.clientId || `inner-${index}`"
              :is="getBlockComponentName(innerBlock.blockName || innerBlock.name)"
              :attributes="innerBlock.attributes || innerBlock.attrs || {}"
              :innerBlocks="innerBlock.innerBlocks || []"
          />
          </template>
          <p v-else-if="attributes.value" v-html="attributes.value"></p>
      </div>
  
      <cite
          v-if="formattedCitation"
          v-html="formattedCitation"
          class="wp-block-quote__citation block text-sm not-italic text-gray-700 dark:text-gray-400  mt-3"
      ></cite>
    </blockquote>
  </template>
  
  <script setup>
  import { computed, inject, defineAsyncComponent } from 'vue';
  
  // Hent block renderer-funksjonen via inject
  const getBlockComponentNameInjected = inject('getBlockComponentName');
  
  // Fallback-komponent hvis inject feiler
  const WpUnsupportedBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpUnsupportedBlock.vue'));
  
  // Sikker måte å bruke den injectede funksjonen på
  const getBlockComponentName = (blockName) => {
      if (!getBlockComponentNameInjected) {
          console.error('getBlockComponentName was not provided by the parent component.');
          return WpUnsupportedBlock;
      }
      return getBlockComponentNameInjected(blockName);
  }
  
  const props = defineProps({
    attributes: {
      type: Object,
      default: () => ({})
    },
    innerBlocks: {
      type: Array,
      default: () => []
    },
    // Direkte props (mindre vanlig nå, da det meste ligger i attributes)
  });
  
  // Beregner justeringsklasse
  const alignmentClass = computed(() => {
      // WP bruker ofte 'is-style-large', 'is-style-plain' etc. i className
      // og 'has-text-align-...' for justering.
      if (props.attributes?.align) {
           return `has-text-align-${props.attributes.align}`; // F.eks. 'has-text-align-center'
      }
      // Du kan også sjekke props.attributes.className for spesifikke stiler
      return '';
  });
  
  // Beregner inline stiler
  const blockStyles = computed(() => {
      const styles = {};
      const style = props.attributes?.style;
      if (style?.color?.text) styles.color = style.color.text;
      if (style?.color?.background) styles.backgroundColor = style.color.background;
      if (style?.typography?.fontSize) styles.fontSize = style.typography.fontSize;
      // Legg til flere etter behov
      return styles;
  });
  
  // Formaterer og validerer citation
  const formattedCitation = computed(() => {
      const citationHtml = props.attributes?.citation;
      if (!citationHtml) return null;
  
      const trimmed = citationHtml.trim();
      // Fjern omsluttende <p>-tag hvis den finnes
      if (trimmed.startsWith('<p>') && trimmed.endsWith('</p>')) {
          const innerContent = trimmed.slice(3, -4).trim();
          return innerContent.length > 0 ? innerContent : null;
      }
      return trimmed.length > 0 ? trimmed : null;
  });
  </script>
  
  <style scoped>
  /* Grunnleggende sitatstiler bør komme fra global CSS / Tailwind Typography (prose) */
  /* .prose blockquote {} */
  /* .prose cite {} */
  
  .wp-block-quote {
    /* Eksempel: marg, padding, border hvis ikke håndtert av prose */
    /* margin-bottom: 1.5em; */
    /* border-left: 4px solid #e5e7eb; */ /* gray-200 */
    /* padding-left: 1em; */
  }
  
  /* WP legger ofte til spesifikke klasser for stiler */
  .wp-block-quote.is-style-large {
    /* border-left-width: 6px; */
    /* padding-left: 1.5em; */
    /* font-size: 1.25em; */ /* text-xl */
    /* font-style: italic; */
  }
  .wp-block-quote.is-style-plain {
    /* border-left: none; */
    /* padding-left: 0; */
  }
  
  
  .wp-block-quote__citation {
    /* Sikrer at cite ikke er kursiv hvis blockquote er det */
    /* font-style: normal; */
  }
  
  /* Justeringsklasser fra WP */
  .has-text-align-center {
    text-align: center;
    /* border-left: none; */ /* Fjerner evt. kantlinje ved sentrering */
    /* padding-left: 0; */
  }
  .has-text-align-right {
    text-align: right;
     /* border-left: none; */
     /* border-right: 4px solid #e5e7eb; */ /* Flytter kantlinje */
     /* padding-left: 0; */
     /* padding-right: 1em; */
  }
  
  </style>