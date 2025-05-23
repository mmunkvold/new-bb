<template>
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <HeadingElement :level="2" class="text-center">Arrangementer og aktivitetsdager</HeadingElement>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-20">
            <div class="space-y-4">
                <HeadingElement :level="3">Kom og møt oss!</HeadingElement>
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <img src="@/assets/images/aktivitetsdag.jpg" class="rounded h-full" 
                        alt="Rød kassebil med Quality Care logo i bakgrunnen, to personer, en stående lent mot bilen, den andre sittende på en liggesykkel" 
                        loading="lazy"
                    />
                    <p class="">Vi deltar jevnlig på ulike arrangementer gjennom året, som <strong>sykkel- og aktivitetsdager samt hjelpemiddelmesser</strong>. Her får du muligheten til å teste våre spesialsykler og finne den som passer best for deg.</p>
                    <p class="sm:col-span-2">Enten du er <strong>bruker, pårørende eller terapeut,</strong> er dette en flott anledning til å prøve forskjellige modeller og få hjelp til å finne løsningen som gir deg den beste opplevelsen og funksjonaliteten i hverdagen.</p>
                </div>
                <p class="text-lg pb-4 text-pretty">Kom og prøv, vi er her for å hjelpe deg med å finne riktig sykkel!</p>
            </div>

            <div class="mt-8 md:mt-0 bg-white dark:bg-gray-800/50 rounded py-6">
                <HeadingElement :level="3" class="text-center mb-6">Kommende arrangementer</HeadingElement>

                <p v-if="loading" class="text-center text-gray-500 py-10">
                    <BicycleLoader />
                    <span class="mt-4 text-lg italic">Laster arrangementer...</span>
                </p>

                <div v-else class="px-8 min-h-[300px] flex flex-col">
                    <div v-if="currentMonthEvents.length > 0" class="flex-grow">
                        <HeadingElement :level="3">{{ currentMonthName }} {{ currentYearForDisplayedMonth }}</HeadingElement>
                        <ul class="border-t border-gray-300">
                            <li v-for="event in displayedMonthEvents" :key="event.id"
                                class="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center p-3 bg-gray-100 dark:bg-gray-800 mb-2 rounded"
                            >
                                <div class="w-full sm:w-auto text-left sm:text-center tabular-nums pr-2 sm:pr-0">
                                    <template v-if="event.endDateObj && event.endDateObj.getTime() !== event.dateObj.getTime()">
                                        <span class="block text-xl sm:text-2xl font-bold text-icon-red">
                                            {{ formatDateDay(event.dateObj) }}.-{{ formatDateDay(event.endDateObj) }}.
                                        </span>
                                        <span class="block text-xs uppercase text-gray-600 dark:text-gray-400">
                                        {{ formatDateMonth(event.dateObj) }}
                                        <template v-if="formatDateMonth(event.dateObj) !== formatDateMonth(event.endDateObj)">
                                            - {{ formatDateMonth(event.endDateObj) }}
                                        </template>
                                            <!-- {{ '.' + formatDateYear(event.dateObj) }} -->
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span class="block text-2xl font-bold text-icon-red">{{ formatDateDay(event.dateObj) }}</span>
                                        <span class="block text-xs uppercase text-gray-600 dark:text-gray-400">{{ formatDateMonth(event.dateObj) }}<!-- {{ '.' + formatDateYear(event.dateObj) }} --></span>
                                    </template>
                                </div>

                                <div class="min-w-0 text-sm">
                                    <p class="font-medium text-gray-800 dark:text-gray-300">{{ event.location }}{{ event.cityRegion ? `, ${event.cityRegion}` : '' }}</p>
                                    <p v-if="event.time" class="text-xs text-gray-600 dark:text-gray-400">Kl {{ event.time }}, <span v-if="event.description">{{ event.description }}</span></p>
                                    <p v-else-if="event.eventType === 'camp'" class="text-xs text-gray-600 dark:text-gray-400">{{ event.description }}</p>
                                    <p v-else-if="event.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ event.description }}</p>
                                </div>

                                <div class="mt-2 sm:mt-0 flex flex-row sm:flex-col gap-3 sm:gap-3 mr-3">
                                    <NavigationLink :to="event.moreInfoLink || event.moreInfo || '#'"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        :class="['inline-flex items-center mt-2 sm:mt-0 text-xs text-gray-700 dark:text-gray-400', !(event.moreInfoLink || event.moreInfo) ? 'invisible pointer-events-none' : '']"
                                        :aria-disabled="!(event.moreInfoLink || event.moreInfo)"
                                        :tabindex="!(event.moreInfoLink || event.moreInfo) ? -1 : 0">
                                        Mer info
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </NavigationLink>
                                    <NavigationLink :to="event.signupLink || '#'"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        :class="['inline-flex items-center mt-2 text-xs text-icon-red', !event.signupLink ? 'invisible pointer-events-none' : '']"
                                        :aria-disabled="!event.signupLink"
                                        :tabindex="(!event.signupLink) ? -1 : 0">
                                        Påmelding
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </NavigationLink>
                                </div>
                            </li>
                        </ul>

                        <div v-if="!isExpanded && currentMonthEvents.length > 3" class="mt-4 pt-3 text-center">
                            <BaseButton 
                                @click="expandList"
                                type="button"
                            >
                                vis alle {{ currentMonthEvents.length }} for {{ currentMonthName }}
                            </BaseButton>
                        </div>
                    </div>

                    <div v-else class="italic text-center text-gray-500 dark:text-gray-400 py-6 flex-grow flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-100 dark:text-gray-700 mx-auto" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.121 14.121-4.242-4.242m0 4.242 4.242-4.242" />
                        </svg>
                        <p>Ingen planlagte arrangementer for {{ currentMonthName }}</p>
                        <div class="mt-4">
                            <BaseButton 
                                @click="showNextMonthEvents"
                                type="button"
                            >
                                se neste måned
                            </BaseButton>
                        </div>
                    </div>

                    <div class="mt-6 pt-6 text-center">
                        <NavigationLink :to="{ name: 'arrangementer'}" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:underline">
                            Se full arrangementsoversikt
                        </NavigationLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";
    import { useActivities } from "@/composables/useActivities";
    import HeadingElement from '@/components/common/HeadingElement.vue';
    import NavigationLink from '@/components/common/NavigationLink.vue';

    const { upcomingEvents, loading } = useActivities();

    const currentDisplayMonthIndex = ref(new Date().getMonth());
    const currentDisplayYear = ref(new Date().getFullYear());
    const isExpanded = ref(false);

    const currentMonthName = computed(() => {
        const date = new Date();
        date.setDate(1);
        date.setFullYear(currentDisplayYear.value);
        date.setMonth(currentDisplayMonthIndex.value);
        return date.toLocaleString("nb-NO", { month: "long" });
    });

    const currentYearForDisplayedMonth = computed(() => {
        return currentDisplayYear.value;
    });

    const currentMonthEvents = computed(() => {
        if (loading.value || !Array.isArray(upcomingEvents.value)) {
            return [];
        }
        const eventsInMonthYear = upcomingEvents.value.filter((event) => {
            if (!event.dateObj || isNaN(event.dateObj)) return false;
            const eventMonth = event.dateObj.getUTCMonth();
            const eventYear = event.dateObj.getUTCFullYear();
            return eventMonth === currentDisplayMonthIndex.value && eventYear === currentDisplayYear.value;
        });

        const completeEvents = eventsInMonthYear.filter(event => {
            const hasRequiredFields = !!event.dateObj &&
                !!event.location &&
                !!event.cityRegion &&
                !!event.description;

            const hasTimeIfNeeded = event.eventType === 'camp' || !!event.time;

            return hasRequiredFields && hasTimeIfNeeded;
        });

        return completeEvents.sort((a, b) => {
            const dateA = a.dateObj?.getTime() ?? 0;
            const dateB = b.dateObj?.getTime() ?? 0;
            return dateA - dateB;
        });
    });

    const displayedMonthEvents = computed(() => {
        return isExpanded.value ? currentMonthEvents.value : currentMonthEvents.value.slice(0, 3);
    });

    const expandList = () => {
        isExpanded.value = true;
    };

    const showNextMonthEvents = () => {
        let currentSearchYear = currentDisplayYear.value;
        let currentSearchMonth = currentDisplayMonthIndex.value;
        let attempts = 0;
        const todayTimestamp = new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime();

        while (attempts < 12) {
            currentSearchMonth++;
            if (currentSearchMonth > 11) {
                currentSearchMonth = 0;
                currentSearchYear++;
            }

            const validEventsExistInNextMonth = upcomingEvents.value.some(event => {
                if (!event.dateObj || isNaN(event.dateObj)) return false;

                if (!(event.dateObj.getUTCFullYear() === currentSearchYear && event.dateObj.getUTCMonth() === currentSearchMonth)) {
                    return false;
                }
                if (event.dateObj.getTime() < todayTimestamp) return false;


                const hasRequiredFields = !!event.location && !!event.cityRegion && !!event.description;
                const hasTimeIfNeeded = event.eventType === 'camp' || !!event.time;

                return hasRequiredFields && hasTimeIfNeeded;
            });

            if (validEventsExistInNextMonth) {
                currentDisplayMonthIndex.value = currentSearchMonth;
                currentDisplayYear.value = currentSearchYear;
                isExpanded.value = false;
                return;
            }

            attempts++;
            if (attempts >= 12) break;
        }

        alert("Ingen flere kommende arrangementer funnet i påfølgende måneder.");
    };

    const formatDateDay = (dateObj) => { if (!dateObj || isNaN(dateObj)) return '?'; return dateObj.getUTCDate(); };
    const formatDateMonth = (dateObj) => { if (!dateObj || isNaN(dateObj)) return ''; return dateObj.toLocaleString('nb-NO', { month: 'short' }).toUpperCase().replace('.', ''); };
    const formatDateYear = (dateObj) => { if (!dateObj || isNaN(dateObj)) return ''; return dateObj.getUTCFullYear(); }

</script>