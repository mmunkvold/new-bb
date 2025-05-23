<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">
        <HeadingElement>Teknisk informasjon om våre spesialsykler</HeadingElement>
        <div class="flex flex-col md:flex-row gap-10 md:gap-20">
            <div class="max-w-4xl space-y-3">
                <p>Her finner du <strong>teknisk informasjon, brukermanualer, målsatte tegninger, og brosjyrer</strong> for våre spesialsykler og tilbehør. Dokumentene inkluderer blant annet:</p>
                <ul class="list-disc list-inside">
                    <li><strong>Sykkelspesifikasjoner</strong> (mål, vekt, dimensjoner)</li>
                    <li><strong>Bruksanvisninger og monteringsveiledninger</strong></li>
                    <li><strong>Sprengskisser</strong> for deler og tilbehør</li>
                    <li><strong>CE-dokumentasjon og sertifikater</strong></li>
                    <li>Informasjon om <strong>hjelpemotorer (Heinzmann og Shimano)</strong></li>
                </ul>
            </div>

            <div class="mx-auto min-w-sm bg-gray-100 dark:bg-gray-900 rounded p-9 h-fit">
                <p>Finner du ikke det du leter etter?</p>
                <NavigationLink :to="{ name: 'kontakt-oss'}">Kontakt oss for hjelp</NavigationLink>
            </div>
        </div>

        <div class="my-8 pb-6">
            <FilterButtons
                :filters="filters"
                :activeFilter="activeFilter"
                @update:activeFilter="updateFilter"
            />
        </div>

        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && Object.keys(groupedFilteredDocs).length === 0"
            loadingText="Laster dokumenter..."
            errorText="Vi klarte ikke å laste inn dokumenter akkurat nå. Sjekk gjerne nettverkstilkoblingen din og prøv igjen."
            emptyTitle="Ingen dokumenter funnet"
            :emptyText="activeFilter !== 'all' ? `Ingen dokumenter funnet som matcher filteret '${filters.find(f => f.key === activeFilter)?.label || activeFilter}'.` : 'Ingen teknisk informasjon er tilgjengelig for øyeblikket.'"
            :onRetry="fetchDocs"
            >
            <template #error-actions>
                <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                    Tilbake til forsiden
                </NavigationLink>
            </template>
            
            <template #empty-actions>
                <button v-if="activeFilter !== 'all'" @click="updateFilter('all')" 
                    class="mt-6 inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    type="button"
                >
                vis alle dokumenter
                </button>
            </template>

            <div class="grid md:grid-cols-2 gap-10">
                <div v-for="(docsInType, docType) in groupedFilteredDocs" :key="docType" class="">
                    <HeadingElement :level="2" class="!text-base text-gray-800 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-t-md">
                        {{ docType }}
                    </HeadingElement>

                    <ul class="-mt-1 border border-gray-200 dark:border-gray-800 rounded-b-md divide-y divide-gray-200 dark:divide-gray-800">
                        <li v-for="doc in docsInType" :key="doc.id" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150">
                            <div class="flex items-center space-x-3 min-w-0">
                                <div class="flex-shrink-0 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <p class="text-sm font-medium truncate" :title="doc.title">
                                        {{ doc.title }}
                                    </p>
                                    <p v-if="doc.category && activeFilter === 'all'" class="text-xs text-gray-500 truncate" :title="doc.category">
                                        {{ doc.category }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 sm:ml-4">
                                <a v-if="doc.file"
                                    :href="doc.file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-fit sm:w-auto inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium py-1 px-2.5 text-xs rounded hover:bg-blue-100 hover:text-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                                    :title="'Åpne ' + doc.title"
                                >
                                    Åpne
                                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-4 w-4 ml-2" viewBox="0 0 24 24"><g fill="currentColor" aria-hidden="true">
                                        <path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g>
                                    </svg>
                                </a>
                                <span v-else class="inline-block text-xs text-gray-400 italic">(Fil under oppdatering)</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </DataStatusIndicator>

            <div class="full-width mt-20 -mb-20 py-16 md:py-26 bg-gray-100 dark:bg-gray-900/50">
                <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <HeadingElement :level="2">Finner du ikke det du leter etter?</HeadingElement>
                    <NavigationLink :to="{ name: 'kontakt-oss', hash: '#form'}" class="mt-8 sm:mt-auto">
                        Kontakt oss for hjelp
                    </NavigationLink> 
                </div>
            </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted, computed } from 'vue'
    import DataStatusIndicator from '@/components/common/DataStatusIndicator.vue'
  
    const docs = ref([]);
    const isLoading = ref(true);
    const errorState = ref(null);
    const activeFilter = ref('all'); 
    
    const filters = ref([
        { key: 'all', label: 'Vis alt', isSpecial: true },
        { key: 'Kettwiesel', label: 'Kettwiesel' },
        { key: 'Kettwiesel EP8', label: 'Kettwiesel EP8' },
        { key: 'Pino Steps', label: 'Pino Steps' },
        { key: 'Handbike', label: 'Handbike' },
        { key: 'Trigo Up', label: 'Trigo Up' },
        { key: 'Trigo', label: 'Trigo' },
        { key: 'Trets', label: 'Trets' },
    ]);

    const fetchDocs = async () => {
        isLoading.value = true;
        errorState.value = null;

        try {
            const res = await fetch('/data/technical.json')
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`)
        }
            const data = await res.json()
            docs.value = data.sort((a, b) => a.title.localeCompare(b.title))
        } catch (e) {
            console.error('Kunne ikke hente teknisk info:', e)
            docs.value = [];
            errorState.value = e.message || "En feil oppstod ved lasting av teknisk informasjon.";
        } finally {
            isLoading.value = false
        }
    }

    const groupedFilteredDocs = computed(() => {
        const filteredDocs = activeFilter.value === 'all'
        ? docs.value
        : docs.value.filter(doc => doc.product === activeFilter.value)
    
        const groups = {}
        filteredDocs.forEach(doc => {
            const type = doc.type || 'Annet'
            if (!groups[type]) {
                groups[type] = {
                    docs: [],
                    order: doc.order ?? 9999 
                }
            }
            groups[type].docs.push(doc)
        });
    
        return Object.entries(groups)
            .sort(([, a], [, b]) => a.order - b.order)
            .reduce((acc, [type, group]) => {
                acc[type] = group.docs
                return acc
            }, {});
    });

    const updateFilter = (filterKey) => {
        activeFilter.value = filterKey
    };
    
    onMounted(fetchDocs);

</script>