<template>
    <figure
        :class="['wp-block-embed', className, figureClasses]" :style="figureStyles"
        :id="anchor" >
        <div class="wp-block-embed__wrapper">

            <iframe
                v-if="isYouTube && youtubeEmbedUrl"
                :src="youtubeEmbedUrl"
                width="560"
                height="315"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
                title="Innebygd YouTube-video"
            ></iframe>

            <div v-else-if="html" v-html="html"></div> <div v-else class="wp-block-embed__fallback text-sm text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-900 rounded border">
                <p>Forhåndsvisning av innebygd innhold er ikke tilgjengelig.</p>
                <p v-if="url"> Lenke: <a :href="url" target="_blank" rel="noopener noreferrer" class="underline break-all">{{ url }}</a>
                </p>
                <p v-if="providerNameSlug"> Leverandør: {{ providerNameSlug }}
                </p>
            </div>
        </div>

        <figcaption
            v-if="formattedCaption"
            v-html="formattedCaption"
            class="wp-block-embed__caption text-sm text-center text-gray-600 dark:text-gray-900 mt-2">
        </figcaption>
    </figure>
</template>

<script setup>
    import { computed, defineProps } from 'vue'; 

    const props = defineProps({
        url: { type: String, default: '' },
        type: { type: String, default: '' }, // 'video', 'rich', etc.
        providerNameSlug: { type: String, default: '' }, // 'youtube', 'vimeo', etc.
        caption: { type: String, default: '' },
        html: { type: String, default: '' }, // Hvis pre-rendret HTML sendes

        // Styling og layout mottatt direkte
        className: { type: String, default: '' },
        align: { type: String, default: '' }, // 'left', 'right', 'center', 'wide', 'full'
        // 'style'-objektet kan være vanskelig å sende via v-bind="...",
        // men vi inkluderer det i tilfelle det kommer.
        style: { type: Object, default: null },

        // Annet mottatt direkte
        anchor: { type: String, default: '' }, // HTML id

        // Struktur (denne sendes fortsatt som en navngitt prop)
        innerBlocks: { type: Array, default: () => [] },

        // 'value' er vanligvis ikke relevant for embeds, men kan tas med for sikkerhets skyld
        // value: { type: String, default: '' },

        // Ta med 'attributes' og 'attrs' her KUN hvis v-bind i forelder KAN sende dem
        // (f.eks. hvis objektet den binder er tomt, da sendes ingenting individuelt)
        // attributes: { type: Object, default: () => ({}) },
        // attrs: { type: Object, default: null },
    });

    const isYouTube = computed(() => {
        return props.providerNameSlug === 'youtube' || /youtube\.com|youtu\.be/i.test(props.url || '');
    });

    const youtubeVideoId = computed(() => {
        if (!isYouTube.value || !props.url) {
            return null;
        }
        const url = props.url;
        let videoId = null;
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtu.be')) { videoId = urlObj.pathname.slice(1); }
            else if (urlObj.hostname.includes('youtube.com')) {
            if (urlObj.pathname.includes('/embed/')) { videoId = urlObj.pathname.split('/embed/')[1]; }
            else if (urlObj.searchParams.has('v')) { videoId = urlObj.searchParams.get('v'); }
            }
            if (videoId && videoId.includes('&')) videoId = videoId.split('&')[0];
            if (videoId && videoId.includes('?')) videoId = videoId.split('?')[0];
        } catch (e) {
            console.warn("Kunne ikke parse YouTube URL med URL API, prøver regex:", url, e);
            const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            videoId = match ? match[1] : null;
        }
        return videoId;
    });

    const youtubeEmbedUrl = computed(() => {
        return youtubeVideoId.value ? `https://www.youtube.com/embed/${youtubeVideoId.value}` : null;
    });

    const figureClasses = computed(() => {
        const classes = [];
        if (props.align && ['left', 'right', 'center', 'wide', 'full'].includes(props.align)) { classes.push(`align${props.align}`); }
        if (props.type) classes.push(`is-type-${props.type}`);
        if (props.providerNameSlug) classes.push(`is-provider-${props.providerNameSlug}`);
        if (props.className?.includes('wp-embed-aspect-')) { classes.push('has-aspect-ratio'); }
        return classes.join(' ');
    });

    const figureStyles = computed(() => {
        const styles = {};
        return styles;
    });


    const formattedCaption = computed(() => {
        const captionHtml = props.caption;
        if (!captionHtml) return null;
        const trimmed = captionHtml.trim();
        if (trimmed.startsWith('<p>') && trimmed.endsWith('</p>')) {
            const innerContent = trimmed.slice(3, -4).trim();
            return innerContent.length > 0 ? innerContent : null;
        }
        return trimmed.length > 0 ? trimmed : null;
    });
</script>

<style scoped>
    /* TODO trengs disse? video vises fint uten, men noe her gjør at den ikke vises */

    /* Generell styling for embed-figuren */
    .wp-block-embed {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
        display: block;
        width: auto; /* La bredden styres av forelder */
        max-width: 100%; /* Ikke gå utenfor forelder */
    }

    /* Wrapper for responsivt sideforhold */
    .wp-block-embed__wrapper {
        position: relative;
        width: 100%; /* Tar bredden fra figure-elementet */
        padding-bottom: 56.25%; /* Default 16:9 */
        height: 0;
        overflow: hidden;
        background-color: #eee; /* MIDLERTIDIG: For å se boksen */
    }
    /* Stiler for spesifikke sideforhold */
    .wp-block-embed.wp-embed-aspect-16-9 .wp-block-embed__wrapper {
        padding-bottom: 56.25%; 
    }

    .wp-block-embed.wp-embed-aspect-4-3 .wp-block-embed__wrapper { 
        padding-bottom: 75%; 
    }
    /* ... legg til flere etter behov ... */

    /* Styling for selve iframe-elementet */
    .wp-block-embed__wrapper iframe,
    .wp-block-embed__wrapper :deep(iframe) { /* :deep() hvis v-html brukes */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: #ccc; /* MIDLERTIDIG: For å se iframe-området */
    }


    .wp-block-embed__fallback { 
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; 
    }

    .wp-block-embed__caption { 
        text-align: center; font-size: 0.875rem; /* text-sm */ color: #4b5563; /* gray-600 */ margin-top: 0.5rem; /* mt-2 */ 
    }

    /* Sentrering: Kun margin, ikke display: table */
    .wp-block-embed.aligncenter {
        margin-left: auto;
        margin-right: auto;
        /* Vurder å sette en max-width her hvis den ikke skal fylle helt ut */
        /* max-width: 90%; */
        display: block; /* Kan være lurt å være eksplisitt */
    }

    /* Float for venstre/høyre (samme som før) */
    .wp-block-embed.alignleft { 
        float: left; max-width: 50%; margin-right: 2em; margin-left:0; width: auto; 
    }

    .wp-block-embed.alignright { 
        float: right; max-width: 50%; margin-left: 2em; margin-right:0; width: auto; 
}

    /* Wide/Full (samme som før, krever støtte fra tema/global CSS) */
    .wp-block-embed.alignwide { 
        max-width: var(--wp--style--global--wide-size, 1000px); margin-left: auto; margin-right: auto; 
    }

    .wp-block-embed.alignfull {
        max-width: none; width: 100vw; position: relative; left: 50%; transform: translateX(-50%); margin-left: 0 !important; margin-right: 0 !important; 
    }

    /* Clearfix for float (samme som før) */
    .wp-block-embed.alignleft::after,
    .wp-block-embed.alignright::after {
        content: ""; display: table; clear: both; 
    }

    /* Responsiv float (samme som før) */
    @media (max-width: 768px) {
        .wp-block-embed.alignleft,
        .wp-block-embed.alignright { float: none; max-width: 100%; margin: 1.5em auto; }
    }

</style>