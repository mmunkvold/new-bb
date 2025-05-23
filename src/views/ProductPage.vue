<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl text-pretty">

        <NavigationLink :to="{ name: 'produkter'}" class="mb-6 inline-flex gap-2 items-center text-xs">
            <ArrowLeftIcon aria-hidden="true" />Tilbake til produkter
        </NavigationLink>

        <DataStatusIndicator
            :isLoading="isLoading"
            :error="errorState"
            :isEmpty="!isLoading && !errorState && !product"
            loadingText="Laster produktdetaljer..."
            errorText="Vi beklager, men vi klarte ikke å laste inn produktinformasjonen akkurat nå. Prøv gjerne igjen senere eller gå tilbake til oversikten."
            emptyTitle="Produktet finnes ikke"
            emptyText="Vi kunne ikke finne produktet du lette etter."
            :onRetry="fetchProductPageData"
        >
            
            <template #error-actions>
                <NavigationLink :to="{ name: 'produkter' }" class="inline-block mt-6 text-sm hover:underline">
                    Gå tilbake til produktoversikten
                </NavigationLink>
            </template>
            
            <template #empty-actions>
                <NavigationLink :to="{ name: 'produkter' }" class="inline-block mt-6 text-sm hover:underline">
                    Se alle produkter
                </NavigationLink>
            </template>

            <div v-if="product">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10">
                    <div class="relative">
                        <button
                            v-if="imagesToShow.length > 1"
                            @click="showPreviousImage"
                            class="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
                            aria-label="Forrige bilde"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <img v-if="currentImage" :src="currentImage.src" :alt="currentImage.altText"
                            class="mb-4 w-full h-auto max-h-[600px] object-contain rounded-lg shadow-md border border-gray-300 dark:border-gray-800 bg-white"
                        />
                        <div v-else class="mb-4 w-full max-h-[600px] h-[300px] flex items-center justify-center bg-gray-200 rounded-lg shadow-md border border-gray-300 dark:border-gray-800 text-gray-500">
                            Ingen bilder å vise
                        </div>

                        <button
                            v-if="imagesToShow.length > 1"
                            @click="showNextImage"
                            class="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
                            aria-label="Neste bilde"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <div class="flex space-x-3 overflow-x-auto pb-2">
                            <img v-for="(image, index) in imagesToShow" :key="'thumb-'+image.src" :src="image.src" :alt="image.altText"
                                class="w-10 md:w-20 h-10 md:h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 border border-gray-300 bg-white"
                                :class="{ 'border-2 border-secondary dark:border-yellow-600': currentImage && currentImage.src === image.src }" @click="currentImage = image"
                            />
                        </div>
                    </div>
        
                    <div class="md:pt-0">
                        <p class="text-xs capitalize">{{ product.category }}</p>
                        <div class="flex flex-col lg:flex-row lg:gap-3 lg:items-baseline">
                            <HeadingElement>{{ product.name }}</HeadingElement>
                            <p v-if="product.with" class="-mt-3">{{ product.with }}</p>
                            
                        </div>
                        <div class="my-2 flex flex-col xl:flex-row gap-4 xl:items-center">
                            <div class="flex gap-4">
                                <p class="bg-gray-100 dark:bg-gray-800 h-fit py-1 px-2 rounded text-xs text-gray-700 dark:text-gray-200 whitespace-nowrap"><strong>Artnr:</strong> {{ product.artnr || 'Ikke oppgitt' }}</p>
                                <p v-if="product.hmsnr" class="bg-gray-100 dark:bg-gray-800 h-fit py-1 px-2 rounded text-xs text-gray-700 dark:text-gray-200 whitespace-nowrap"><strong>HMS-nr:</strong> {{ product.hmsnr }}</p>
                            </div>
                            
                            <p v-if="product.is_negotiated" class="relative group w-fit h-fit bg-green-600 dark:bg-green-700 !text-white text-xs font-bold px-2 pr-4 py-1 rounded-full flex items-center gap-1 cursor-help" 
                            tabindex="0" aria-describedby="popup-negotiated-desc">
                                <ApprovedIcon class="text-xl mr-2 flex-shrink-0" aria-hidden="true" />
                                <span>Prisforhandlet hos NAV</span>
                                <span id="popup-negotiated-desc" role="tooltip" 
                                    class="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg 
                                    opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                                    Produktet er en del av en prisforhandlet avtale med NAV, og kan derfor være lettere å få finansiert gjennom hjelpemiddelsentralen.
                                </span>
                            </p>
                    
                            <p v-else class="relative group w-fit h-fit bg-orange-100 dark:bg-orange-300/75 text-black text-xs font-bold px-2 pr-4 py-1 rounded-full flex items-center gap-1 cursor-help"
                            tabindex="0" aria-describedby="popup-not-negotiated-desc">
                                <NotApprovedIcon class="text-xl mr-2 flex-shrink-0" aria-hidden="true" />
                                <span>Ikke prisforhandlet hos NAV (søk om dispensasjon)</span>
                                <span id="popup-not-negotiated-desc" role="tooltip" 
                                    class="absolute bottom-full left-0 mb-2 w-72 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                                    Produktet er ikke prisforhandlet hos NAV. Snakk med din terapeut om muligheten for å søke om individuell dispensasjon for støtte.
                                </span>
                            </p>
                        </div>
                        <NavigationLink v-if="product.is_negotiated" :to=product.hms_url class="text-xs">Se produktet i FinnHjelpemiddel</NavigationLink>
                        <ul class="mt-6 list-inside">
                            <li v-for="(feature, index) in product.features" :key="'feat-'+index" >
                                <span class="inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {{ feature }}
                                </span>
                            </li>
                        </ul>

                        <div class="mt-8 flex flex-col min-[450px]:flex-row gap-8 items-center mb-10">
                            <NavigationLink :to="{ name: 'bestill-provetime'}" class="w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn !text-base">
                                bestill prøvetime
                            </NavigationLink>
                            <NavigationLink :to="{ name: 'kontakt-oss'}" class="text-sm">
                                Kontakt oss om det er noe du lurer på
                            </NavigationLink>
                        </div>
                    </div>
                </div>
        
                <div class="full-width bg-gray-100 dark:bg-gray-900">
                    <div class="px-4 sm:px-10 py-16 mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-5 gap-10">
                        <div class="md:col-span-3">
                            <div >
                                <HeadingElement :level="3">{{ product.heading }}</HeadingElement>
                                <p class="mt-4 mb-4">{{ product.short_desc }}</p>
                                <p class="mt-4 mb-4">{{ product.desc_1 }}</p>
                                <p class="mt-4 mb-4">{{ product.desc_2 }}</p>
                                <p class="mt-4 mb-4">{{ product.desc_3 }}</p>
                                <p class="mt-4 mb-4">{{ product.desc_4 }}</p>
                            </div>
                            <div v-if="product && product.video_url" class="mt-8 sm:w-72">
                                <HeadingElement :level="3" class="mb-2">🎥 Se video</HeadingElement>
                                <ProductVideoPlayer
                                    :video-url="product.video_url"
                                    :product-name="product.name"
                                    />
                            </div>
                        </div>
                        
                        <ProductInfoAccordion
                            :specifications="product.specifications"
                            :brochuresAndDocs="productBrochuresAndDocs"
                            :sketch="productSketch"
                            :addons="filteredAddons"
                            :isLoadingDocs="isLoadingTechDocs"
                            @navigateToAddon="goToAddon"
                            class="w-full h-fit md:col-span-2 mt-8 md:mt-0 ml-auto"
                        />
                        </div>
                </div>

                <div v-if="product.drawings">
                    <div class="p-7 sm:p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-20">
                        <div v-for="drawing in product.drawings" :key="drawing.src" class="space-y-2 text-sm">
                            <img :src="drawing.src" :alt="drawing.altText || 'Ingen alternativ tekst tilgjengelig'" 
                                class="w-full h-auto object-contain rounded-md"
                                loading="lazy"
                            >
                            <HeadingElement :level="3">{{ drawing.heading }}</HeadingElement>
                            <p>{{ drawing.caption }}</p>
                        </div>
                        
                    </div>

                    <div v-if="product.extra_info" class="full-width bg-gray-200 dark:bg-gray-900">
                        <div class="px-2 sm:px-20 py-16 mx-auto max-w-[1280px]  grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
                            <div v-for="info in product.extra_info" :key="info.src" 
                                class="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-gray-950 rounded items-center">
                                <img 
                                    :src="info.src" 
                                    :alt="info.altText || 'Ingen alternativ tekst tilgjengelig'" 
                                    class="h-36 object-contain"
                                    loading="lazy"
                                >
                                <div>
                                    <HeadingElement :level="3">{{ info.heading }}</HeadingElement>
                                    <p>{{ info.caption }}</p>
                                </div>
                            </div>

                            <div v-if="product.artnr==='1401'" class="flex">
                                <ReducedMuscleStrength />
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- nederste del med testimonials -->
                <div v-if="filteredTestimonials.length > 0" class="my-16">
                    <HeadingElement :level="2" >Hva kundene sier om {{ product.name }}</HeadingElement>
                    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
                        <div v-for="testimonial in filteredTestimonials" :key="testimonial.id" class="bg-gray-100 dark:bg-gray-900 p-4 rounded flex flex-row gap-4">
                            <img :src="testimonial.image.src" :alt="testimonial.image.altText || 'Ingen alternativ tekst tilgjengelig'" 
                                class="h-24 w-24 object-cover rounded-md"
                                loading="lazy"
                            > 
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-300">{{ testimonial.author }}</p> 
                                <p class="mt-1 italic">"{{ testimonial.text }}"</p> 
                            </div>
                        </div>
                    </div>
                </div>

                <!-- del med faq -->
                <div class="w-full max-w-2xl mx-auto py-20" id="faq"> 
                    <div v-if="isLoadingFaqs" class="text-center py-4">
                        <p>Laster ofte stilte spørsmål...</p>
                    </div>
                    <div v-else-if="errorFaqs" class="text-center py-4 text-red-600 dark:text-red-400">
                        <p>Beklager, kunne ikke laste ofte stilte spørsmål.</p>
                        <p class="text-sm">{{ errorFaqs }}</p>
                    </div>
                    <FaqAccordion 
                        v-else-if="faqItems && faqItems.length > 0" 
                        :title="'Ofte stilte spørsmål'" 
                        :items="faqItems" 
                    />
                    <div v-else class="text-center py-4 text-gray-500">
                        Ingen ofte stilte spørsmål å vise for øyeblikket.
                    </div>
                </div>
            </div>
        </DataStatusIndicator>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { useHead } from '@vueuse/head';
    import ReducedMuscleStrength from "@/components/common/ReducedMuscleStrength.vue"; 
    import FaqAccordion from '@/components/common/FaqAccordion.vue';
    import DataStatusIndicator from "@/components/common/DataStatusIndicator.vue";
    import ProductVideoPlayer from "@/components/common/ProductVideoPlayer.vue";
    import ProductInfoAccordion from "@/components/common/ProductInfoAccordion.vue";
    import { useFaqs } from '@/composables/useFaqs';
    
    const { 
        getFaqsByContexts, 
        isLoadingFaqs,
        errorFaqs
    } = useFaqs();

    const faqItems = computed(() => {
        if (product.value && product.value.slug) {
            return getFaqsByContexts([product.value.slug, 'generelt-produkt', 'generelt']).value; 
        }
        return getFaqsByContexts(['generelt-produkt', 'generelt']).value;
    });

    const route = useRoute();
    const router = useRouter();
    
    const product = ref(null);
    const testimonials = ref([]);
    const filteredAddons = ref([]);
    const errorState = ref(null); 
    const isLoading = ref(true); 
    const allTechnicalDocs = ref([]);
    const productBrochuresAndDocs = ref([]);
    const productSketch = ref(null);
    const isLoadingTechDocs = ref(false);

    //image
    const placeholderImage = { src: "/placeholder.png", altText: "Produktbilde mangler" };

    const displayImage = computed(() => {
        if (product.value?.images?.length > 0 && product.value.images[0]?.src) {
            const firstImage = product.value.images[0];
            return {
                src: firstImage.src,
                altText: firstImage.altText?.trim() || `${product.value?.name || 'produkt'}` 
            };
        }
        return placeholderImage; 
    });

    const imagesToShow = computed(() => {
        const defaultAlt = `${product.value?.name || 'produkt'}`;
        if (product.value?.images?.length > 0) {
            return product.value.images.map(img => ({
                src: img.src || placeholderImage.src, 
                altText: img.altText?.trim() || defaultAlt 
            }));
        }
        return [placeholderImage]; 
    });

    const currentImage = ref(null);

    watch(imagesToShow, (newImages) => {
        const hasRealImages = newImages.length > 0 && newImages[0].src !== placeholderImage.src;

        if (hasRealImages) {
            const currentInNew = newImages.find(img => img.src === currentImage.value?.src);
            if (!currentImage.value || currentImage.value.src === placeholderImage.src || !currentInNew) {
                currentImage.value = newImages[0];
            } 
        } else {
            currentImage.value = placeholderImage;
        }
    }, { immediate: true });


    const showNextImage = () => {
        if (!currentImage.value || imagesToShow.value.length < 2) return;
        const currentIndex = imagesToShow.value.findIndex(img => img.src === currentImage.value.src);
        if (currentIndex === -1) { 
            currentImage.value = imagesToShow.value[0];
            return;
        }
        const nextIndex = (currentIndex + 1) % imagesToShow.value.length;
        currentImage.value = imagesToShow.value[nextIndex];
    };

    const showPreviousImage = () => {
        if (!currentImage.value || imagesToShow.value.length < 2) return;
        const currentIndex = imagesToShow.value.findIndex(img => img.src === currentImage.value.src);
        if (currentIndex === -1) { 
            currentImage.value = imagesToShow.value[0]; 
            return;
        }
        const prevIndex = (currentIndex - 1 + imagesToShow.value.length) % imagesToShow.value.length;
        currentImage.value = imagesToShow.value[prevIndex];
    };

    //accordion content
    const goToAddon = (addonId) => {
        router.push({ name: 'tilbehor', query: { selectedAddonId: addonId } });
    };

    const fetchTechnicalDocs = async (productName) => {
        isLoadingTechDocs.value = true;
        productBrochuresAndDocs.value = [];
        productSketch.value = null;
        try {
            const response = await fetch("/data/technical.json");
            if (!response.ok) throw new Error('Kunne ikke hente tekniske dokumenter');
            allTechnicalDocs.value = await response.json();
            filterTechDocsByProductName(productName); 
        } catch (error) {
            console.error("Feil ved henting av tekniske dokumenter:", error);
            allTechnicalDocs.value = [];
            filterTechDocsByProductName(productName);
        } finally {
            isLoadingTechDocs.value = false;
        }
    };

    const filterTechDocsByProductName = (productName) => {
        if (allTechnicalDocs.value.length === 0 || !productName) {
            productBrochuresAndDocs.value = [];
            productSketch.value = null;
            return;
        }

        const productNameLower = String(productName).trim().toLowerCase();
        const relevantDocs = allTechnicalDocs.value.filter(doc => {
            const docProductName = doc.product ? String(doc.product).trim().toLowerCase() : null;
            const docProductNames = Array.isArray(doc.products) ? doc.products.map(p => String(p).trim().toLowerCase()) : null;

            if (docProductName && docProductName === productNameLower) return true;
            if (docProductNames && docProductNames.includes(productNameLower)) return true;
            
            return false; 
        });

        productSketch.value = relevantDocs.find(doc =>
            doc.type?.toLowerCase() === 'sprengskisse'
        ) || null;

        productBrochuresAndDocs.value = relevantDocs
            .filter(doc => doc.type?.toLowerCase() !== 'sprengskisse')
            .sort((a, b) => {
                const typeOrder = { 'brosjyre': 1, 'brukermanual': 2 }; 
                const orderA = typeOrder[a.type?.toLowerCase()] ?? 99;
                const orderB = typeOrder[b.type?.toLowerCase()] ?? 99;
                if (orderA !== orderB) return orderA - orderB;
                return a.title.localeCompare(b.title);
            });
    };

    const fetchProductPageData = async () => {
        isLoading.value = true;
        product.value = null;
        errorState.value = null;
        testimonials.value = [];
        filteredAddons.value = [];
        allTechnicalDocs.value = [];
        productBrochuresAndDocs.value = [];
        productSketch.value = null;   
        isLoadingTechDocs.value = false;

        const slug = route.params.slug;
        if (!slug) {
            errorState.value = "Produktsti (slug) mangler i URL.";
            isLoading.value = false;
            return;
        }

        try {
            const productsResponse = await fetch("/data/products.json");
            if (!productsResponse.ok) throw new Error('Kunne ikke hente produktliste');
            const productsData = await productsResponse.json();
            let foundProduct = productsData.find(p => String(p.slug) === String(slug));

            if (foundProduct) {
                if (foundProduct.status !== 'published') {
                    throw new Error(`Produktet (${slug}) er ikke publisert eller tilgjengelig (status: ${foundProduct.status}).`);
                }
                product.value = foundProduct;

                const secondaryFetches = [];
                if (product.value?.name) {
                    secondaryFetches.push(fetchTechnicalDocs(product.value.name));
                } else {
                    console.warn(`Produkt med ID ${product.value.id} mangler 'name', kan ikke filtrere tekniske dokumenter basert på navn.`);
                    productBrochuresAndDocs.value = []; 
                    productSketch.value = null;
                }
                if (product.value?.addons?.length > 0) {
                    secondaryFetches.push(
                        fetch("/data/addons.json")
                            .then(res => {
                                if (!res.ok) return Promise.reject('Kunne ikke hente tilbehør');
                                return res.json();
                            })
                            .then(allAddons => {
                                filteredAddons.value = allAddons.filter(a =>
                                product.value.addons.map(String).includes(String(a.id))
                            );
                            }).catch(err => {
                                console.error("Feil ved henting av tilbehør:", err);
                                filteredAddons.value = [];
                            })
                    );
                } else {
                    filteredAddons.value = [];
                }
                if (product.value?.id) {
                    secondaryFetches.push(
                        fetch("/data/testimonials.json")
                            .then(res => {
                                if (!res.ok) return Promise.reject('Kunne ikke hente testimonials');
                                return res.json();
                            })
                            .then(allTestimonials => {
                                testimonials.value = allTestimonials.filter(t =>
                                    Array.isArray(t.product_ids) && t.product_ids.map(String).includes(String(product.value.id))
                                );
                            }).catch(err => {
                                console.error("Feil ved henting av testimonials:", err);
                                testimonials.value = [];
                            })
                    );
                } else {
                    testimonials.value = [];
                }
                await Promise.allSettled(secondaryFetches);
            } else {
                throw new Error(`Produkt med sti '${slug}' ble ikke funnet.`);
            }
        } catch (error) {
            console.error("Error fetching product page data:", error);
            errorState.value = error.message || "Kunne ikke laste produktet.";
            product.value = null; 
            testimonials.value = [];
            filteredAddons.value = [];
            productBrochuresAndDocs.value = [];
            productSketch.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchProductPageData);

    const generateMetaDescription = (text) => {
        if (!text) return `Se mer om våre kvalitetsprodukter hos Quality Care.`;
        try {
            let desc = text;
            if (typeof desc === 'string') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = desc;
                desc = tempDiv.textContent || tempDiv.innerText || '';
            } else {
                desc = '';
            }

            desc = desc.replace(/\s\s+/g, ' ').trim();
            const maxLength = 155;
            if (desc.length > maxLength) {
                desc = desc.substring(0, maxLength).trimEnd() + '...';
            }
            return desc || `Se mer om våre kvalitetsprodukter hos Quality Care.`;
        } catch(e) {
            console.error("Error generating meta description", e);
            return `Se mer om våre kvalitetsprodukter hos Quality Care.`;
        }
    };

    const siteName = 'Quality Care AS';

    const pageTitle = computed(() => {
        if (isLoading.value) return `Laster produkt... | ${siteName}`;
        if (errorState.value || !product.value) return `Produkt ikke funnet | ${siteName}`;
        if (product.value.metaTitle) return product.value.metaTitle;
        if (product.value.name) return `${product.value.name} | ${siteName}`;
        return `Produkt | ${siteName}`;
    });

    const pageDescription = computed(() => {
        if (isLoading.value) return 'Laster produktinformasjon...';
        if (errorState.value || !product.value) return 'Kunne ikke laste produktinformasjon.';
        return product.value.metaDescription || 
            generateMetaDescription(product.value.short_desc || product.value.desc_1 || ''); 
    });

    const ogImageUrl = computed(() => {
        let imageUrl = displayImage.value.src;
        if (imageUrl && typeof window !== 'undefined' && !imageUrl.startsWith('http')) {
            try {
                imageUrl = new URL(imageUrl, window.location.origin).href;
            } catch (e) {
                console.error("Kunne ikke lage absolutt OG image URL:", e);
                imageUrl = new URL('/default-produkt-bilde.jpg', window.location.origin).href;
            }
        } else if (!imageUrl) {
            imageUrl = new URL('/default-produkt-bilde.jpg', window.location.origin).href;
        }
        return imageUrl || new URL('/default-produkt-bilde.jpg', window.location.origin).href;
    });


    useHead({
        title: pageTitle,
        meta: [
            { name: 'description', content: pageDescription },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDescription },
            { property: 'og:type', content: 'product' },
            { property: 'og:image', content: ogImageUrl },
            { property: 'og:url', content: () => typeof window !== 'undefined' ? window.location.href : '' }, 
        ],
        link: [
            { rel: 'canonical', href: () => typeof window !== 'undefined' ? window.location.href : '' } 
        ]
    })

    const filteredTestimonials = computed(() => {
        if (!product.value || !Array.isArray(testimonials.value) || testimonials.value.length === 0) return [];
        const currentProductId = String(product.value.id);
        return testimonials.value.filter(t => 
            Array.isArray(t.product_ids) && t.product_ids.map(String).includes(currentProductId)
        );
    });

</script>

<style scoped>
    .overflow-x-auto::-webkit-scrollbar { 
        height: 8px; 
    } 

    .overflow-x-auto::-webkit-scrollbar-track {
        background: #f1f1f1; border-radius: 10px; 
    }

    .overflow-x-auto::-webkit-scrollbar-thumb {
        background: #ccc; border-radius: 10px; 
    } 

    .overflow-x-auto::-webkit-scrollbar-thumb:hover { 
        background: #aaa; 
    }
</style>

