// Fil: @/components/wp-blocks/WpParagraph.vue (Ryddet og forbedret)

<template>
  <p
    :class="['wp-block-paragraph', className, alignmentClass]"
    :style="blockStyles"
    :id="anchor"
    v-html="content"
  ></p>
</template>

<script setup>
import { computed } from 'vue';

// Definerer props som komponenten kan motta
// 'content', 'className', 'align', 'style', 'anchor' etc. sendes nå
// direkte fra <component :is...> via v-bind eller eksplisitt binding.
const props = defineProps({
  // Selve innholdet
  content: { type: String, default: '' },

  // Vanlige attributter fra WP
  className: { type: String, default: '' },
  align: { type: String, default: '' }, // 'left', 'center', 'right'
  style: { type: Object, default: null }, // { color: { text: '...', background: '...' } } etc.
  anchor: { type: String, default: '' },
  dropCap: { type: Boolean, default: false },
  // Legg til flere spesifikke attributter for <p> om nødvendig
});

// Computed property for å generere justeringsklasse
const alignmentClass = computed(() => {
  if (props.align && ['left', 'center', 'right'].includes(props.align)) {
    // Bruker standard WP-klasse navn for enkelhets skyld ift. global CSS
    // Du kan evt. mappe til Tailwind klasser her: `text-${props.align}`
    return `has-text-align-${props.align}`;
  }
  return '';
});

// Computed property for å generere inline style objekt
const blockStyles = computed(() => {
    const styles = {};
    const style = props.style; // Henter style-objektet fra props

    // Oversett WP style objekt til CSS
    if (style?.color?.text) styles.color = style.color.text;
    if (style?.color?.background) styles.backgroundColor = style.color.background;
    if (style?.typography?.fontSize) styles.fontSize = style.typography.fontSize;
    if (style?.spacing?.padding) { // Eksempel for padding
         if(style.spacing.padding.top) styles.paddingTop = style.spacing.padding.top;
         if(style.spacing.padding.right) styles.paddingRight = style.spacing.padding.right;
         if(style.spacing.padding.bottom) styles.paddingBottom = style.spacing.padding.bottom;
         if(style.spacing.padding.left) styles.paddingLeft = style.spacing.padding.left;
    }
    // Legg til flere oversettelser fra style-objektet etter behov

    return styles;
});

// Vurder å legge til 'has-drop-cap' klassen dynamisk hvis props.dropCap er true
// :class="['wp-block-paragraph', className, alignmentClass, { 'has-drop-cap': dropCap }]"

</script>

<style scoped>
.wp-block-paragraph {
  /* Grunnleggende avsnittsstiler kommer ofte fra global CSS eller Tailwind Typography (prose) */
  /* Du kan legge til spesifikke overstyringer her */
  margin-bottom: 1em; /* Eksempel på standard bunnmarg */
  line-height: 1.6;   /* Eksempel på linjehøyde */
  max-width: 100%;    /* Sikrer at den ikke går utenfor container */
}

/* Standard WP justeringsklasser */
.has-text-align-left { text-align: left; }
.has-text-align-center { text-align: center; }
.has-text-align-right { text-align: right; }

/* Eksempel på styling for dropCap (hvis du legger til klassen) */
/*
.wp-block-paragraph.has-drop-cap:first-letter {
    font-size: 3.2em;
    font-weight: bold;
    line-height: 0.8;
    float: left;
    margin: 0.1em 0.15em 0 0;
}
*/
</style>