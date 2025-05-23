<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">
        <section class="text-center">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement>Om Quality Care AS</HeadingElement>
                <p class="-mt-2 mb-2 text-2xl">Vi er Norges spesialsykkel-eksperter</p>
                <p class="text-lg mb-8 max-w-xl mx-auto"> Siden 2005 har vi hjulpet barn og voksne med <strong>tilpassede sykler</strong> for økt livsglede og mestring. Vi leverer <strong>kvalitet</strong> fra Hase Bikes og skreddersyr løsninger for dine behov.</p>
            </div>
        </section>

        <p class="text-center text-3xl font-bold !text-secondary dark:!text-yellow-600 mt-12 mx-auto max-w-xl leading-tight">Opplevelse av mestring gjennom aktivitet for alle!</p>

        <section class="mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20" id="kjerneverdi">
            <HeadingElement :level="2" class="text-center">Våre kjerneverdier</HeadingElement>
            <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-950">
                    <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.518a.563.563 0 0 1 .321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 21.03a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988h5.518a.563.563 0 0 0 .475-.31L11.48 3.5Z" />
                        </svg>
                    </div>
                    <HeadingElement :level="3">Kvalitet</HeadingElement>
                    <p class="mt-2">Vi leverer kun produkter og tjenester av høyeste standard, fra anerkjente produsenter som Hase Bikes.</p>
                </div>

                <div class="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-950">
                    <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <HeadingElement :level="3">Kundefokus</HeadingElement>
                    <p class="mt-2">Dine behov, din mestring og din livsglede står alltid i sentrum for vårt arbeid.</p>
                </div>

                <div class="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-950">
                    <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                    </div>
                    <HeadingElement :level="3">Kompetanse</HeadingElement>
                    <p class="mt-2">Med både ergoterapeuter og fysioterapeuter på laget, samt 20 års erfaring sikrer vi i Quality Care trygge og riktige løsninger.</p>
                </div>
            </div>
        </section>

        <section class="full-width py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">                
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start gap-6">
                <div class="w-full">
                    <img src="@/assets/images/glede.jpg" alt="Smilende gutt på liggesykkel, brun genser m hvitt felt over brystet, kamuflasjefarget bukse" 
                        class="w-full sm:max-w-5/6 justify-self-center rounded"
                        loading="lazy"
                    >
                </div>
                <div class="w-full">
                    <HeadingElement :level="2" id="filosofi">Vår filosofi</HeadingElement>
                    <p>Vi tror på sykkelglede for alle - uavhengig av alder eller funksjonsnivå. Vårt mål er å åpne dører til aktivitet, mestring og frihet gjennom spesialtilpassede sykler.</p>
                    <p class="my-4">Derfor er også vårt motto: <br /><span class="italic font-bold dark:font-normal dark:text-gray-300">Opplevelse av mestring gjennom aktivitet for alle!</span></p>
                    <p >En sykkel er mer enn et fremkomstmiddel. Den er et verktøy for rehabilitering, sosial deltakelse og ren glede. Av den grunn legger vi vår stolthet i å finne den perfekte match mellom sykkel og syklist.</p>
                </div>
            </div>

            <div class="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-start gap-8">
                <div class="w-full">
                    <img src="@/assets/images/historie3.jpg" alt="Eldre mann på liggesykkel, ung jente på vanlig sykkel bak, grønne omgivelser, teglsteinshus i bakgrunn" 
                        class="w-full sm:max-w-5/6 lg:-mr-26 xl:-mr-36 justify-self-center rounded"
                        loading="lazy"
                    >
                    <img src="@/assets/images/historie2.jpg" alt="Dame skyver på liggesykkel hvor en liten gutt i sort jakke og gul bukse smiler og koser seg, naturomgivelser" 
                        class="hidden md:block w-full sm:max-w-5/6 md:mt-6 lg:-mt-5 justify-self-center rounded"
                        loading="lazy"
                    >
                </div>
                <div class="w-full space-y-4" id="historie">
                    <HeadingElement :level="2">Vår historie</HeadingElement>
                    <p>Quality Care AS ble stiftet i 2005. Vårt ønske den gang var at man skal prøve de hjelpemidler som finnes, slik at hvert enkelt fritt kan vurdere hva som er til best mulig hjelp. Først når <strong>hjelpemiddelet er prøvd av personen selv</strong>, vet man hvor godt dette fungerer. Med våre kvalitetsprodukter og <strong>brede erfaring</strong> ønsker vi hjelpe personer til en lettere hverdag i skole, jobb og fritid. For oss er dette meget viktig den dag i dag.</p>
                    <p>Gjennom årene har vi bygget opp en <strong>unik kompetanse</strong> innen tilpasning og veiledning, alltid med <strong>fokus på kvalitet og individuell oppfølging</strong>. I dag er vi stolte av å være en <strong>ledende aktør</strong> i Norge innen spesialsykler.</p>
                    <p>1. april 2025 ble Quality Care AS 20 år. Det har vært 20 år med mange prøvelser og utrolig mange gleder. Gleder i form av at personer kommer tilbake etter å ha prøvd våre sykler, og forteller at sykkelen har  forandret hverdagen deres.</p>
                    <p>Det er derfor vi i Quality Care AS har som mål å prøve og bli best mulig på spesialsykler. Dette jobber vi for 365 dager i året. Og det er også derfor vår visjon og vårt motto er like aktuelt i dag som for 20 år siden.</p>
                </div>
            </div>

            <div class="relative mt-20 mb-12 py-8 px-4 text-center text-pretty" id="asbjorn">
                <figure class="max-w-2xl mx-auto">
                    <div class="relative px-6">
                        <span class="absolute top-0 -left-2 text-7xl -mt-3 ml-2 select-none font-serif text-primary dark:text-red-600"
                            aria-hidden="true"
                        >
                            &ldquo;
                        </span> 
                        <blockquote class="text-xl font-medium leading-relaxed italic">
                            <p>En sjelsettende opplevelse for meg ble den gangen for mange år siden da det kom en person med tårer i øynene og spurte om jeg kunne vente en halvtime. Jeg spurte hvorfor.</p>
                            <p  class="my-4"> Han svarte at han skulle opp i minibanken og ta ut 65.000 kr.<br /> For denne sykkelen skulle han ha.</p>
                            <p>Dette var før ordningen med AKT 26 kom. På den tiden fikk ikke personer over 26 år låne sykler av NAV.</p>
                        </blockquote>
                        <span class="absolute -bottom-2 right-27 text-7xl -mb-5 mr-1 select-none font-serif text-primary dark:text-red-600"
                            aria-hidden="true" style="line-height: 0.5;"
                        >
                            &rdquo;
                        </span>
                    </div>
                    <figcaption class="mt-8">
                    <div class="text-base font-bold tracking-wider dark:font-normal text-primary dark:text-red-600">
                        Asbjørn Sommervold
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Daglig leder, Quality Care AS
                    </div>
                    </figcaption>
                </figure>
            </div>
        </section>

        <section class="full-width bg-primary py-16 md:py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 lg:gap-16 items-center">
                <div class="place-items-center">
                        <img src="@/assets/images/qc-logo-20.jpg" alt="Stort 20 tall i sort mot hvit og rød bakgrunn, med tekst 20 års jubileum Quality Care" 
                            class="max-w-1/2 md:w-full object-contain rounded-lg shadow-md"
                            loading="lazy"
                        >
                </div>
                <div class="col-span-2 !text-white">
                    <HeadingElement :level="2" class="mb-4 !text-white dark:!text-white" id="20">Quality Care feirer 20 år!</HeadingElement>
                    <div class="space-y-4 text-lg">
                        <p class="">I 2025 markerer Quality Care en betydelig milepæl - tjue år dedikert til omsorg, kvalitet og utviklingen av et sterkt fellesskap rundt tilpasset aktivitet. Disse årene har vært fylt med verdifulle erfaringer, hvor vi sammen har lagt til rette for at mennesker kan oppleve mestring, utvikling og leve aktive liv. Vi er stolte over å ha bidratt til økt livskvalitet og selvstendighet, og delt utallige øyeblikk preget av glede og samhold.</p>
                        <p class="">Denne reisen hadde ikke vært mulig uten våre dedikerte ansatte, samt de mange brukerne og samarbeidspartnerne som har vist oss tillit gjennom årene. Deres engasjement og erfaringer har vært avgjørende for å forme Quality Care til den virksomheten vi er i dag. En stor og varm takk rettes til dere alle!</p>
                        <p class="">Med stolthet over historien ser vi entusiastisk fremover mot å fortsette arbeidet med å skape verdifulle muligheter for aktivitet og mestring i årene som kommer.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="full-width py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="order-last md:order-first">
                    <HeadingElement :level="2">Hvorfor velge oss?</HeadingElement>
                    <ul class="mt-6 space-y-4 text-lg">
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span><strong class="font-semibold text-gray-900 dark:text-gray-300">Spesialisering:</strong> 100% fokus på sykler - det er det vi kan best.</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span><strong class="font-semibold text-gray-900 dark:text-gray-300">Fagkompetanse:</strong> Dyktige ergo- og fysioterapeuter i teamet sikrer riktig veiledning.</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span><strong class="font-semibold text-gray-900 dark:text-gray-300">Tilgjengelighet:</strong> Landsdekkende nærvær med lokale kontaktpersoner.</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span><strong class="font-semibold text-gray-900 dark:text-gray-300">Erfaring:</strong> Solid kunnskap bygget gjennom 20 år i bransjen. Quality Care har holdt på siden 2005.</span>
                        </li>
                    </ul>
                </div>
                
                <img src="@/assets/images/verksted.jpg" alt="Person i blå genser står foran en liggesykkel på et bord inne i et verksted" 
                    class="w-full sm:max-w-5/6 justify-self-center rounded"
                    loading="lazy"
                >
            </div>
        </section>

        <section class="py-16 md:py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement :level="2" class="text-center mb-4">Møt teamet vårt</HeadingElement>
                <p class="text-center text-lg mb-12">Vil du snakke med noen i vårt team? Vi hjelper deg gjerne!</p>
   
                <DataStatusIndicator
                    :isLoading="isLoading"
                    :error="errorState"
                    :isEmpty="!isLoading && !errorState && staffList.length === 0"
                    loadingText="Laster ansattlisten..."
                    errorText="Vi klarte ikke å laste inn ansattlisten akkurat nå. Sjekk gjerne nettverkstilkoblingen din og prøv igjen."
                    emptyTitle="Ingen ansatte funnet"
                    emptyText="Informasjon om teamet er ikke tilgjengelig for øyeblikket."
                    :onRetry="fetchAboutPageData"
                    >
                    <template #error-actions>
                        <NavigationLink :to="{ name: 'hjem' }" class="inline-block mt-6 text-sm hover:underline">
                        Tilbake til forsiden
                        </NavigationLink>
                    </template>
                
                    <template #empty-actions>
                        <NavigationLink :to="{ name: 'kontakt-oss' }" class="inline-block mt-6 text-sm hover:underline">
                        Kontakt oss
                        </NavigationLink>
                    </template>

                    <div class="space-y-16 mx-auto max-w-5xl">
               <!--  <div v-else class="space-y-16 mx-10"> -->
                        <div>
                            <HeadingElement :level="3" class="text-center mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">På kontoret</HeadingElement>
                            <div v-if="officeStaff.length > 0" class="max-w-xl mx-auto grid grid-cols-1 min-[500px]:grid-cols-2 gap-16">
                                <StaffCard v-for="staffMember in officeStaff" :key="staffMember.email" :staff="staffMember" :id="`ansatt-${staffMember.id}`" />
                            </div>
                            <p v-else class="text-center text-gray-500 italic mt-6">Ingen ansatte funnet i denne kategorien.</p>
                        </div>

                        <div>
                            <HeadingElement :level="3" class="text-center mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Teknisk avdeling</HeadingElement>
                            <div v-if="technicalStaff.length > 0" class="max-w-4xl mx-auto grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-16">
                                <StaffCard v-for="staffMember in technicalStaff" :key="staffMember.email" :staff="staffMember" :id="`ansatt-${staffMember.id}`" />
                            </div>
                            <p v-else class="text-center text-gray-500 italic mt-6">Ingen ansatte funnet i denne kategorien.</p>
                        </div>

                        <div>
                            <HeadingElement :level="3" class="text-center mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Ute i felten</HeadingElement>
                            <div v-if="fieldStaff.length > 0" class="flex flex-wrap justify-center gap-10">
                                <StaffCard v-for="staffMember in fieldStaff" :key="staffMember.email" :staff="staffMember" :id="`ansatt-${staffMember.id}`"
                                class="w-full min-[500px]:w-[calc(50%-1.25rem)] md:w-[calc(33.333%-1.666rem)] lg:w-[calc(25%-1.875rem)] rounded-lg border border-gray-200 dark:border-gray-800 text-center transition-shadow duration-300 hover:shadow-lg"/>
                            </div>
                            <p v-else class="text-center text-gray-500 italic mt-6">Ingen ansatte funnet i denne kategorien.</p>
                        </div>
                    </div>
                </DataStatusIndicator>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted, nextTick } from 'vue';
    import { useRoute } from 'vue-router';
    import DataStatusIndicator from '@/components/common/DataStatusIndicator.vue';
    import StaffCard from '@/components/common/StaffCardComponent.vue';

    const staffList = ref([]);
    const districtList = ref([]);
    const isLoading = ref(true);
    const errorState = ref(null);
    const route = useRoute();

    const districtIdToNameMap = computed(() => {
        const map = new Map();
        if (Array.isArray(districtList.value)) {
            districtList.value.forEach(district => {
                if (district && typeof district.id !== 'undefined' && typeof district.name !== 'undefined') {
                    map.set(district.id, district.name);
                }
            });
        }
        return map;
    });

    const getDistrictNames = (districtIds) => {
        if (!Array.isArray(districtIds) || districtIds.length === 0) {
            return '';
        }
            return districtIds
            .map(id => districtIdToNameMap.value.get(id))
            .filter(Boolean)
            .join(', ');
    };

    const mapStaffData = (staff) => ({
        ...staff,
        districtNames: getDistrictNames(staff.districtIds)
    });

    const officeStaff = computed(() => {
        if (isLoading.value) return [];
        return staffList.value
        .filter(staff => staff.workLocation === 'office')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(mapStaffData);
    });

    const technicalStaff = computed(() => {
        if (isLoading.value) return [];
        return staffList.value
        .filter(staff => staff.workLocation === 'technical')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(mapStaffData);
    });
    
    const fieldStaff = computed(() => {
        if (isLoading.value) return [];
        return staffList.value
        .filter(staff => staff.workLocation === 'field')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(mapStaffData);
    });
    
    const scrollToAnchor = async (hashValue) => {
        const targetHash = hashValue || route.hash; 

        if (targetHash && !isLoading.value && !errorState.value && staffList.value.length > 0) {
            await nextTick(); 

            const elementId = targetHash.substring(1);
            const element = document.getElementById(elementId);
            
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
                element.focus({ preventScroll: true });
            } else {
            // console.warn(`Ankerelement med ID '${elementId}' ble ikke funnet.`);
            }
        }
    };
    const fetchAboutPageData = async () => {
        isLoading.value = true;
        errorState.value = null;
        try {
            const [staffRes, districtsRes] = await Promise.all([
            fetch('/data/staff.json'),
            fetch('/data/districts.json')
            ]);

            if (!staffRes.ok) throw new Error(`Kunne ikke hente ansatte: ${staffRes.statusText}`);
            if (!districtsRes.ok) throw new Error(`Kunne ikke hente distrikter: ${districtsRes.statusText}`);

            const staffData = await staffRes.json();
            const districtData = await districtsRes.json();

            staffList.value = Array.isArray(staffData) ? staffData : [];
            districtList.value = Array.isArray(districtData) ? districtData : [];

            if (districtList.value.length > 0 && typeof districtList.value[0] !== 'object') {
            console.warn("districts.json ser ikke ut til å være en liste med objekter slik forventet.");
            districtList.value = [];
            }
            if (staffList.value.length === 0 && !errorState.value) { 
            console.warn("Ansattlisten er tom etter henting.");
            }

        } catch (error) {
            console.error("Feil ved henting av 'Om oss'-sidedata:", error);
            errorState.value = error.message || "En ukjent feil oppstod ved lasting av ansattdata.";
            staffList.value = []; 
            districtList.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchAboutPageData);

    watch(() => route.hash, (newHash, oldHash) => {
        if (newHash && newHash !== oldHash && !isLoading.value && !errorState.value) {
            scrollToAnchor(newHash);
        }
    });
    
</script>