<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">
        <HeadingElement>Tilbehør og ekstrautstyr</HeadingElement>
        <div class="flex flex-col md:flex-row gap-10 md:gap-20">
            <div class="max-w-3xl space-y-3">
                <p>Vi tilbyr et <strong>bredt utvalg av sykkeltilbehør og tilleggsutstyr</strong> som gjør din spesialsykkel enda bedre tilpasset dine behov.</p>
                <p>Enten du trenger <strong>ekstra støtte, bedre sittestilling, hjelpemotor, eller funksjonelle løsninger som trinnløst gir</strong> fra Rohloff eller Heinzmann el-motor, finner du det her.</p>
                <p>Våre tilbehørsløsninger gir deg <strong>økt komfort, trygghet og fleksibilitet</strong> - uansett alder, funksjonsnivå eller bruksområde.</p>
            </div>
            <p class="max-w-md bg-gray-100 dark:bg-gray-900 rounded p-6 h-fit">Alt tilbehør er kompatibelt med våre Hase Bikes-modeller og tilpasset NAV-godkjente løsninger. Vi hjelper deg med riktig sykkeltilpasning - enten det gjelder hverdagsbruk, trening eller transport.</p>
        </div>
        
        <div class="my-8 pb-6">
            <FilterButtons
                :filters="filters"
                :activeFilter="activeFilter"
                @update:activeFilter="updateFilter"
            />
            <button v-if="showClearSelection" @click="clearSelection" 
                class="mt-3 bg-gray-200 dark:bg-gray-800 border border-secondary dark:border-yellow-600 rounded text-xs px-2 py-1 h-fit hover:bg-gray-400 hover:text-white hover:scale-[.95] hover:opacity-75 hover:cursor-pointer"
                type="button"
            >
                Fjern markering
            </button>
        </div>

        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && filteredAddons.length === 0"
            loadingText="Laster tilbehør..."
            errorText="Vi klarte ikke å laste inn tilbehør akkurat nå. Sjekk gjerne nettverkstilkoblingen din og prøv igjen."
            emptyTitle="Ingen tilbehør funnet"
            :emptyText="activeFilter !== 'all' ? `Ingen tilbehør funnet som passer filteret '${filters.find(f => f.key === activeFilter)?.label || activeFilter}'.` : 'Ingen tilbehør er tilgjengelig for øyeblikket.'"
            :onRetry="loadAddonsData"
            >
            <template #error-actions>
                <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                Tilbake til forsiden
                </NavigationLink>
            </template>

            <template #empty-actions>
         <button v-if="activeFilter !== 'all'" @click="clearFilter" 
            class="mt-6 inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            type="button"
        >
           vis alt tilbehør
         </button>
      </template>

      <div>
        <div class="mx-3 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-8">
            <div v-for="addon in filteredAddons" :key="addon.id"
                class="bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900 rounded-lg"
                :class="{'border-2 border-secondary dark:border-yellow-600': selectedAddonId === addon.id}"
                :ref="el => setAddonRef(el, addon.id)"
            >
            <div class="relative w-full h-56"> 
                <img v-if="addon.image?.src" :src="addon.image.src" :alt="addon.image.altText" class="w-full h-full object-cover rounded" 
                loading="lazy" />
                <p v-if="addon.is_negotiated" class="absolute top-2 right-2 w-fit bg-green-600 !text-white text-xs font-bold px-2 py-2 rounded-full flex items-center gap-1 shadow-xl">
                    <ApprovedIcon class="text-2xl" aria-hidden="true" /></p>
            </div>
                <div class="p-4">
                    <HeadingElement :level="2" class="!text-base sm:text-xl">{{ addon.name }}</HeadingElement>
                    <p class="text-xs">
                        <span v-if="addon.compatible_all">Alle sykler</span>
                        <span v-else>{{ getCompatibleProducts(addon.compatible_products) }}</span>
                    </p>
                    <div class="mt-2 mb-4 flex flex-col sm:flex-row gap-2 text-xs">
                        <p v-if="addon.artnr" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 rounded"><span class="font-bold">Artnr:</span> {{ addon.artnr }}</p>
                        <p v-if="addon.hmsnr" class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 rounded"><span class="font-bold">HMS-nr:</span> {{ addon.hmsnr }}</p>
                    </div>
                    <p class="mb-6">{{ addon.description }}</p>

                    <ul v-if="addon.variants && addon.variants.length" class="list-inside text-xs">
                        <li v-for="variant in addon.variants" :key="variant.artnr" class="bg-gray-100 dark:bg-gray-950 p-1 rounded mb-1 space-y-1">
                            <span v-if="variant.info" class="block font-semibold">{{ variant.info }}</span>
                            <span v-if="variant.size" class="block"><span class="font-semibold">Størrelse:</span> {{ variant.size }}</span>
                            <span v-if="variant.bike" class="block"><span class="font-semibold">Sykkel:</span> {{ variant.bike }}</span>
                            <span v-if="variant.color" class="block"><span class="font-semibold">Farge:</span> {{ variant.color }}</span>
                            <span v-if="variant.artnr" class="block"><span class="font-semibold">Artnr:</span> {{ variant.artnr }}</span>
                            <span v-if="variant.hmsnr" class="block"><span class="font-semibold">HMS-nr:</span> {{ variant.hmsnr }}</span>
                        </li>
                    </ul>
                    <div v-if="addon.parts && addon.parts.length > 0">
                        <p class="text-sm">Settet består av:</p>
                        <ul class="list-inside text-xs">
                            <li v-for="part in addon.parts" :key="part.artnr" class="bg-gray-100 dark:bg-gray-950 p-1 rounded mb-1 space-y-1">
                                <span class="uppercase">{{ part.part_name }}:</span>
                                <span class="block"><span class="ml-4 font-bold">Artnr:</span> {{ part.artnr }}</span><span class="block"><span class="ml-4 font-bold">HMS-nr:</span> {{ part.hmsnr }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-8 flex flex-col">
                    <div class="inline-flex gap-4 items-center">
                        <div class="rounded-full bg-green-600 !text-white text-xs font-bold px-2 py-2">
                            <ApprovedIcon class="text-xl" aria-hidden="true" />
                        </div>
                        <p class="text-sm">Produkter med dette merket er prisforhandlet med NAV</p>
                    </div>
                    <div class="relative">
                        <button
                            @click="showInfo = !showInfo"
                            @keydown.enter.prevent="showInfo = !showInfo"
                            class="underline text-sm ml-13 cursor-pointer"
                            aria-haspopup="dialog"
                            aria-controls="info-popup"
                            :aria-expanded="showInfo.toString()"
                            aria-label="Hva betyr dette merket?"
                            type="button"
                        >
                            Hva betyr dette?
                        </button>

                        <div v-if="showInfo"
                            id="info-popup"
                            role="dialog"
                            aria-modal="true"
                            class="absolute z-50 bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-md p-4 w-64 top-full mt-2 left-0"
                            @keydown.esc="showInfo = false"
                            tabindex="-1"
                            ref="popupRef"
                            aria-labelledby="popup-title"
                            aria-describedby="popup-desc">
                            <h4 id="popup-title" class="sr-only">Info om prisforhandlet merke</h4>

                            <p id="popup-desc" class="text-sm">
                                Produktet er en del av en prisforhandlet avtale med NAV, og kan derfor være lettere å få finansiert gjennom hjelpemiddelsentralen.
                            </p>

                            <button
                                @click="showInfo = false"
                                class="mt-4 bg-gray-600 text-gray-300 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 text-sm rounded hover:bg-gray-700"
                                type="button"
                            >
                                lukk
                            </button>
                        </div>
                    </div>
                </div>
    </div>
    </DataStatusIndicator>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch, nextTick } from 'vue';
    import { useRoute, useRouter } from "vue-router";
    import DataStatusIndicator from '@/components/common/DataStatusIndicator.vue';

    const route = useRoute();
    const router = useRouter();
    const addons = ref([]);
    const filteredAddons = ref([]);
    const products = ref([]);
    const selectedAddonId = ref(null);
    const addonRefs = ref({});
    const showInfo = ref(false)
    const popupRef = ref(null)
    const isLoading = ref(true);
    const errorState = ref(null);

    watch(showInfo, async (val) => {
        if (val) {
            await nextTick()
            popupRef.value?.focus()
        }
    })

    const filters = ref([
        { key: 'all', label: 'Vis alt', isSpecial: true },
        { key: '1', label: 'Kettwiesel' },
        { key: '2', label: 'Kettwiesel EP8' },
        { key: '3', label: 'Pino Steps' },
        { key: '4', label: 'Handbike' },
        { key: '5', label: 'Trigo Up' },
        { key: '6', label: 'Trigo' },
        { key: '7', label: 'Trets' },
    ]);

    const activeFilter = ref('all');

    const showClearSelection = computed(() => {
        return !!route.query.selectedAddonId;
    });

    const setAddonRef = (el, id) => {
        if (el) {
            addonRefs.value[id] = el;
        } else {
            if (addonRefs.value[id]) {
                delete addonRefs.value[id];
            }
        }
    };

    const scrollToSelectedAddon = () => {
        const idToScroll = selectedAddonId.value;
        if (idToScroll && addonRefs.value[idToScroll]) {
            addonRefs.value[idToScroll].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            addonRefs.value[idToScroll].focus({ preventScroll: true });
        }
    };

    const loadAddonsData = async () => {
        isLoading.value = true;
        errorState.value = null; 
        products.value = [];
        addons.value = [];
        filteredAddons.value = [];

        try {
            const productsResponse = await fetch("/data/products.json");
            if (!productsResponse.ok) throw new Error('Feil ved henting av produkter');
            products.value = await productsResponse.json();

            const addonsResponse = await fetch("/data/addons.json");
            if (!addonsResponse.ok) throw new Error('Feil ved henting av tilbehør');
            const allAddonsData = await addonsResponse.json();
            addons.value = allAddonsData.sort((a,b) => a.name.localeCompare(b.name)); 
            
            const queryId = route.query.selectedAddonId;
            if (queryId) {
                const parsedId = parseInt(queryId, 10);
                if (!isNaN(parsedId)) {
                    selectedAddonId.value = parsedId;
                    const addonExists = addons.value.some(a => a.id === parsedId);
                    if (addonExists) {
                        const targetAddon = addons.value.find(a => a.id === parsedId);
                        if (targetAddon && targetAddon.compatible_products && targetAddon.compatible_products.length > 0 && !targetAddon.compatible_all) {
                            const firstCompatibleProductKey = String(targetAddon.compatible_products[0]);
                            if (filters.value.some(f => f.key === firstCompatibleProductKey)){
                            activeFilter.value = firstCompatibleProductKey;
                            } else {
                                activeFilter.value = 'all';
                            }
                        } else {
                            activeFilter.value = 'all';
                        }
                        filterAddons(activeFilter.value); 
                    } else {
                        activeFilter.value = 'all';
                        filteredAddons.value = addons.value; 
                    }
                    await nextTick();
                    scrollToSelectedAddon();
                } else {
                    console.warn("Ugyldig selectedAddonId i query:", queryId);
                    activeFilter.value = 'all';
                    filteredAddons.value = addons.value;
                }
            } else {
                activeFilter.value = 'all';
                filteredAddons.value = addons.value;
            }

        } catch (error) {
            console.error("Feil ved lasting av data for tilbehør:", error);
            errorState.value = error.message || "En feil oppstod under lasting av tilbehørsdata.";
            addons.value = [];          
            filteredAddons.value = [];
            products.value = [];      
        } finally {
            isLoading.value = false;  
        }
    };
    
    onMounted(loadAddonsData);

    const updateFilter = (filterKey) => {
        activeFilter.value = filterKey;

        if (filterKey === 'all') {
            clearFilter();
        } else {
            filterAddons(parseInt(filterKey, 10));
        }

        if (route.query.selectedAddonId) {
            router.replace({ path: route.path, query: {} });
        }
    };

    const filterAddons = (bikeKey) => {
        activeFilter.value = String(bikeKey);

        if (bikeKey === 'all') { 
            filteredAddons.value = addons.value;
        } else {
            filteredAddons.value = addons.value.filter(addon => {
                if (addon.compatible_all) return true;
                return addon.compatible_products && addon.compatible_products.includes(Number(bikeKey));
            });
        }
    };

    const clearFilter = () => {
        activeFilter.value = 'all'; 
        filteredAddons.value = addons.value;
    };

    const clearSelection = () => {
        selectedAddonId.value = null;
        addonRefs.value = {};
        router.replace({ path: route.path, query: {} });
    };

    const getCompatibleProducts = (ids) => {
        if (!ids || !Array.isArray(ids)) return "Tilbehør uavhengig av type sykkel";
        if (ids.includes("Hånddrift-sykler")) {
            return "Alle sykler med hånddrift";
        }
        if (ids.includes("Trehjul")) {
            return "Alle trehjulssykler";
        }
        if (ids.includes("Alle HASE-sykler")) {
            return "Alle HASE sykler";
        }
        if (!products.value.length) return "Laster...";

        return products.value
            .filter(p => ids.includes(p.id))
            .map(p => p.name)
            .join(", ") || "Ingen";
    };

    watch(() => route.query.selectedAddonId, async (newId) => {
        if (newId) {
            const parsedId = parseInt(newId, 10);
            if (!isNaN(parsedId)) {
                if(parsedId !== selectedAddonId.value) { 
                    selectedAddonId.value = parsedId;
                    await nextTick();
                    scrollToSelectedAddon();
                }
            } else {
                if (selectedAddonId.value !== null) { 
                    selectedAddonId.value = null;
                    router.replace({ path: route.path, query: {} });
                }
            }
        } else {
            if (selectedAddonId.value !== null) { 
                selectedAddonId.value = null;
            }
        }
    }, { immediate: true });

    watch([selectedAddonId, filteredAddons, isLoading], ([currentSelectedId, currentFilteredAddons, currentIsLoading]) => {
  if (currentSelectedId && !currentIsLoading && !errorState.value) {
    if (currentFilteredAddons.some(a => a.id === currentSelectedId)) {
      nextTick(() => { 
        scrollToSelectedAddon();
      });
    }
  }
}, { deep: true });

</script>