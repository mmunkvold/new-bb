<template>
    <div class="max-w-2xl p-6 mx-auto my-8 bg-gray-200 dark:bg-gray-950 text-pretty">
        <HeadingElement :level="3">Hei!</HeadingElement>
        <p>Akkurat nå ser det ut til at det er en liten teknisk utfordring med <span class="font-semibold">{{ formType }}</span>-skjemaet vårt, og vi jobber med å få det på skinner igjen så raskt som mulig. Vi beklager ulempen dette medfører!
        </p>
        <p class="my-5">
            I mellomtiden vil vi gjerne be deg sende oss henvendelsen din på e-post til:
            <a :href="'mailto:' + emailAddress" class="font-medium text-primary hover:underline">{{ emailAddress }}</a>
        </p>
        <div v-if="suggestedInfoItems && suggestedInfoItems.length > 0" class="p-4 mt-6 mb-6 bg-gray-100 dark:bg-gray-900 rounded-md">
            <p class="mb-4">For at vi skal kunne hjelpe deg så effektivt som mulig, er det supert om du inkluderer følgende i e-posten:</p>
            <ul class="mb-0 list-disc list-inside">
            <li v-for="(item, index) in suggestedInfoItems" :key="index" class="mb-2">{{ item }}</li>
            </ul>
        </div>
        <p class="mb-5 mr-10">Vi setter stor pris på din tålmodighet og ser frem til å høre fra deg på e-post!</p>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        emailAddress: {
            type: String,
            required: true,
        },
        formType: {
            type: String,
            required: true,
        },
        suggestedInfoItems: {
            type: Array,
            default: () => []
        },
    }); 
</script>