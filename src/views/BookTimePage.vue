<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl">
        <div class="text-center">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement class="text-center">Bestill gratis prøvetime</HeadingElement>
                <p class="text-lg md:text-xl mb-8 mx-auto max-w-xl">For å finne den spesialsykkelen som passer best for deg og dine behov, tilbyr vi gratis prøvetime.</p>
                <p class="text-lg md:text-xl mb-8 mx-auto max-w-xl">Du får prøve sykkelen i ditt nærmiljø sammen med en av våre erfarne rådgivere. Sammen finner vi den løsningen som passer dine behov, din hverdag og funksjon.</p>
            </div>
        </div>

        <section class="py-16 md:py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement :level="2" class="text-center mb-12">Hvordan fungerer det?</HeadingElement>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <DocumentIcon class="text-3xl" aria-hidden="true"/>
                        </div>
                        <HeadingElement :level="3" class="mb-1">1. Fyll ut skjema</HeadingElement>
                        <p class="text-sm"> Gi oss litt informasjon, så vi vet hvem vi skal kontakte og hvor i landet du bor.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <HeadingElement :level="3" class="mb-1">2. Vi kontakter deg</HeadingElement>
                        <p class="text-sm">En rådgiver i ditt område tar kontakt for å avtale tidspunkt og hvilke sykler som er aktuelle å prøve.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <MapMarkerIcon class="w-6 sm:w-8 h-6 sm:h-8" /> 
                        </div>
                        <HeadingElement :level="3" class="mb-1">3. Vi kommer hjem til deg</HeadingElement>
                        <p class="text-sm">Du får teste en spesialtilpasset sykkel hjemme, med personlig veiledning og råd om veien videre.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="mx-auto max-w-xl border border-gray-100 dark:border-gray-700 py-4 rounded shadow-lg">
            <HeadingElement :level="2" class="text-center">Bestill prøvetime</HeadingElement>

           <!--  <BookTimeForm /> -->
            <FormDownMessage 
                :emailAddress="firmaEpost"
                :formType="typeSkjema"
                :suggestedInfoItems="infoForEpost"
            />
        </section>

        <section class="mt-20 flex flex-col md:flex-row gap-6 lg:gap-20">
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
                <HeadingElement :level="3">Vil du lese mer før du bestiller prøvetime?</HeadingElement>
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
    import { ref } from 'vue';
    import BookTimeForm from '@/components/forms/BookTimeForm.vue';
    import FaqAccordion from '@/components/common/FaqAccordion.vue';
    import FormDownMessage from '@/components/forms/FormDownMessage.vue';
    
    import { useFaqs } from '@/composables/useFaqs';
    
    const pageContext = 'bestill-provetime';

    const { 
        getFaqsByContext, 
        isLoadingFaqs,
        errorFaqs
    } = useFaqs();

    const faqItems = getFaqsByContext(pageContext);

    const firmaEpost = ref('post@quality-care.no');
    const infoForEpost = ref([
        'Fullt navn',
        'Hvilket fylke du bor i',
        'Eventuelt tlf nr om du heller vil bli ringt opp',
        'Om du er bruker, pårørende eller terapeut'
    ]);
    const typeSkjema = ref('bestill prøvetime')

</script>