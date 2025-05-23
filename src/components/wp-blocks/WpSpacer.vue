// Fil: @/components/wp-blocks/WpSpacer.vue

<template>
  <div
    :class="['wp-block-spacer', blockAttributes.className]"
    :style="blockStyles"
    :id="blockAttributes.anchor"
    aria-hidden="true" >
    &nbsp; </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Definer begge props for fleksibilitet
  attributes: { type: Object, default: () => ({}) },
  attrs: { type: Object, default: null },
  // innerBlocks er ikke forventet for spacer
});

// Slår sammen attrs og attributes, prioriterer attrs
const blockAttributes = computed(() => {
  return (props.attrs && typeof props.attrs === 'object' && Object.keys(props.attrs).length > 0)
    ? props.attrs
    : props.attributes;
});

// Beregner inline stiler
const blockStyles = computed(() => {
    const styles = {};
    const height = blockAttributes.value.height;
    const width = blockAttributes.value.width; // Mindre vanlig

    // Håndterer høyde - legger til 'px' hvis det kun er et tall
    if (height) {
        if (typeof height === 'number' || /^\d+$/.test(height)) {
             styles.height = `${height}px`; // Anta piksler hvis enhet mangler
        } else {
            styles.height = height; // Bruk verdien som den er (f.eks. "2rem", "50px")
        }
    } else {
        styles.height = '1em'; // En default høyde hvis ingen er satt? Eller la CSS bestemme.
    }

    // Håndterer bredde (hvis den brukes)
    if (width) {
         if (typeof width === 'number' || /^\d+$/.test(width)) {
             styles.width = `${width}px`;
        } else {
            styles.width = width; // f.eks. "10%", "20px"
        }
        // For at bredde skal ha effekt, trenger den ofte display: block/inline-block
        styles.display = 'block'; // Eller inline-block avhengig av bruk
    }

    // Slå sammen med eventuelle style-objekter fra WP
     const styleAttribute = blockAttributes.value.style;
     if (styleAttribute) {
        // Eksempel: oversett farger (du trenger kanskje ikke dette for spacer)
        // if (styleAttribute.color?.text) styles.color = styleAttribute.color.text;
        // if (styleAttribute.color?.background) styles.backgroundColor = styleAttribute.color.background;

        // Eksempel: oversett margin/padding hvis de finnes i style
         if(styleAttribute.spacing?.margin?.top) styles.marginTop = styleAttribute.spacing.margin.top;
         if(styleAttribute.spacing?.margin?.bottom) styles.marginBottom = styleAttribute.spacing.margin.bottom;
         // ... osv for padding, left, right ...
     }


    return styles;
});

</script>

<style scoped>
.wp-block-spacer {
  clear: both; /* Kan være nyttig i noen layouts */
  /* display: block; */ /* Satt via inline style hvis bredde finnes */
}
/* Hvis du vil ha en default høyde når ingen er spesifisert */
/* .wp-block-spacer:not([style*="height"]) {
  height: 1em;
} */
</style>