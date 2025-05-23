<template>
    <div class="w-full h-fit space-y-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 p-4 rounded-md">
        <HeadingElement :level="3">Mer informasjon</HeadingElement>

        <div class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button @click="toggleAccordion('technicalInfo')" 
                class="w-full flex justify-between items-center text-left font-semibold p-3 md:p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition duration-200 ease-in-out cursor-pointer"
                type="button"
            >
                <span>Teknisk Informasjon</span>
                <span class="text-xl font-light">{{ accordionState.technicalInfo ? '-' : '+' }}</span>
            </button>
            <div v-if="accordionState.technicalInfo" class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-none text-sm">
                <p class="mb-2">Tekniske spesifikasjoner:</p>
                <ul v-if="props.specifications && Object.keys(props.specifications).length > 0" class="list-disc list-outside ml-5">
                    <li v-for="(value, key) in props.specifications" :key="key">
                        {{ value }}
                    </li>
                </ul>
                <p v-else class="italic text-gray-500 dark:text-gray-400">Ingen spesifikasjoner oppgitt.</p>
            </div>
        </div>

        <div class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button @click="toggleAccordion('brochure')" 
                class="w-full flex justify-between items-center text-left font-semibold p-3 md:p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition duration-200 ease-in-out cursor-pointer"
                type="button"
            >
                <span>Brosjyrer & dokumenter</span>
                <!-- <span v-if="props.brochuresAndDocs.length > 0" class="text-xs font-normal text-gray-500 dark:text-gray-400 mr-2">({{ props.brochuresAndDocs.length }})</span> -->
                <span class="text-xl font-light">{{ accordionState.brochure ? '-' : '+' }}</span>
            </button>
            <div v-if="accordionState.brochure" class="p-4 bg-white dark:bg-gray-800 text-sm border-t border-gray-200 dark:border-none">
                <p v-if="props.isLoadingDocs" class="text-center text-gray-500 italic">Laster dokumenter...</p>
                <ul v-else-if="props.brochuresAndDocs.length > 0" class="space-y-3">
                    <li v-for="doc in props.brochuresAndDocs" :key="doc.id" class="flex items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
                        <a :href="doc.file" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:underline text-primary dark:text-red-600 min-w-0 group">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <span class="truncate font-medium" :title="doc.title">{{ doc.title }}</span>
                            <span v-if="doc.type" class="ml-1 text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">({{ doc.type }})</span>
                        </a>
                        <a :href="doc.file" target="_blank" rel="noopener noreferrer" 
                            :title="'Åpne ' + doc.title"
                            class="flex-shrink-0 inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-1 px-2.5 text-xs rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-300 transition duration-150 ease-in-out">
                            Åpne
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="inline-block h-3 w-3 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                        </a>
                    </li>
                </ul>
                <p v-else class="text-gray-500 italic text-center p-2">Ingen brosjyrer eller andre dokumenter funnet for dette produktet.</p>
            </div>
        </div>

        <div class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button @click="toggleAccordion('addons')" 
                class="w-full flex justify-between items-center text-left font-semibold p-3 md:p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition duration-200 ease-in-out cursor-pointer"
                type="button"
            >
                <span>Tilbehør</span>
                <!-- <span v-if="props.addons.length > 0" class="text-xs font-normal text-gray-500 dark:text-gray-400 mr-2">({{ props.addons.length }})</span> -->
                <span class="text-xl font-light">{{ accordionState.addons ? '-' : '+' }}</span>
            </button>
            <div v-if="accordionState.addons" class="p-4 bg-white dark:bg-gray-800 text-sm border-t border-gray-200 dark:border-none">
                <div v-if="props.addons.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <ul v-for="addon in props.addons" :key="addon.id" 
                        @click="emit('navigateToAddon', addon.id)"
                        class="flex flex-col bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-none hover:scale-101 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition duration-200 ease-in-out cursor-pointer items-center text-center">
                        <li class="mt-2 !text-xs">{{ addon.name }}</li>
                    </ul>
                </div>
                <p v-else class="bg-gray-50 p-2 rounded-lg border border-gray-200 text-center text-gray-500">Ikke noe tilbehør funnet for dette produktet.</p>    
            </div>  
        </div> 

        <div class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button @click="toggleAccordion('sketch')" 
                class="w-full flex justify-between items-center text-left font-semibold p-3 md:p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition duration-200 ease-in-out cursor-pointer"
                type="button"
            >
                <span>Sprengskisse</span>
                <span class="text-xl font-light">{{ accordionState.sketch ? '-' : '+' }}</span>
            </button>
            <div v-if="accordionState.sketch" class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-none text-sm">
                <p v-if="props.isLoadingDocs" class="text-center text-gray-500 italic">Laster dokument...</p>
                <div v-else-if="props.sketch && props.sketch.file" class="flex items-center justify-between gap-3">
                    <a :href="props.sketch.file" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:underline text-primary dark:text-secondary min-w-0 group">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.5L12 3m0 0L9.75 4.687M12 3v2.25M3 16.5l2.25-1.313M3 16.5l2.25 1.313M3 16.5V19.5m18-3-2.25-1.313m2.25 0l-2.25 1.313M21 16.5V19.5" />
                        </svg>
                        <span class="truncate font-medium" :title="props.sketch.title">{{ props.sketch.title || 'Sprengskisse' }}</span>
                    </a>
                    <a :href="props.sketch.file" target="_blank" rel="noopener noreferrer"
                        :title="'Åpne ' + (props.sketch.title || 'Sprengskisse')"
                        class="flex-shrink-0 inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-1 px-2.5 text-xs rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-300 transition duration-150 ease-in-out">
                        Åpne
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="inline-block h-3 w-3 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                    </a>
                </div>
                <p v-else class="text-gray-500 italic text-center p-2">Ingen sprengskisse funnet for dette produktet.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    
    const props = defineProps({
        specifications: {
            type: Object,
            default: () => ({})
        },
        brochuresAndDocs: {
            type: Array,
            default: () => []
        },
        sketch: {
            type: Object,
            default: null
        },
        addons: {
            type: Array,
            default: () => []
        },
        isLoadingDocs: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['navigateToAddon']);

    const accordionState = ref({
        brochure: false,
        technicalInfo: false,
        addons: false,
        sketch: false
    });

    const toggleAccordion = (section) => {
        if (accordionState.value.hasOwnProperty(section)) {
            accordionState.value[section] = !accordionState.value[section];
        } else {
            console.warn(`Accordion section "${section}" does not exist in state.`);
        }
    };
</script>