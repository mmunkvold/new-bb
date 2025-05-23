// Fil: @/components/wp-blocks/WpColumns.vue

<template>
  <div
    :class="['wp-block-columns', alignmentClass, vAlignmentClass, stackingClass, layoutClass, className]"
    :style="blockStyles"
    :id="anchorId"
  >
    <template v-if="innerBlocks && innerBlocks.length > 0">
      <component
        v-for="(columnBlock, index) in innerBlocks"
        :key="columnBlock.clientId || `col-${index}`"
        :is="getBlockComponentName('core/column')" :className="columnBlock.className"          :align="columnBlock.align"                :anchor="columnBlock.anchor || (columnBlock.attributes || columnBlock.attrs || {}).anchor"
        :attributes="columnBlock.attributes"
        :attrs="columnBlock.attrs"
        :innerBlocks="columnBlock.innerBlocks || []"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps, inject, defineAsyncComponent } from 'vue';

// --- Inject getBlockComponentName ---
const getBlockComponentNameInjected = inject('getBlockComponentName');
const WpUnsupportedBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpUnsupportedBlock.vue')); // Fallback
const getBlockComponentName = (blockName) => {
    // Denne trengs for å rendre WpColumn
    if (!blockName) return WpUnsupportedBlock; // Returner fallback hvis navn mangler
    if (!getBlockComponentNameInjected) {
        console.error('getBlockComponentName was not provided (in WpColumns).');
        return WpUnsupportedBlock;
    }
    // Spesifikt for denne komponenten, vi vet vi trenger 'core/column'
    if (blockName === 'core/column') {
        // Importer WpColumn asynkront for å unngå sirkulær avhengighet
        const WpColumn = defineAsyncComponent(() => import('@/components/wp-blocks/WpColumn.vue'));
        return WpColumn;
    }
    // Fallback hvis noe annet rart skulle dukke opp i innerBlocks her
    return getBlockComponentNameInjected(blockName);
};
// --- Slutt på inject ---


// --- Props ---
const props = defineProps({
  className: { type: String, default: '' },
  align: { type: String, default: '' }, // wide, full etc. for hele gruppen
  anchor: { type: String, default: '' },
  attributes: { type: Object, default: () => ({}) },
  attrs: { type: Object, default: null },
  innerBlocks: { type: Array, default: () => [] }, // Skal inneholde core/column blokker
});

// --- Computed properties ---
const blockAttributes = computed(() => {
  return (props.attrs && typeof props.attrs === 'object' && Object.keys(props.attrs).length > 0)
    ? props.attrs
    : props.attributes;
});

const anchorId = computed(() => props.anchor || blockAttributes.value.anchor || '');

// Klassen for bredde-justering (wide, full)
const alignmentClass = computed(() => {
  if (props.align && ['wide', 'full'].includes(props.align)) {
    return `align${props.align}`;
  }
  // Sentrering/venstre/høyre håndteres ofte annerledes for columns
  return '';
});

// Klasse for vertikal justering av kolonnene inni
const vAlignmentClass = computed(() => {
    const vAlign = blockAttributes.value.verticalAlignment; // top, center, bottom
    if (vAlign) {
        return `are-vertically-aligned-${vAlign}`; // WP standardklasse
    }
    return ''; // Default er ofte top eller stretch
});

// Klasse for om kolonnene skal stables på mobil
const stackingClass = computed(() => {
    // Bruk isStackedOnMobile fra blockAttributes hvis den finnes
    // WP legger ofte til 'is-stacked-on-mobile' automatisk basert på skjermbredde via CSS,
    // men hvis attributtet finnes, kan vi legge til klassen direkte.
    if (blockAttributes.value.isStackedOnMobile === true || props.className?.includes('is-stacked-on-mobile')) {
        return 'is-stacked-on-mobile';
    }
    return '';
});

// Klasse for layout-type (flex eller grid)
const layoutClass = computed(() => {
    // Sjekk layout-objekt eller className hvis det finnes
    const layoutType = blockAttributes.value.layout?.type || (props.className?.includes('is-layout-grid') ? 'grid' : 'flex');
    if (layoutType === 'flex') return 'is-layout-flex';
    if (layoutType === 'grid') return 'is-layout-grid';
    return 'is-layout-flex'; // Default til flex
});

// Beregner inline stiler (farger, blockGap etc.)
const blockStyles = computed(() => {
    const styles = {};
    const style = blockAttributes.value.style;

    // Farger
    if (style?.color?.text) styles.color = style.color.text;
    if (style?.color?.background) styles.backgroundColor = style.color.background;

    // Mellomrom mellom kolonner (blockGap) -> CSS gap
    if (style?.spacing?.blockGap) {
        // WP setter ofte gap via --wp--style--block-gap variabelen som settes på elementet
        // Vi kan sette 'gap' direkte, eller sette CSS-variabelen hvis resten av CSSen bruker den
        styles.gap = style.spacing.blockGap;
        // Eller: styles['--wp--style--block-gap'] = style.spacing.blockGap;
    }

    // Padding for hele kolonne-blokken
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
.wp-block-columns {
  display: flex; /* Standard for is-layout-flex */
  margin: 1.5em 0;
  /* Gap settes via inline style eller --wp--style--block-gap */
}

/* Håndtering av stacking på mobil */
.wp-block-columns.is-stacked-on-mobile {
  /* Media query bør komme fra global CSS som definerer når stacking skjer */
  /* @media (max-width: 781px) { */
     flex-wrap: wrap; /* Sørger for at de kan wrappe */
     /* Kolonnene selv (WpColumn) må da få f.eks. width: 100% på mobil */
  /* } */
}

/* Vertikal justering (WP standard klasser) */
/* align-items styrer dette i flexbox */
.wp-block-columns.are-vertically-aligned-top { align-items: flex-start; }
.wp-block-columns.are-vertically-aligned-center { align-items: center; }
.wp-block-columns.are-vertically-aligned-bottom { align-items: flex-end; }
/* Stretch er ofte default */

/* Håndtering av alignwide/full (krever ofte global CSS) */
/* .wp-block-columns.alignwide { ... } */
/* .wp-block-columns.alignfull { ... } */

/* Hvis layout er grid (mindre vanlig for columns) */
.wp-block-columns.is-layout-grid {
    display: grid;
    /* Trenger grid-template-columns basert på antall kolonner */
    /* grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); */ /* Eksempel */
}

</style>