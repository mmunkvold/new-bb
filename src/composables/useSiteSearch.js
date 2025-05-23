import { ref } from 'vue';

const allProducts = ref([]);
const allAddons = ref([]);
const allTechDocs = ref([]);
const allStaff = ref([]);
const allFaqs = ref([]);
const searchableStaticContent = ref([]);

const isLoading = ref(false);
const dataFetched = ref(false);
const errorState = ref(null);

async function fetchDataForSearch() {
    if (dataFetched.value || isLoading.value) return;
    isLoading.value = true;
    errorState.value = null;
    try {
        const [productsRes, addonsRes, techDocsRes, staffRes, faqsRes, staticContentRes] = await Promise.all([
            fetch('/data/products.json'),
            fetch('/data/addons.json'),
            fetch('/data/technical.json'),
            fetch('/data/staff.json'),
            fetch('/data/faq.json'),
            fetch('/data/searchable_static_content.json'),
        ]);

        if (!productsRes.ok) throw new Error('Kunne ikke laste produkter');
        let rawProducts = await productsRes.json();
        allProducts.value = (Array.isArray(rawProducts) ? rawProducts.filter(item => item !== null) : [])
                            .filter(p => p.status === 'published');

        if (!addonsRes.ok) throw new Error('Kunne ikke laste tilbehør');
        let rawAddons = await addonsRes.json();
        allAddons.value = Array.isArray(rawAddons) ? rawAddons.filter(item => item !== null) : [];

        if (!techDocsRes.ok) throw new Error('Kunne ikke laste tekniske dokumenter');
        let rawTechDocs = await techDocsRes.json();
        allTechDocs.value = Array.isArray(rawTechDocs) ? rawTechDocs.filter(item => item !== null) : [];

        if (!staffRes.ok) throw new Error('Kunne ikke laste ansattliste for søk');
        let rawStaff = await staffRes.json();
        allStaff.value = Array.isArray(rawStaff) ? rawStaff.filter(item => item !== null) : [];

        if (!faqsRes.ok) throw new Error('Kunne ikke laste FAQ-data');
        let rawFaqs = await faqsRes.json();
        allFaqs.value = Array.isArray(rawFaqs) ? rawFaqs.filter(item => item !== null) : [];

        if (!staticContentRes.ok) throw new Error('Kunne ikke laste statisk søkeinnhold');
        let rawStaticContent = await staticContentRes.json();
        searchableStaticContent.value = Array.isArray(rawStaticContent) ? rawStaticContent.filter(item => item !== null) : [];
        
        dataFetched.value = true;
    } catch (error) {
        console.error("Feil ved global søk datainnhenting:", error);
        errorState.value = error.message || "En feil oppstod ved henting av data.";
        allProducts.value = []; allAddons.value = []; allTechDocs.value = [];
        allStaff.value = []; searchableStaticContent.value = []; allFaqs.value = [];
    } finally {
        isLoading.value = false;
    }
}

export function useSiteSearch() {
    if (!dataFetched.value && !isLoading.value) { 
        fetchDataForSearch();
    }

    const search = (query) => {
        if (!query || query.trim().length < 2) return [];
        if (isLoading.value) return [{ type: 'System', title: 'Laster søkedata...', isInfo: true, link:'#' }]; 
        if (errorState.value) return [{ type: 'System', title: 'Søk utilgjengelig', snippet: errorState.value, isInfo: true, link:'#' }];

        const lowerQuery = query.toLowerCase().trim();
        const results = [];

        allProducts.value.forEach(product => {
            if (!product) return;
            if (product.name?.toLowerCase().includes(lowerQuery) || 
                product.short_desc?.toLowerCase().includes(lowerQuery) ||
                product.category?.toLowerCase().includes(lowerQuery) ||
                product.artnr?.includes(lowerQuery) ) {
                results.push({
                    type: 'Produkt',
                    title: product.name,
                    snippet: product.short_desc || product.category,
                    link: { name: 'produkt', params: { slug: product.slug } }
                });
            }
        });

        allAddons.value.forEach(addon => {
            if (addon.name?.toLowerCase().includes(lowerQuery) || 
                addon.description?.toLowerCase().includes(lowerQuery) ||
                addon.artnr?.includes(lowerQuery) ) {
                results.push({
                    type: 'Tilbehør',
                    title: addon.name,
                    snippet: addon.description,
                    link: { name: 'tilbehor', query: { selectedAddonId: addon.id } }
                });
            }
        });

        allTechDocs.value.forEach(doc => {
            if (!doc) return;

            const matchesQuery = doc.title?.toLowerCase().includes(lowerQuery) ||
                                doc.type?.toLowerCase().includes(lowerQuery) ||
                                doc.product?.toLowerCase().includes(lowerQuery);
        
            const hasValidLink = doc.file && typeof doc.file === 'string' && doc.file.trim() !== '';
        
            if (matchesQuery && hasValidLink) { 
                results.push({
                    type: 'Teknisk dokument',
                    title: doc.title,
                    snippet: `Type: ${doc.type}, Produkt: ${doc.product || 'Generelt'}`,
                    link: doc.file, 
                    isExternal: true 
                });
            }
        });

        allStaff.value.forEach(staff => {
            if (!staff) return;

            if (
                staff.name?.toLowerCase().includes(lowerQuery) ||
                staff.title?.toLowerCase().includes(lowerQuery)
            ) {
                results.push({
                    type: 'Ansatt',
                    title: staff.name,
                    snippet: `${staff.title || ''}${staff.districtNames ? ' - ' + staff.districtNames : ''}`,
                    link: `/om-oss#ansatt-${staff.id}`
                });
            }
        });
        
        allFaqs.value.forEach(faq => {
            if (!faq) return;

            let matchFound = false;
            if (faq.question?.toLowerCase().includes(lowerQuery)) matchFound = true;
            if (!matchFound && faq.answer?.toLowerCase().includes(lowerQuery)) matchFound = true;
            if (!matchFound && faq.keywords?.toLowerCase().includes(lowerQuery)) matchFound = true;

            if (matchFound) {
                results.push({
                    type: faq.type || 'FAQ',
                    title: faq.question,
                    snippet: faq.answer.substring(0, 120) + (faq.answer.length > 120 ? '...' : ''),
                    link: faq.link || '/faq'
                });
            }
        });

        searchableStaticContent.value.forEach(item => {
            let matchFound = false;
            if (item.pageTitle?.toLowerCase().includes(lowerQuery)) matchFound = true;
            if (!matchFound && item.sectionTitle?.toLowerCase().includes(lowerQuery)) matchFound = true;
            if (!matchFound && item.searchableText?.toLowerCase().includes(lowerQuery)) matchFound = true;
            if (!matchFound && item.keywords?.toLowerCase().includes(lowerQuery)) matchFound = true;

            if (matchFound) {
                results.push({
                    type: item.type || 'Side',
                    title: item.sectionTitle || item.pageTitle,
                    snippet: item.searchableText.substring(0, 120) + (item.searchableText.length > 120 ? '...' : ''),
                    link: item.link 
                });
            }
        });
        
        return results;
    };

    return { search, isLoadingSearchData: isLoading, searchError: errorState }; 
}