<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeadingElement>Arrangementer</HeadingElement>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-36 gap-y-8">
                <section class="space-y-4">
                    <p>Vi arrangerer 
                        <span class="relative group cursor-help underline decoration-dotted decoration-gray-500 underline-offset-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 rounded-sm" tabindex="0">
                            sykkel- og aktivitetsdager
                            <span role="tooltip" class="absolute bottom-full left-0 mb-2 w-60 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                                Arrangement for visning og utprøving av spesialtilpassede sykler
                            </span>
                        </span>, 
                        samt demonstrasjoner av våre spesialsykler rundt om i hele landet. I tillegg deltar vi på 
                        <span class="relative group cursor-help underline decoration-dotted decoration-gray-500 underline-offset-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 rounded-sm" tabindex="0">
                            hjelpemiddelmesser
                            <span role="tooltip" class="absolute bottom-full left-0 mb-2 w-72 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                                Stor messe som viser et bredt spekter av ulike tekniske hjelpemidler fra mange leverandører.
                            </span>
                        </span>. 
                        Dette er en unik mulighet til å <strong>prøve spesialsykkel</strong> i trygge og tilrettelagte omgivelser - <strong>helt gratis og uten forpliktelser</strong>.
                    </p>

                    <img src="@/assets/images/aktivitetsdag.jpg" alt="Rød kassebil med Quality Care logo i bakgrunnen, to personer, en stående lent mot bilen, den andre sittende på en liggesykkel" class="my-8 rounded">
                    
                    <p>På arrangementene får du:</p>
                    <ul class="-mt-3 list-disc list-outside ml-5">
                        <li><strong>Personlig veiledning</strong> fra våre spesialsykkelrådgivere</li>
                        <li>Mulighet til å teste flere ulike modeller</li>
                        <li>Hjelp til å forstå veien videre mot støtte fra NAV</li>
                    </ul>
                    <p>Arrangementene er åpne for <strong>brukere, pårørende og terapeuter.</strong></p>
                    <p>Bruk søkefeltet eller filtrene for å finne kommende arrangementer i ditt fylke.</p>
                    <p class="italic">Vi oppdaterer listen fortløpende!</p>

                    <p class="-mb-0.5">Finner du ikke et arrangement som passer for deg?</p>
                    <NavigationLink :to="{ name: 'bestill-provetime'}" class="text-sm">Bestill gratis prøvetime hjemme hos deg!</NavigationLink>
                </section>

                <section>
                    <div class="pb-6 space-y-8">
                        <div>
                            <p class="mb-4 text-sm">Filtrer på type arrangement eller bruk søkefeltet:</p>
                            <FilterButtons
                                id="event-type-filter"
                                :filters="eventTypeFilters"
                                :activeFilter="selectedEventType"
                                @update:activeFilter="updateEventTypeFilter"
                            />
                        </div>
                        
                        <div class="flex flex-wrap gap-x-6 gap-y-4 items-end">
                            <div class="relative flex-shrink-0 min-w-[180px] text-gray-500 dark:text-gray-400">
                                <label for="month-select" class="sr-only">Velg måned</label>
                                <select 
                                    id="month-select" 
                                    name="month-select"
                                    v-model="selectedMonth" 
                                    class="w-full h-10.5 pl-3 pr-8 border rounded text-sm appearance-none focus:shadow-outline bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                    <option value="" class="">-- Velg måned --</option>
                                    <option v-for="monthName in allMonthsOfYear" :key="monthName" :value="monthName">
                                        {{ monthName }}
                                    </option>
                                </select>
                                <div class="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                                    <svg class="w-5 h-5 fill-current text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="relative flex-grow min-w-[200px] dark:text-gray-200">
                                <label for="search-event" class="sr-only">Søk (sted/fylke/beskrivelse):</label>
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="search-event"
                                    v-model="searchQuery"
                                    type="text"
                                    placeholder="Søk sted/fylke/beskrivelse ..."
                                    class="p-2 pl-10 dark:bg-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded-full text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="min-h-[300px]">
                        <DataStatusIndicator
                            :isLoading="loading"
                            :error="errorState"
                            :isEmpty="!loading && !errorState && Object.keys(groupedSortedEvents).length === 0"
                            loadingText="Laster arrangementer..."
                            errorText="Vi klarte ikke å laste inn arrangementer akkurat nå. Sjekk gjerne nettverkstilkoblingen din og prøv igjen."
                            emptyTitle="Ingen arrangementer funnet"
                            :emptyText="selectedEventType !== ALL_TYPES_KEY || selectedMonth || searchQuery ? 'Ingen arrangementer funnet som passer valgte filtre.' : 'Ingen kommende arrangementer for øyeblikket.'"
                            :onRetry="fetchEvents"
                            >
                            <template #error-actions>
                                <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                                Tilbake til forsiden
                                </NavigationLink>
                            </template>

                            <template #empty-actions>
                                <button v-if="selectedEventType !== ALL_TYPES_KEY || selectedMonth || searchQuery" @click="clearFilters" 
                                    class="mt-6 inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    type="button"
                                >
                                nullstill alle filtre
                                </button>
                            </template>

                            <div class="space-y-8">
                                <div v-for="(eventsInMonth, monthYearGroup) in groupedSortedEvents" :key="monthYearGroup">
                                    <HeadingElement :level="3" class="mb-2 border-b border-gray-300 dark:border-gray-800"> 
                                        {{ monthYearGroup }}
                                    </HeadingElement>
                                    <ul>
                                        <li v-for="event in eventsInMonth" :key="event.id"
                                            class="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-4 bg-gray-100 dark:bg-gray-900 mb-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-150"
                                            >
                                            <div class="w-full sm:w-auto text-left sm:text-center tabular-nums pr-4" :class="{ 'opacity-70': isPast(event.dateObj) }">
                                                <template v-if="event.endDateObj && event.endDateObj.getTime() !== event.dateObj.getTime()">
                                                    <span class="block text-xl sm:text-2xl font-bold text-primary">
                                                        {{ formatDateDay(event.dateObj) }}.-{{ formatDateDay(event.endDateObj) }}.
                                                    </span>
                                                    <span class="block text-xs uppercase">
                                                        {{ formatDateMonth(event.dateObj) }}
                                                        <template v-if="formatDateMonth(event.dateObj) !== formatDateMonth(event.endDateObj)">
                                                            - {{ formatDateMonth(event.endDateObj) }}
                                                        </template>
                                                        <!-- {{ '.' + formatDateYear(event.dateObj) }} -->
                                                    </span>
                                                </template>
                                                <template v-else>
                                                    <span class="block text-2xl font-bold text-primary">{{ formatDateDay(event.dateObj) }}</span>
                                                    <span class="block text-xs uppercase">{{ formatDateMonth(event.dateObj) }}</span>
                                                </template>
                                            </div>

                                            <div class="relative min-w-0" 
                                                :class="{ 
                                                    'line-through text-gray-500': isPast(event.dateObj), 
                                                    'group cursor-help': isPast(event.dateObj)  
                                                }"
                                                :tabindex="isPast(event.dateObj) ? 0 : -1"
                                                :aria-describedby="isPast(event.dateObj) ? `past-event-desc-${event.id}` : undefined"
                                            >
                                                <p class="font-medium !text-gray-800 dark:!text-gray-300">{{ event.location }}{{ event.cityRegion ? `, ${event.cityRegion}` : '' }}</p>
                                                <p v-if="event.time" class="text-sm mt-1">Kl {{ event.time }}</p>
                                                <p v-if="event.description" class="text-sm mt-1">{{ event.description }}</p>

                                                <span v-if="isPast(event.dateObj)" 
                                                    :id="`past-event-desc-${event.id}`" 
                                                    role="tooltip" 
                                                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-auto px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                                                    Arrangementet har allerede vært
                                                </span>
                                            </div>

                                            <div class="w-full mt-4 sm:mt-0 sm:w-auto flex sm:flex-col gap-3">
                                                <NavigationLink :to="event.moreInfoLink || '#'"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    :class="[
                                                        'inline-flex items-center w-full sm:w-auto text-sm',
                                                        !event.moreInfoLink ? 'invisible pointer-events-none' : '',
                                                        isPast(event.dateObj) 
                                                            ? 'text-gray-400 pointer-events-none opacity-70' 
                                                            : 'text-gray-700 hover:text-primary hover:underline'
                                                    ]"
                                                    :aria-disabled="!event.moreInfoLink || isPast(event.dateObj)"
                                                    :tabindex="(!event.moreInfoLink || isPast(event.dateObj)) ? -1 : 0"
                                                    >
                                                    Mer info
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </NavigationLink>
                                                <NavigationLink :to="event.signupLink || '#'"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    :class="[
                                                        'inline-flex items-center w-full sm:w-auto text-sm font-bold',
                                                        !event.signupLink ? 'invisible pointer-events-none' : '',
                                                        isPast(event.dateObj) 
                                                            ? 'text-gray-400 pointer-events-none opacity-70' 
                                                            : 'text-primary hover:underline'
                                                    ]"
                                                    :aria-disabled="!event.signupLink || isPast(event.dateObj)"
                                                    :tabindex="(!event.signupLink || isPast(event.dateObj)) ? -1 : 0"
                                                    >
                                                    Påmelding
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </NavigationLink>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </DataStatusIndicator>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'; 
    import { useActivities } from '@/composables/useActivities'; 
    import DataStatusIndicator from '@/components/common/DataStatusIndicator.vue';

    const { allEvents, loading, errorState, formatDateDay, formatDateMonth, formatDateYear, isPast, fetchEvents } = useActivities();

    const ALL_TYPES_KEY = 'all';

    const selectedEventType = ref(ALL_TYPES_KEY);
    const selectedMonth = ref('');
    const searchQuery = ref('');
    
    const allMonthsOfYear = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

    const eventTypeFilters = ref([
        { key: ALL_TYPES_KEY, label: 'Alle typer', isSpecial: true },
        { key: 'hjelpemiddelmesse', label: 'Hjelpemiddelmesse' },
        { key: 'sykkel/aktivitetsdag', label: 'Sykkel/Aktivitetsdag' },
        { key: 'camp', label: 'Camp' }, 
    ]);

    const updateEventTypeFilter = (newKey) => {
        selectedEventType.value = newKey;
    };

    const clearFilters = () => {
        selectedEventType.value = ALL_TYPES_KEY;
        selectedMonth.value = '';
        searchQuery.value = '';
    };

    const baseFilteredEvents = computed(() => {
        return allEvents.value.filter(event => { 
            let matchesEventType = false;
            if (selectedEventType.value === ALL_TYPES_KEY) {
                matchesEventType = true;
            } else if (selectedEventType.value === 'annet') { 
                matchesEventType = event.eventType !== 'hjelpemiddelmesse' && event.eventType !== 'sykkel/aktivitetsdag' && event.eventType !== 'camp';
            } else {
                matchesEventType = event.eventType === selectedEventType.value;
            }

            const lowerSearchQuery = searchQuery.value.toLowerCase();
            const matchesSearch = !searchQuery.value ||
                (event.location && event.location.toLowerCase().includes(lowerSearchQuery)) ||
                (event.cityRegion && event.cityRegion.toLowerCase().includes(lowerSearchQuery)) ||
                (event.description && event.description.toLowerCase().includes(lowerSearchQuery));

            const hasRequiredFields = !!event.dateObj && !!event.location && !!event.cityRegion && !!event.description;
            const hasTimeIfNeeded = event.eventType === 'camp' || !!event.time; 
            const isComplete = hasRequiredFields && hasTimeIfNeeded; 
            
            return matchesEventType && matchesSearch && isComplete;
        });
    });
     
    const eventsToDisplay = computed(() => {
        let result = [...baseFilteredEvents.value];

        if (selectedMonth.value) {
            result = result.filter(event => {
                const eventMonthName = event.month; 
                return eventMonthName?.toLowerCase() === selectedMonth.value.toLowerCase();
            });
        } else {
            result = result.filter(event => !isPast(event.dateObj));
        }
        return result;
    });

    const sortedEvents = computed(() => { 
        const eventsToSort = [...eventsToDisplay.value]; 
        return eventsToSort.sort((a, b) => (a.dateObj?.getTime() ?? 0) - (b.dateObj?.getTime() ?? 0)); 
    });
    
    const groupedSortedEvents = computed(() => { 
         const groups = {}; 
         sortedEvents.value.forEach(event => { 
            const groupKey = event.dateObj ? event.dateObj.toLocaleString('nb-NO', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : 'Ukjent periode'; 
            if (!groups[groupKey]) groups[groupKey] = []; 
            groups[groupKey].push(event); 
        }); 
        const sortedGroupKeys = Object.keys(groups).sort((a, b) => { 
            const dateA = groups[a][0]?.dateObj; 
            const dateB = groups[b][0]?.dateObj; 
            if (!dateA) return 1; if (!dateB) return -1; 
            return dateA.getTime() - dateB.getTime(); 
        }); 
        const sortedGroups = {}; 
        sortedGroupKeys.forEach(key => { sortedGroups[key] = groups[key]; }); 
        return sortedGroups; 
    });

</script>