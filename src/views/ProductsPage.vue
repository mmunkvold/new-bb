<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">
        <HeadingElement>Alle våre sykler</HeadingElement>
        <div class="flex flex-col md:flex-row gap-10 md:gap-20">
            <div class="max-w-3xl space-y-3">
                <p>Vi tilbyr <strong>markedets mest fleksible og brukervennlige spesialsykler</strong> - utviklet av Hase Bikes, kjent internasjonalt for <strong>kvalitet, sikkerhet og tilpasningsmuligheter</strong>.</p>
                <p>Hos oss finner du et <strong>bredt utvalg av liggesykler, håndsykler, trehjulssykler og tandemsykler</strong> - alle tilpasset barn, ungdom og voksne med ulike funksjonsnivåer.</p>
                <p>Flere modeller er <strong>godkjent som aktivitetshjelpemidler</strong> og kan søkes gjennom NAV.</p>
            </div>
            <p class="mx-auto max-w-md h-fit bg-gray-100 dark:bg-gray-900 rounded p-6">Quality Care AS har <strong>levert spesialtilpassede sykler i Norge i over 20 år</strong>. Vi hjelper deg med å finne riktig løsning - enten du trenger noe for fritid, trening, transport eller hverdagsmobilitet.</p>
        </div>

        <div class="my-8 pb-6">
            <FilterButtons
                :filters="filtersWithCounts"
                :activeFilter="activeFilter"
                @update:activeFilter="filterProducts"
            />
        </div>

        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && filteredProducts.length === 0"
            loadingText="Laster produkter..."
            errorText="Vi beklager, men vi klarte ikke å laste inn produkter akkurat nå. Sjekk gjerne nettverkstilkoblingen din og prøv igjen"
            emptyTitle="Finner ingen produkter"
            :emptyText="activeFilter === 'all' ? 'Vi kunne ikke finne produkter akkurat nå.' : `Ingen produkter funnet som matcher filteret '${filters.find(f => f.key === activeFilter)?.label || activeFilter}'.`"
            :onRetry="fetchData"
        >
            
            <template #error-actions>
                <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                    Gå tilbake til forsiden
                </NavigationLink>
            </template>
            
            <template #empty-actions>
                <NavigationLink :to="{ name: 'produkter' }" class="inline-block mt-6 text-sm hover:underline">
                    Se alle produkter
                </NavigationLink>
            </template>

            <div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div
                        v-for="product in filteredProducts"
                        :key="product.id"
                        @click="goToProduct(product.slug)"
                        class="cursor-pointer bg-white dark:bg-gray-900 drop-shadow rounded-lg overflow-hidden p-4 transition-transform hover:scale-105 hover:drop-shadow-md"
                    >
                        <div class="relative">
                            <img
                                :src="getProductImage(product)"
                                :alt="getProductAltText(product)"
                                class="w-full object-contain rounded bg-white h-48"
                                loading="lazy"
                            >
                            <p v-if="product.is_negotiated" class="absolute top-2 right-2 w-fit bg-green-600 !text-white text-xs font-bold px-2 py-2 rounded-full flex items-center gap-1 shadow-xl">
                                <ApprovedIcon class="text-2xl" aria-hidden="true" /></p>
                        </div>
                        <HeadingElement :level="2" class="text-xl font-semibold mt-4">{{ product.name }}</HeadingElement>
                        <div class="my-2 flex gap-4">
                            <p class="bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap"><strong>Artnr:</strong> {{ product.artnr || 'Ikke oppgitt' }}</p>
                            <p v-if="product.hmsnr" class="bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap"><strong>HMS-nr:</strong> {{ product.hmsnr }}</p>
                        </div>
                        <p>{{ product.pitch }}</p>
                    </div>
                </div>

                <div class="mt-8 flex flex-col">
                    <div class="inline-flex gap-4 items-center">
                        <div class="rounded-full bg-green-600 !text-white text-xs font-bold px-2 py-2">
                            <ApprovedIcon class="text-xl" aria-hidden="true" />
                        </div>
                        <p class="text-sm">Sykler med dette merket er prisforhandlet med NAV</p>
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
    import { ref, computed, onMounted, watch, nextTick } from "vue";
    import { useRouter } from "vue-router";
    import DataStatusIndicator from "@/components/common/DataStatusIndicator.vue";

    const router = useRouter();
    const products = ref([]);
    const filteredProducts = ref([]);
    const placeholderImage = "/placeholder.png";
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
        { key: 'all', label: 'Vis alle', isSpecial: true },
        { key: 'liggesykkel', label: 'Liggesykkel' },
        { key: 'handbike', label: 'Handbike' },
        { key: 'tandem', label: 'Tandem' },
    ]);

    const activeFilter = ref('all');

    const filtersWithCounts = computed(() => {
      if (!products.value || products.value.length === 0) {
        return filters.value.map(f => ({ ...f, count: 0 }));
      }
      const counts = {};
      products.value.forEach(product => {
        if (product.category) { 
           counts[product.category] = (counts[product.category] || 0) + 1;
        }
      });
      counts['all'] = products.value.length;
      return filters.value.map(filter => ({
        ...filter,
        count: counts[filter.key] ?? 0 
      }));
    });

    const getProductImage = (product) => {
        return product?.images?.length ? product.images[0].src : placeholderImage;
    };

    const getProductAltText = (product) => {
        const defaultAlt = `${product?.name || 'produkt'}`; 
        if (product?.images?.length > 0 && product.images[0]?.altText?.trim()) {
            return product.images[0].altText.trim(); 
        }
        return defaultAlt;
    };

    const fetchData = async () => {
        isLoading.value = true;
        errorState.value = null;

        try {
            const response = await fetch("/data/products.json");
            if (!response.ok) {
                throw new Error(`Nettverksfeil: ${response.status} ${response.statusText}`);
            }
            const allProductsFromJson = await response.json();
            const visibleProducts = allProductsFromJson.filter(product => product.status === 'published');
            products.value = visibleProducts;
            filterProducts(activeFilter.value); 
        } catch (error) {
            console.error("Feil ved henting eller filtrering av produkter:", error);
            errorState.value = error.message || "En feil oppstod.";
            products.value = [];
            filteredProducts.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchData);

    const filterProducts = (category) => {
        activeFilter.value = category;
        filteredProducts.value = category === 'all'
            ? products.value 
            : products.value.filter(product => product.category === category);
    };

    const goToProduct = (slug) => {
        router.push(`/produkt/${slug}`);
    };
</script>