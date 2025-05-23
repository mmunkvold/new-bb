import { ref, computed, readonly, onMounted } from 'vue';

const allFaqs = ref([]);
const isLoading = ref(false);
const error = ref(null);
let hasFetched = false;

async function fetchAllFaqsData() {
    if (hasFetched && !error.value) return;
    isLoading.value = true;
    error.value = null;
    try {
        const response = await fetch('/data/faq.json');
        if (!response.ok) {
            throw new Error(`Kunne ikke laste FAQ-data: <span class="math-inline">\{response\.statusText\} \(</span>{response.status})`);
        }
        allFaqs.value = await response.json();
        hasFetched = true;
    } catch (e) {
        console.error("Feil ved henting av alle FAQs:", e);
        error.value = e.message || "En feil oppstod ved lasting av FAQ.";
        allFaqs.value = [];
    } finally {
        isLoading.value = false;
    }
}

export function useFaqs() {
    if ((!hasFetched || error.value) && !isLoading.value) {
        fetchAllFaqsData();
    }

    const getFaqsByContext = (context) => {
        return computed(() => {
            if (!context || !Array.isArray(allFaqs.value)) {
                return [];
            }
            return allFaqs.value.filter(faq => 
                Array.isArray(faq.contexts) && faq.contexts.includes(context)
            ).sort((a, b) => (a.order ?? 99) - (b.order ?? 99)); // Valgfri sortering
        });
    };

    const getFaqsByContexts = (contextsArray) => {
        return computed(() => {
            if (!Array.isArray(contextsArray) || contextsArray.length === 0 || !Array.isArray(allFaqs.value)) {
                return [];
            }
            const uniqueFaqs = new Map();
            allFaqs.value.forEach(faq => {
                if (Array.isArray(faq.contexts) && contextsArray.some(ctx => faq.contexts.includes(ctx))) {
                    if (!uniqueFaqs.has(faq.id)) { 
                        uniqueFaqs.set(faq.id, faq);
                    }
                }
            });
            return Array.from(uniqueFaqs.values()).sort((a, b) => (a.order ?? 99) - (b.order ?? 99)); // Valgfri sortering
        });
    };

    const retryFetchFaqs = () => {
        hasFetched = false; 
        fetchAllFaqsData();
    };

    return {
        isLoadingFaqs: readonly(isLoading),
        errorFaqs: readonly(error),
        getFaqsByContext,
        getFaqsByContexts,
        retryFetchFaqs
    };
}