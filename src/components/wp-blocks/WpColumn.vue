// Fil: @/components/wp-blocks/WpColumn.vue

<template>
  <div
    :class="['wp-block-column', vAlignmentClass, className]"
    :style="blockStyles"
    :id="anchorId"
  >
    <template v-if="innerBlocks && innerBlocks.length > 0">
      <component
        v-for="(contentBlock, index) in innerBlocks"
        :key="contentBlock.clientId || `content-${index}`"
        :is="getBlockComponentName(contentBlock.blockName || contentBlock.name)"
        :className="contentBlock.className"
        :align="contentBlock.align"
        :anchor="contentBlock.anchor || (contentBlock.attributes || contentBlock.attrs || {}).anchor"
        v-bind="contentBlock.attributes || contentBlock.attrs"
        :innerBlocks="contentBlock.innerBlocks || []"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps, inject, defineAsyncComponent } from 'vue';

// --- Inject getBlockComponentName ---
// Trengs for å rendre innholdet (paragraphs, images etc.)
const getBlockComponentNameInjected = inject('getBlockComponentName');
const WpUnsupportedBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpUnsupportedBlock.vue')); // Fallback
const getBlockComponentName = (blockName) => {
    if (!getBlockComponentNameInjected) {
        console.error('getBlockComponentName was not provided (in WpColumn).');
        return WpUnsupportedBlock;
    }
    // Hent den faktiske komponenten fra den injectede funksjonen
    return getBlockComponentNameInjected(blockName);
};
// --- Slutt på inject ---


// --- Props ---
const props = defineProps({
  className: { type: String, default: '' },
  // align prop er vanligvis ikke relevant for selve kolonnen, men for innholdet
  anchor: { type: String, default: '' },
  attributes: { type: Object, default: () => ({}) },
  attrs: { type: Object, default: null },
  innerBlocks: { type: Array, default: () => [] }, // Innholdet i kolonnen
});

// --- Computed properties ---
const blockAttributes = computed(() => {
  return (props.attrs && typeof props.attrs === 'object' && Object.keys(props.attrs).length > 0)
    ? props.attrs
    : props.attributes;
});

const anchorId = computed(() => props.anchor || blockAttributes.value.anchor || '');

// Klasse for vertikal justering (arvet eller spesifikk for kolonnen)
const vAlignmentClass = computed(() => {
    const vAlign = blockAttributes.value.verticalAlignment; // top, center, bottom
    if (vAlign) {
        return `is-vertically-aligned-${vAlign}`; // WP standardklasse
    }
    return ''; // Arver fra parent (.wp-block-columns) hvis ikke satt
});

// Beregner inline stiler (bredde/flex-basis, padding, farger etc.)
const blockStyles = computed(() => {
    const styles = {};
    const style = blockAttributes.value.style;
    const width = blockAttributes.value.width; // Kan være f.eks. "50%", "300px"

    // Setter bredde/flex-basis
    if (width) {
        // WP bruker ofte flex-basis for kolonner i flex-layout
        styles.flexBasis = width;
        // Fallback til width hvis ikke flex
        styles.width = width;
    } else {
        // Hvis ingen bredde er satt, la flexbox/grid bestemme
        // I flexbox betyr dette ofte flex-grow: 1;
        styles.flexGrow = 1;
        // For å unngå at den blir for smal hvis innholdet er lite:
        styles.flexBasis = '0%'; // Tillater vekst, men kan starte fra 0
    }

     // Farger
    if (style?.color?.text) styles.color = style.color.text;
    if (style?.color?.background) styles.backgroundColor = style.color.background;

    // Padding for kolonnen
    if (style?.spacing?.padding) {
        if(style.spacing.padding.top) styles.paddingTop = style.spacing.padding.top;
        if(style.spacing.padding.right) styles.paddingRight = style.spacing.padding.right;
        if(style.spacing.padding.bottom) styles.paddingBottom = style.spacing.padding.bottom;
        if(style.spacing.padding.left) styles.paddingLeft = style.spacing.padding.left;
    }

    return styles;
});

</script>

<style scoped>
.wp-block-column {
  /* Standard oppførsel i flex-container */
  min-width: 0; /* Tillater krymping */
  word-wrap: break-word; /* Bryt lange ord */
  overflow-wrap: break-word;

 /* Hvis ingen bredde/flex-basis er satt via inline style, la den vokse */
  /* flex-grow: 1; */ /* Satt via inline style nå */
  /* flex-basis: 0%; */ /* Satt via inline style nå */

}

/* Vertikal justering (WP standard klasser) */
/* align-self styrer dette for enkeltkolonner i flexbox */
/* Disse må matches med align-items på .wp-block-columns */
.wp-block-column.is-vertically-aligned-top { align-self: flex-start; }
.wp-block-column.is-vertically-aligned-center { align-self: center; }
.wp-block-column.is-vertically-aligned-bottom { align-self: flex-end; }
.wp-block-column.is-vertically-aligned-stretch { align-self: stretch; } /* Ofte default */


/* Håndtering av stacking på mobil */
/* Denne regelen må koordineres med .is-stacked-on-mobile på parent */
/* Den bør ligge i global CSS eller på parent, ikke her */
/* @media (max-width: 781px) { */
   /* .wp-block-columns.is-stacked-on-mobile > .wp-block-column { */
      /* flex-basis: 100% !important; */ /* Tving full bredde */
      /* width: 100% !important; */
      /* margin-left: 0 !important; */
      /* margin-right: 0 !important; */
      /* margin-bottom: var(--wp--style--block-gap, 1.5em); */ /* Legg til bunnmarg */
   /* } */
/* } */


</style>