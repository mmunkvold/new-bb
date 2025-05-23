<template>
  <figure
    :class="['wp-block-gallery', columnClass, cropClass, alignmentClass, className]"
    :style="figureStyles"
    :id="anchorId"
    
  >
    <ul class="blocks-gallery-grid" :style="gridStyles">
      <li
        v-for="(imageBlock) in innerBlocks"
        :key="imageBlock.clientId || getImageAttr(imageBlock, 'id')"
        class="blocks-gallery-item"
      >
        <figure :class="{
            'aspect-video': shouldCrop, // Standard: Kvadratisk. Endre til f.eks 'aspect-video' for 16:9
            // 'aspect-video': shouldCrop,
            // 'aspect-[4/3]': shouldCrop, // For 4:3
        }">
          <img
            :src="getImageAttr(imageBlock, 'url')"
            :alt="getImageAttr(imageBlock, 'alt')"
            :data-id="getImageAttr(imageBlock, 'id')"
            :class="imageClasses(imageBlock)"
            class="rounded"
            loading="lazy"
          />
          <figcaption
            v-if="getImageAttr(imageBlock, 'caption')"
            class="blocks-gallery-item__caption"
            v-html="getImageAttr(imageBlock, 'caption')"
          ></figcaption>
        </figure>
      </li>
    </ul>
    <figcaption
      v-if="galleryCaption"
      class="blocks-gallery-caption wp-element-caption"
      v-html="galleryCaption"
    ></figcaption>
  </figure>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    // Direkte props
    className: { type: String, default: '' },
    align: { type: String, default: '' },
    anchor: { type: String, default: '' },

    // Props som kan komme fra v-bind (inne i attrs/attributes)
    attributes: { type: Object, default: () => ({}) },
    attrs: { type: Object, default: null },

    // Struktur
    innerBlocks: { type: Array, default: () => [] },

    // Andre potensielle props fra v-bind
    columns: { type: [String, Number], default: 3 },
    imageCrop: { type: Boolean, default: null}, // For fallback i shouldCrop
    linkTo: { type: String, default: 'none' },
    caption: { type: String, default: '' },
    style: { type: Object, default: null },
    sizeSlug: { type: String, default: 'large' },
});

    // Computed for å hente data som KAN ligge i attrs/attributes
    const blockAttributes = computed(() => {
    return (props.attrs && typeof props.attrs === 'object' && Object.keys(props.attrs).length > 0)
        ? props.attrs
        : props.attributes;
    });

    // Hjelpefunksjon for bildeattributter
    const getImageAttr = (imgBlock, attrName) => {
        const imageAttrs = (imgBlock?.attrs && typeof imgBlock.attrs === 'object' && Object.keys(imgBlock.attrs).length > 0)
                ? imgBlock.attrs
                : (imgBlock?.attributes || {});
        return imageAttrs[attrName] || '';
    };

    // --- Hoved-computeds ---

    // Bestemmer om beskjæring skal brukes, basert på mottatt className
    const shouldCrop = computed(() => {
        // Hvis className inneholder is-cropped, bruk det
        if (props.className?.includes('is-cropped')) {
            return true;
        }
        // Fallback hvis imageCrop-prop mot formodning finnes og er true
        if (props.imageCrop === true) {
            return true;
        }
        // Default til ingen beskjæring hvis klassen mangler
        return false;
    });

    // Setter is-cropped / is-not-cropped klasse basert på shouldCrop
    const cropClass = computed(() => shouldCrop.value ? 'is-cropped' : 'is-not-cropped');

    // Setter align* klasse basert på props.align
    const alignmentClass = computed(() => {
        if (props.align && ['left', 'right', 'center', 'wide', 'full'].includes(props.align)) {
            return `align${props.align}`;
        }
        return '';
    });

    // Bruker props.anchor direkte
    const anchorId = computed(() => props.anchor || '');

    // Henter kolonner (fra direkte prop eller fallback)
    const computedColumns = computed(() => parseInt(props.columns || blockAttributes.value.columns || '3', 10));
    const columnClass = computed(() => `columns-${computedColumns.value}`);
    const gridStyles = computed(() => ({ '--gallery-columns': computedColumns.value }));

    // Henter galleri-caption (fra direkte prop eller fallback)
    const galleryCaption = computed(() => props.caption || blockAttributes.value.caption || '');

    // Henter inline style (fra direkte prop eller fallback)
    const figureStyles = computed(() => {
        const styles = {};
        const styleObj = props.style || blockAttributes.value.style;
        // Behandle styleObj hvis du trenger å hente spesifikke verdier her
        return styles;
    });

    // Henter galleriets sizeSlug (fra direkte prop eller fallback)
    const gallerySizeSlug = computed(() => props.sizeSlug || blockAttributes.value.sizeSlug || 'large');

    // Lager klasser for individuelle bilder
    const imageClasses = (imageBlock) => {
        const imgId = getImageAttr(imageBlock, 'id');
        const sizeSlug = getImageAttr(imageBlock, 'sizeSlug') || gallerySizeSlug.value;
        const classes = [];
        if (imgId) classes.push(`wp-image-${imgId}`);
        if (sizeSlug) classes.push(`size-${sizeSlug}`);
        return classes.join(' ');
    };

</script>

<style scoped>
.wp-block-gallery {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin: 1.5em 0;
}
.blocks-gallery-grid {
    display: grid;
    grid-template-columns: repeat(var(--gallery-columns, 3), 1fr);
    gap: 1em;
    padding: 0;
    margin: 0 auto;
    list-style: none;
    justify-content: center;
}
.blocks-gallery-item {
    margin: 0;
    padding: 0;
    display: flex;
}
.blocks-gallery-item figure {
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}
.blocks-gallery-item img {
    display: block;
    max-width: 100%;
    width: 100%;
    height: auto;
    object-fit: contain;
}
/* Beskårne bilder */
.wp-block-gallery.is-cropped .blocks-gallery-item figure.aspect-square,
.wp-block-gallery.is-cropped .blocks-gallery-item figure.aspect-video,
.wp-block-gallery.is-cropped .blocks-gallery-item figure[class*="aspect-"] {
  /* Aspect ratio settes av Tailwind-klassen i templaten */
}
.wp-block-gallery.is-cropped .blocks-gallery-item img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center center;
  /* aspect-ratio: auto; */ /* Ikke nødvendig når parent har aspect-ratio */
}
/* Captions */
.blocks-gallery-item__caption {
    display: block;
    text-align: center;
    font-size: 0.8rem;
    color: #555;
    margin-top: 0.4em;
    line-height: 1.4;
    padding: 0 0.25em;
    flex-shrink: 0;
}
.blocks-gallery-caption {
    display: block; text-align: center; font-size: 0.9rem; color: #333; margin-top: 0.5em;
}
/* Alignment */
.wp-block-gallery.aligncenter { margin-left: auto; margin-right: auto; display: block; max-width: fit-content; }
.wp-block-gallery.alignleft { float: left; max-width: 50%; margin-right: 2em; margin-left:0; width: auto; }
.wp-block-gallery.alignright { float: right; max-width: 50%; margin-left: 2em; margin-right:0; width: auto; }
.wp-block-gallery.alignwide { max-width: var(--wp--style--global--wide-size, 1000px); margin-left: auto; margin-right: auto; }
.wp-block-gallery.alignfull { max-width: none; width: 100vw; position: relative; left: 50%; transform: translateX(-50%); margin-left: 0 !important; margin-right: 0 !important; }
.wp-block-gallery.alignleft::after, .wp-block-gallery.alignright::after { content: ""; display: table; clear: both; }
@media (max-width: 768px) {
    .wp-block-gallery.alignleft, .wp-block-gallery.alignright { float: none; max-width: 100%; margin: 1.5em auto; }
}
</style>