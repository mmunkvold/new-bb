<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl w-screen px-2 sm:px-4 text-pretty">
        <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-20">
            <section class="lg:col-span-2 max-w-2xl">
                <HeadingElement>Kontakt Quality Care AS</HeadingElement>
                <p class="mb-4">Har du <strong>spørsmål om spesialsykler, aktivitetshjelpemidler eller NAV-støtte</strong>? Vi er her for å hjelpe deg - enten du vil <strong>bestille en prøvetime, få teknisk support</strong> eller bare lurer på hvordan du kommer i gang.</p>

                <HeadingElement :level="2" class="mt-10">Usikker på hvem du skal kontakte?</HeadingElement>
                <p>Finn din <strong>lokale kontaktperson</strong> eller send oss en melding direkte.</p>
                <p>Du kan også ringe oss på <span class="inline-flex items-center gap-1"><PhoneIcon class="text-secondary dark:text-yellow-600" aria-hidden="true" /> <a href="tel:+4797097071">970 970 71</a></span></p>
                
                <div class="relative bg-gray-100 dark:bg-gray-900 p-8 my-8 max-w-2xl">
                    <div class="flex flex-wrap gap-4 justify-center">
                        <button
                            type="button"
                            @click="activeSection = 'districts'"
                            :class="[
                            'inline-block font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-700 whitespace-nowrap cursor-pointer',
                            activeSection === 'districts'
                                ? 'bg-gray-300 dark:bg-gray-600 dark:text-white shadow-sm'
                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-none text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            ]"
                        >
                            finn din lokale kontaktperson
                        </button>
                        <button
                            type="button"
                            @click="activeSection = 'form'"
                            :class="[
                            'inline-block font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 whitespace-nowrap cursor-pointer',
                            activeSection === 'form'
                                ? 'bg-gray-300 dark:bg-gray-700 dark:text-white shadow-sm'
                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-none text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            ]"
                        >
                            kontakt oss direkte
                        </button>
                        <div v-if="activeSection !== null" class="absolute top-3 right-3">
                            <button
                                type="button"
                                @click="activeSection = null"
                                class="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-500 bg-gray-200/60 dark:bg-gray-800 hover:bg-gray-300/60 dark:hover:bg-gray-800/60 px-2 py-1 rounded-full cursor-pointer"
                                title="Lukk"
                            >
                                lukk
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <section id="districts-section" class="bg-gray-200 dark:bg-gray-950 rounded max-w-lg mx-auto" >
                        <div v-if="activeSection === 'districts'" class="animate-fade-in mt-10 p-6">
                            <HeadingElement :level="2" class="text-center">Finn din lokale kontaktperson</HeadingElement>
                            <p>Vi har rådgivere i hele landet som kjenner lokale forhold og NAV-rutiner.</p>
                            <p>Velg ditt fylke og finn kontaktinfo til din spesialsykkel-ekspert:</p>

                            <div class="mt-4 relative inline-block w-full">
                                <label for="district-select" class="sr-only">Velg distrikt</label>
                                <select
                                    id="district-select"
                                    name="district-select"
                                    v-model="selectedDistrict"
                                    class="w-full h-10 pl-3 pr-8 border rounded text-sm appearance-none focus:shadow-outline bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="" disabled>-- Velg distrikt --</option>
                                    <option v-for="districtObj in districtList" :key="districtObj.id" :value="districtObj.name">{{ districtObj.name }}</option>
                                </select>
                                <div class="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                                    <svg class="w-5 h-5 fill-current text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>

                            <div v-if="currentContactPersons.length > 0" class="mt-10 space-y-6">
                                <div v-for="person in currentContactPersons"
                                    :key="person.email"
                                    class="w-full bg-gray-100 p-4 rounded flex flex-wrap items-center gap-3 sm:gap-6 shadow-sm"
                                >
                                    <img v-if="person.photo"
                                        :src="person.photo"
                                        :alt="person.name"
                                        class="max-w-20 rounded mx-auto min-[404px]:mx-0"
                                    />
                                    <svg v-else
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-16 w-16 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <div>
                                        <h3 class="text-lg font-bold text-gray-900">{{ person.name }}</h3>
                                        <p v-if="person.position" class="text-sm">{{ person.position }}</p>
                                        <p class="text-xs mt-2">
                                            <a
                                                :href="`mailto:${person.email}`"
                                                class="inline-flex items-center gap-2 hover:underline"
                                            >
                                                <MailIcon aria-hidden="true" />
                                                {{ person.email }}
                                            </a>
                                        </p>
                                        <p class="text-xs mt-1">
                                            <a
                                                :href="`tel:${person.number.replace(/\s/g, '')}`"
                                                class="inline-flex items-center gap-2 hover:underline"
                                            >
                                                <PhoneIcon aria-hidden="true" />
                                                {{ person.number }}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p v-else-if="selectedDistrict && !isLoading" class="mt-10 text-gray-500 italic">
                                Vi fant dessverre ingen dedikert kontaktperson for {{ selectedDistrict }}. Kontakt oss direkte så hjelper vi deg.
                            </p>
                            <p v-if="isLoading && selectedDistrict" class="mt-10 text-gray-500">Laster kontaktinfo...</p>
                        </div>

                        <div v-if="activeSection === 'form'" id="contact-form" class="animate-fade-in mt-10 py-4 rounded shadow-lg">
                            <HeadingElement :level="2" class="pt-4 text-center">Kontaktskjema</HeadingElement>
                            <!-- <ContactForm @success="handleFormSuccess" class="p-4"/> 
                             
                            <p v-if="formSuccessMessage" class="text-center text-green-700 font-medium bg-green-100 p-3 rounded-md border border-green-200">{{ formSuccessMessage }}</p>-->
                            <FormDownMessage 
                                :emailAddress="firmaEpost"
                                :formType="typeSkjema"
                                :suggestedInfoItems="infoForEpost"
                            />
                        </div>
                    </section>
                </div>
            </section>

            <aside class="lg:col-span-1 h-fit lg:pb-20 lg:bg-gray-100 dark:lg:bg-gray-900 p-6 rounded text-sm space-y-4">
                    <HeadingElement :level="2">Her finner du oss</HeadingElement>
                        <address class="not-italic">
                            Fossegrenda 30b<br />
                            7038 Trondheim<br />
                            <span class="mt-4 inline-flex items-center gap-1"><PhoneIcon class="text-secondary dark:text-yellow-600" aria-hidden="true" /> <a href="tel:+4797097071">+47 970 970 71</a></span><br />
                            <span class="mb-4 inline-flex items-center gap-1"><MailIcon class="text-secondary dark:text-yellow-600" aria-hidden="true" /> <a href="mailto:post@quality-care.no">post@quality-care.no</a></span>
                        </address>
                        <p class="mb-0 !text-gray-900 dark:!text-gray-400">Åpningstider</p>
                        <p class="!text-gray-900 dark:!text-gray-400">man-fre: 08.00-16.00</p>
                
                        <div class="max-w-fit">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28593.904353780334!2d10.402066!3d63.389695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d2e20c804ec65%3A0x1fb6fef839ad6279!2sQuality%20Care%20AS!5e0!3m2!1sno!2sus!4v1743230840864!5m2!1sno!2sus" 
                            class="w-full" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Fossegrenda 30b, 7038 Trondheim"></iframe>
                        </div>
                    

                    <p class="mt-8 lg:text-center !text-gray-900 dark:!text-gray-400">Følg oss på sosiale media!</p>
                    <div class="mt-4 flex gap-5 text-xl lg:justify-center">
                        <NavigationLink to="https://www.facebook.com/QualityCareAS/" ><FBIcon aria-label="facebook" /></NavigationLink>
                        <NavigationLink to="https://www.instagram.com/qualitycareas/" ><InstagramIcon aria-label="instagram" /></NavigationLink>
                        <NavigationLink to="https://www.youtube.com/user/ASQualityCare/videos" ><YouTubeIcon aria-label="youtube" /></NavigationLink>    
                    </div>   
            </aside>
        </div>

        <section class="full-width mt-20 bg-gray-200 dark:bg-gray-900/50 p-10 sm:p-18 rounded w-fit text-center">
            <HeadingElement :level="2">Klar for å prøve en spesialsykkel?</HeadingElement>
            <p class="mx-auto max-w-xl">Du trenger ikke vente for å komme i gang. Vi tilbyr personlig rådgivning og gratis prøvetime hjemme hos deg.</p>
            <NavigationLink :to="{ name: 'bestill-provetime'}" class="mt-6 inline-block w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn">
                bestill gratis prøvetime
            </NavigationLink>
        </section>

        <section class="mt-10 flex flex-col md:flex-row gap-6 lg:gap-20">
            <div class="basis-full px-4 lg:px-8" id="faq">
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
            <div class="basis-full mt-10 px-8 md:px-0 flex flex-col space-y-3">
                <HeadingElement :level="3">Nyttige lenker</HeadingElement>
                <NavigationLink :to="{ name: 'bruker'}">        
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    Les mer for brukere og pårørende
                </NavigationLink>
                <NavigationLink :to="{ name: 'terapeut'}">                            
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    Info for terapeuter
                </NavigationLink>
                <NavigationLink :to="{ name: 'hvordan-soke-hjelpemidler'}">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    Slik fungerer søknadsprosessen
                </NavigationLink>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, nextTick } from 'vue';
    import ContactForm from '../components/forms/ContactForm.vue'; 
    import FaqAccordion from '@/components/common/FaqAccordion.vue';
    import FormDownMessage from '@/components/forms/FormDownMessage.vue';

    import { useFaqs } from '@/composables/useFaqs';

    const staffList = ref([]);
    const districtList = ref([]);

    const pageContext = 'kontakt-oss';

    const { 
        getFaqsByContext, 
        isLoadingFaqs,
        errorFaqs
    } = useFaqs();

    const faqItems = getFaqsByContext(pageContext);

    const firmaEpost = ref('post@quality-care.no');
    const infoForEpost = ref([
        'Fullt navn',
        'Eventuelt tlf nr om du heller vil bli ringt opp',
        'Hva henvendelsen gjelder'
    ]);
    const typeSkjema = ref('kontakt')
    
    const activeSection = ref(null); 
    const selectedDistrict = ref('');
    const isLoading = ref(true);
    const formSuccessMessage = ref('');
    
    const currentContactPersons = computed(() => {
        if (
            !selectedDistrict.value ||
            districtList.value.length === 0 ||
            staffList.value.length === 0
        ) {
            return []
        }

        const selectedDistrictObject = districtList.value.find(
            district => district.name.toLowerCase() === selectedDistrict.value.toLowerCase()
        )

        if (!selectedDistrictObject || typeof selectedDistrictObject.id === 'undefined') {
            console.warn(`Kunne ikke finne ID for valgt distriktsnavn: ${selectedDistrict.value}`)
            return []
        }

        const selectedDistrictId = selectedDistrictObject.id

        return staffList.value.filter(staff =>
            Array.isArray(staff.districtIds) && staff.districtIds.includes(selectedDistrictId)
        )
    })

    const handleFormSuccess = (message = 'Takk! Meldingen din er mottatt.') => {
        formSuccessMessage.value = message;
        setTimeout(() => { formSuccessMessage.value = ''; }, 5000);
    };

    onMounted(async () => {
        isLoading.value = true;
        try {
            const [staffRes, districtsRes] = await Promise.all([
                fetch('/data/staff.json'),
                fetch('/data/districts.json') 
            ]);
        
            if (!staffRes.ok) throw new Error(`Failed to fetch staff: ${staffRes.statusText}`);
            if (!districtsRes.ok) throw new Error(`Failed to fetch districts: ${districtsRes.statusText}`);
        
            const staffData = await staffRes.json();
            const districtData = await districtsRes.json();
        
            staffList.value = Array.isArray(staffData) ? staffData : [];
            districtList.value = Array.isArray(districtData) ? districtData : [];
        
            if (districtList.value.length > 0 && typeof districtList.value[0] !== 'object') {
                console.warn("districts.json ser ikke ut til å være en liste med objekter slik forventet.");
                districtList.value = []; 
            }
    
            } catch (error) {
                console.error("Error fetching contact page data:", error);
            } finally {
                isLoading.value = false;
                
                const validSections = ['districts', 'form'];
            const hash = window.location.hash.replace('#', '');

            if (validSections.includes(hash)) {
                activeSection.value = hash;

                const scrollTargets = {
                    districts: 'districts-section',
                    form: 'contact-form',
                };

                nextTick(() => {
                    const el = document.getElementById(scrollTargets[hash]);
                    if (el) {
                        const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: topOffset, behavior: 'smooth' });
                    }
                });

            }
        }
    });
  
</script>
  
<style scoped>
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>