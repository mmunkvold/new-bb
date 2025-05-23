<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">

        <section class="text-center mb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeadingElement>Hvordan søke støtte fra NAV</HeadingElement>
            <p class="-mt-2 mb-2 text-2xl"> - Slik går du frem</p>
            <p class="text-lg md:text-xl mb-8 mx-auto max-w-2xl">Mange av våre spesialsykler kan <strong>dekkes helt eller delvis gjennom NAV</strong>. Dette gjelder både barn, voksne og eldre med funksjonsnedsettelse som har behov for hjelpemidler i hverdagen.</p>
            <p class="text-lg md:text-xl mb-8 mx-auto max-w-2xl">Vi gir deg og terapeuten din den informasjonen og dokumentasjonen dere trenger - <strong>fra utprøving til søknad</strong>.</p>
        </section>

        <section class="full-width py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50" id="prosess">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <HeadingElement :level="2">Slik fungerer søkeprosessen - steg for steg</HeadingElement>
                <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div class="flex flex-col items-center text-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" aria-hidden="true"/></svg>
                        </div>
                    <HeadingElement :level="3" class="mb-2">1. Prøv en sykkel</HeadingElement>
                    <p>Bestill en gratis og uforpliktende prøvetime hjemme hos deg, eller møt oss på en aktivitetsdag. Sammen finner vi den spesialsykkelen som passer dine behov og funksjonsnivå. Dette er første trinn i å søke om hjelpemiddel fra NAV.</p>
                </div>
                    <div class="flex flex-col items-center text-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <DocumentIcon class="text-3xl" aria-hidden="true"/>
                        </div>
                        <HeadingElement :level="3" class="mb-2">2. Søk støtte fra NAV</HeadingElement>
                        <p>Etter at riktig modell er valgt, sender din kommunale ergo- eller fysioterapeut inn søknaden.</p>
                        <p>Sykkelen søkes som et aktivitetshjelpemiddel eller, i noen tilfeller som forflytningshjelpemiddel. Det påvirker hvilken støtteordning og eventuell egenandel som gjelder.</p>
                    </div>
                    <div class="flex flex-col items-center text-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <img src="@/assets/images/liggesykkel_hvit.png" alt="Hvit strektegning av en liggesykkel" class="inline-block p-2 filter invert dark:invert-0" aria-hidden="true"/>
                        </div>
                        <HeadingElement :level="3" class="mb-2">3. Få levert din nye sykkel</HeadingElement>
                        <p>Når søknaden er godkjent, klargjør vi sykkelen med nødvendige tilpasninger og leverer den ferdig satt opp - klar til bruk.</p>
                    </div>
                </div>
                <NavigationLink :to="{ name: 'bestill-provetime'}" class="mt-12 inline-block w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn !text-base">
                    bestill gratis prøvetime
                </NavigationLink>
            </div>
        </section>

        <section class="py-16 md:py-20 ">
            <div class="mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-start" id="aktivitetshjelpemiddel">
                <div class="mt-6">
                    <HeadingElement :level="3" class="mb-3 inline-flex gap-2">
                        <InfoIcon class="text-3xl text-secondary dark:text-yellow-600" aria-hidden="true" />
                        Hva er et aktivitetshjelpemiddel?
                    </HeadingElement>
                    <div class="space-y-4 text-lg">
                        <p>Et <strong>aktivitetshjelpemiddel</strong> er et <strong>hjelpemiddel som skal gjøre det enklere å være fysisk aktiv</strong> i hverdagen. For å få støtte må man ha en varig funksjonsnedsettelse (over 2 år).</p>
                        <p>Våre spesialsykler oppfyller ofte kravene for støtte som aktivitetshjelpemiddel, og kan derfor søkes om for både barn, unge og voksne. Voksne kan få gjennom ordninger som 
                            <NavigationLink to="https://www.nav.no/aktivitetshjelpemidler-over-26">
                                Aktivitetshjelpemidler over 26 (Akt26)
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                            </NavigationLink>
                        </p>
                    </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-900 p-6">
                    <HeadingElement :level="3" class="mb-3 inline-flex gap-2">
                        <InfoIcon class="text-3xl text-secondary dark:text-yellow-600" aria-hidden="true" />
                        Hva koster det?
                    </HeadingElement>
                    <div class="mt-6 space-y-4">
                        <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-none shadow-sm">
                            <div class="flex-shrink-0 text-gray-500 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
                            </div>
                            <div>
                                <HeadingElement :level="4">Under 26 år</HeadingElement>
                                <p class="text-sm">NAV dekker som regel hele kostnaden.</p>
                            </div>
                        </div>
                            <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-none">
                                <div class="flex-shrink-0 text-gray-500 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                            <div>
                                <HeadingElement :level="4">Over 26 år (Akt26)</HeadingElement>
                                <p class="text-sm">Egenandel for aktivitetshjelpemidler over 26 er 10% av kjøpesummen, men maksimum 7 000 kr.</p>
                            </div>
                        </div>
                            <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-none">
                                <div class="flex-shrink-0 text-gray-500 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                            <div>
                                <HeadingElement :level="4">Forflytningshjelpemiddel</HeadingElement>
                                <p class="text-sm">Dersom sykkelen godkjennes som et forflytningshjelpemiddel, dekkes det fullt ut av NAV - uten egenandel.</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-6">Vi hjelper deg og terapeuten med å vurdere hvilken løsning som passer best, basert på situasjon og behov.</p>
                </div>
            </div>
        </section>

        <section class="full-width bg-gray-100 dark:bg-gray-900 py-16 md:py-20" id="krav">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="order-last md:order-first">
                    <HeadingElement :level="2">Hva må være på plass for å søke?</HeadingElement>
                    <ul class="mt-6 space-y-2">
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Du må ha en funksjonsnedsettelse som varer over 2 år</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Riktig modell må være valgt gjennom utprøving</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Søknaden må sendes inn av en kommunal ergo- eller fysioterapeut.</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-secondary dark:text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Teknisk dokumentasjon og produktinformasjon må følge søknaden - dette gir vi terapeuten</span>
                        </li>
                    </ul>
                    <p class="mt-6">Flere av våre sykler er prisforhandlet og inngår i NAVs rammeavtale for hjelpemidler, noe som forenkler søknadsprosessen betydelig.</p>
                </div>
            
                <img src="@/assets/images/historie.jpg" alt="En tandemsykkel i forgrunn på svaberg, med sjø og solnedgang i bakgrunnen" 
                    class="w-full rounded"
                    loading="lazy"
                >
            </div>
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
                <HeadingElement :level="3">Nyttige ressurser og lenker</HeadingElement>
                <NavigationLink to="https://www.nav.no/om-hjelpemidler" target="_blank" rel="noopener noreferrer" class="underline">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    NAV: Hvordan søke om hjelpemidler
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                </NavigationLink>
                <NavigationLink to="https://www.nav.no/aktivitetshjelpemidler-over-26" target="_blank" rel="noopener noreferrer" class="underline">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    NAV: Aktivitetshjelpemidler over 26 år (Akt26)
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                </NavigationLink>
                <NavigationLink to="https://www.nav.no/brukerpass" target="_blank" rel="noopener noreferrer" class="underline">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    NAV: Brukerpass
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                </NavigationLink>
            </div>
        </section>

        <section class="mt-10 py-16 md:py-20 bg-gray-100 dark:bg-gray-950 rounded">
            <div class="max-w-5xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-center">
                    <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-none flex flex-col items-center">
                        <HeadingElement :level="2">Har du spørsmål</HeadingElement>
                        <p class="mb-4">Du trenger ikke ha alle svarene - det er derfor vi er her.
                        Vi svarer gjerne på det du lurer på, og hjelper deg - uansett hvor du er i prosessen.</p>
                        <NavigationLink :to="{ name: 'kontakt-oss'}">
                        Kontakt oss
                        </NavigationLink>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-none flex flex-col items-center">
                        <HeadingElement :level="2">Klar til å prøve?</HeadingElement>
                        <p>Det starter med én ting:</p>
                        <p>Bestill en gratis prøvetime - vi kommer hjem til deg så du får prøve sykkelen der du ferdes til daglig</p>
                        <NavigationLink :to="{ name: 'bestill-provetime'}" class="mt-8 inline-block w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn !text-base">
                            bestill gratis prøvetime
                        </NavigationLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import FaqAccordion from '@/components/common/FaqAccordion.vue';
    import { useFaqs } from '@/composables/useFaqs';
    
    const pageContext = 'hvordan-soke';

    const { 
        getFaqsByContext, 
        isLoadingFaqs,
        errorFaqs
    } = useFaqs();

    const faqItems = getFaqsByContext(pageContext);

</script>