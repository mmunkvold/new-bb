// Fil: @/components/wp-blocks/WpPullquote.vue

<template>
  <figure
    :class="['wp-block-pullquote', className, alignmentClass]"
    :style="figureStyles"
    :id="anchor"
  >
    <blockquote :style="blockquoteStyles" :class="blockquoteClass">
      <div class="wp-block-pullquote__content">
        <template v-if="innerBlocks && innerBlocks.length > 0">
          <component
            v-for="(innerBlock, index) in innerBlocks"
            :key="innerBlock.clientId || `inner-${index}`"
            :is="getBlockComponentName(innerBlock.blockName || innerBlock.name)"
             :attributes="innerBlock.attributes"
             :attrs="innerBlock.attrs"
            :innerBlocks="innerBlock.innerBlocks || []"
          />
        </template>
        <p v-else-if="value" v-html="value"></p>
      </div>
      <cite
        v-if="formattedCitation"
        v-html="formattedCitation"
        class="wp-block-pullquote__citation" ></cite>
    </blockquote>
  </figure>
</template>

<script setup>
// --- SAMME SCRIPT SETUP SOM I FORRIGE SVAR ---
// (Inkluderer inject, props-definisjon med value, citation etc.,
// computed properties: alignmentClass, blockquoteClass, figureStyles,
// blockquoteStyles, formattedCitation)
import { computed, inject, defineAsyncComponent } from 'vue';

const getBlockComponentNameInjected = inject('getBlockComponentName');
const WpUnsupportedBlock = defineAsyncComponent(() => import('@/components/wp-blocks/WpUnsupportedBlock.vue'));
const getBlockComponentName = (blockName) => {
    if (!getBlockComponentNameInjected) {
        console.error('getBlockComponentName was not provided.');
        return WpUnsupportedBlock;
    }
    return getBlockComponentNameInjected(blockName);
};

const props = defineProps({
  value: { type: String, default: '' },
  citation: { type: String, default: '' },
  className: { type: String, default: '' },
  align: { type: String, default: '' },
  textAlign: { type: String, default: '' },
  style: { type: Object, default: null },
  anchor: { type: String, default: '' },
  innerBlocks: { type: Array, default: () => [] },
   // Fjernet attributes/attrs herfra da de nå er individuelle props
});

const alignmentClass = computed(() => {
    if (props.align && ['left', 'right', 'center', 'wide', 'full'].includes(props.align)) {
        return `align${props.align}`;
    }
    return '';
});

const blockquoteClass = computed(() => {
    const classes = [];
    if (props.textAlign) {
        classes.push(`has-text-align-${props.textAlign}`);
    }
    if (props.className?.includes('is-style-solid-color')) {
        classes.push('is-style-solid-color');
    } else {
        // Anta default hvis ikke solid, selv om 'is-style-default' ikke alltid er til stede
         classes.push('is-style-default');
    }
    return classes.join(' ');
});

const figureStyles = computed(() => ({})); // Sjelden brukt

const blockquoteStyles = computed(() => {
    const styles = {};
    const style = props.style;
    const className = props.className || '';
    if (style?.color?.text) styles.color = style.color.text;
    if (style?.color?.background && className.includes('is-style-solid-color')) {
        styles.backgroundColor = style.color.background;
    }
    if (style?.typography?.fontSize) styles.fontSize = style.typography.fontSize;
    const borderColor = style?.border?.color;
    if (borderColor) styles.borderColor = borderColor;
    else if (style?.color?.text) styles.borderColor = style.color.text; // Fallback for border
    return styles;
});

const formattedCitation = computed(() => {
    const citationHtml = props.citation;
    if (!citationHtml) return null;
    const trimmed = citationHtml.trim();
    if (trimmed.startsWith('<p>') && trimmed.endsWith('</p>')) {
        const innerContent = trimmed.slice(3, -4).trim();
        return innerContent.length > 0 ? innerContent : null;
    }
    return trimmed.length > 0 ? trimmed : null;
});

</script>

<style scoped>
/* Generell styling for pullquote-figuren */
.wp-block-pullquote {
  padding: 1.5em 0;
  margin-top: 2em;
  margin-bottom: 2em;
  /* Standard sentrert hvis ingen align-klasse */
  text-align: center;
}

/* Styling for selve blockquote-elementet inni figuren */
.wp-block-pullquote blockquote {
  margin-left: auto;  /* Hjelper med sentrering */
  margin-right: auto; /* Hjelper med sentrering */
  padding: 0;         /* Nullstill padding, legges til av stiler nedenfor */
  border: none;       /* Nullstill standard border */
  max-width: 90%;     /* Litt smalere enn figuren */
  position: relative; /* For eventuelle pseudo-elementer */
}

/* Styling for selve sitat-teksten (inne i .wp-block-pullquote__content) */
/* Bruker :deep() for å style p-tag generert av v-html eller WpParagraph */
.wp-block-pullquote blockquote :deep(p) {
  font-size: 1.4em;   /* Gjør teksten større */
  line-height: 1.5;
  font-weight: 600;   /* Litt fetere skrift */
  margin-bottom: 0;   /* Fjerner bunnmarg på avsnitt inni */
}

/* Styling for kilde/sitat */
.wp-block-pullquote__citation {
  display: block; /* Egen linje */
  margin-top: 0.75em; /* Avstand fra sitat */
  font-size: 0.9em;
  font-style: normal; /* Ikke kursiv som standard */
  font-weight: normal; /* Normal vekt */
  opacity: 0.85;
}

/* == Stilvarianter == */

/* 1. Standard stil (med border top/bottom) */
.wp-block-pullquote blockquote.is-style-default {
  border-top: 3px solid; /* Setter farge via inline style (borderColor) eller currentColor */
  border-bottom: 3px solid;
  /* Bruker v-bind for å dynamisk sette fargen fra JS */
  border-color: v-bind('blockquoteStyles.borderColor || "currentColor"');
  padding-top: 1em;
  padding-bottom: 1em;
}

/* 2. Solid farge-stil */
.wp-block-pullquote blockquote.is-style-solid-color {
  border: none; /* Ingen border */
  padding: 1.5em; /* Mer padding */
  border-radius: 5px; /* Litt avrunding */
  /* Bakgrunnsfarge og tekstfarge settes via inline style */
}
/* Gjør sitat litt mer dempet på farget bakgrunn */
.wp-block-pullquote blockquote.is-style-solid-color .wp-block-pullquote__citation {
     opacity: 0.7;
}


/* == Justering (Alignment) == */

/* Tekstjustering inni blockquote */
.wp-block-pullquote blockquote.has-text-align-left { text-align: left; }
.wp-block-pullquote blockquote.has-text-align-right { text-align: right; }
.wp-block-pullquote blockquote.has-text-align-center { text-align: center; } /* Standard */

/* Hovedjustering av figure-elementet */
.wp-block-pullquote.alignleft { float: left; max-width: 48%; width: auto; margin-right: 2em; margin-left:0; text-align: left; } /* Juster tekst også */
.wp-block-pullquote.alignright { float: right; max-width: 48%; width: auto; margin-left: 2em; margin-right:0; text-align: left; } /* Juster tekst også */
.wp-block-pullquote.aligncenter { display: table; margin-left: auto; margin-right: auto; } /* Sentrering */

/* Wide/Full - Disse krever ofte støtte fra CSS *utenfor* komponenten */
.wp-block-pullquote.alignwide { max-width: var(--wp--style--global--wide-size, 1000px); margin-left: auto; margin-right: auto; }
.wp-block-pullquote.alignfull { max-width: none; width: 100vw; position: relative; left: 50%; transform: translateX(-50%); margin-left: 0 !important; margin-right: 0 !important; }

/* Clearfix for float (viktig hvis du bruker alignleft/right) */
.wp-block-pullquote.alignleft::after,
.wp-block-pullquote.alignright::after { content: ""; display: table; clear: both; }

/* Responsive justeringer for float */
@media (max-width: 768px) { /* Tailwind 'md' breakpoint */
    .wp-block-pullquote.alignleft,
    .wp-block-pullquote.alignright {
        float: none;
        max-width: 95%; /* Ikke helt full bredde på mobil */
        margin: 2em auto; /* Sentrering med marg */
    }
    /* Kan justere font-størrelse på mobil også */
    .wp-block-pullquote blockquote :deep(p) {
        font-size: 1.25em; /* Litt mindre på mobil */
    }
}

</style>