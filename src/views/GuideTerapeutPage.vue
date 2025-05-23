<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">

        <section class="text-center">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement>Informasjon for terapeuter</HeadingElement>
                <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Vi <strong>samarbeider med ergoterapeuter og fysioterapeuter over hele landet</strong> for å finne de beste løsningene for brukerne deres.</p>
                <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Vi tilbyr <strong>vår ekspertise på spesialsykler</strong> fra Hase Bikes, støtte i NAV-prosesser, og et landsdekkende nettverk for å hjelpe deg i ditt arbeid. Her finner du <strong>informasjonen, dokumentasjonen og støtten</strong> du trenger.</p>
                <NavigationLink :to="{ name: 'kontakt-oss'}" class="inline-block w-6/7 min-[450px]:w-auto text-center bg-gray-800 text-white link-btn !text-base">
                    kontakt oss
                </NavigationLink>
            </div>
        </section>

        <section class="mt-10 py-16 md:py-20" id="samarbeid">
            <div class="flex flex-col md:flex-row items-start gap-6">
                    <div class="w-full">
                        <img src="@/assets/images/verksted.jpg" alt="Person i blå genser står foran en liggesykkel på et bord inne i et verksted" class="w-full sm:max-w-4/5 justify-self-center rounded">
                    </div>
                    <div class="w-full">
                        <HeadingElement :level="2">Hvorfor samarbeide med Quality Care?</HeadingElement>
                        <p>Vi er <strong>eksperter på spesialsykler</strong>, og jobber kun med dette. Vårt <strong>inkluderer terapeuter med praktisk erfaring</strong>team , og vi <strong>kjenner NAV-prosessene</strong> ut og inn. Når du samarbeider med oss, får du en faglig partner som forstår både brukeren og systemet.</p>
                    </div>
                </div>
        </section>
    
        <section class="max-w-5xl mx-auto">
            <div class="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 lg:gap-x-12 lg:gap-y-10">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-red-50 dark:bg-red-800 text-icon-red dark:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div>
                    <div>
                        <HeadingElement :level="3" class="mb-1">Fokusert ekspertise</HeadingElement>
                        <p class="text-base">Vi jobber <i>kun</i> med spesialsykler. Dette er vårt eneste fokus, og vi er dedikerte eksperter på feltet.</p>
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-red-50 dark:bg-red-800 text-icon-red dark:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div>
                        <HeadingElement :level="3" class="mb-1">Terapeuter i teamet</HeadingElement>
                        <p class="text-base">Vårt team inkluderer erfarne ergo- og fysioterapeuter med praktisk erfaring som forstår brukerens hverdag.</p>
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-red-50 dark:bg-red-800 text-icon-red dark:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <HeadingElement :level="3" class="mb-1">NAV-kunnskap</HeadingElement>
                        <p class="text-base">Vi har inngående kjennskap til NAV-systemet, rammeavtaler og søknadsprosesser for hjelpemidler.</p>
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-red-50 dark:bg-red-800 text-icon-red dark:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                    <div>
                        <HeadingElement :level="3" class="mb-1">Din faglige partner</HeadingElement>
                        <p class="text-base">Se på oss som din støttespiller - vi forstår både brukerens behov og systemets krav.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <HeadingElement :level="2" class="mb-12">Slik samarbeider vi</HeadingElement>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <HeadingElement :level="3" class="mb-2">1. Faglig sparring & behovsanalyse</HeadingElement>
                        <p>Vi bistår med vår produktkunnskap og erfaring for å vurdere aktuelle løsninger basert på brukerens behov og dine faglige mål.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <HeadingElement :level="3" class="mb-2">2. Utprøving og tilpasning</HeadingElement>
                        <p>Vi organiserer utprøvinger lokalt over hele landet, enten hos bruker, på aktivitets-/sykkeldager, eller hos oss. Vi deltar også på hjelpemiddelmesser. Sykkelen tilpasses etter behov.</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <HeadingElement :level="3" class="mb-2">3. Bistand i NAV-prosessen</HeadingElement>
                        <p>Vi kjenner NAV-systemet godt og hjelper til med dokumentasjon og tilbud for å forenkle søknadsprosessen.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 rounded" id="hase">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="prose prose-lg lg:prose-xl">
                    <HeadingElement :level="2">Hvorfor Hase Bikes?</HeadingElement>
                    <p>Vi har valgt Hase Bikes som vår hovedleverandør fordi de lager <strong>spesialsykler i absolutt toppklasse</strong>, kjent for sin <strong>solide kvalitet og smarte design</strong>. Det unike med Hase Bikes er at syklene er som et fleksibelt byggesett. Dette gjør det mulig for oss å <strong>skreddersy sykkelen</strong> ned til minste detalj for hver enkelt bruker. Enten det trengs spesiell sittestøtte, tilpassede pedaler eller alternative måter å styre på, finner vi en løsning takket være dette systemet.</p>
                    <p class="my-4">Mange av modellene, som deres populære liggesykler og håndsykler, er også designet for å være ekstra stabile og lette å manøvrere. Dette <strong>gir brukerne trygghet og kontroll</strong>.</p>
                    <p>Resultatet er <strong>pålitelige sykler som varer lenge</strong>, og som gir mennesker med ulike behov muligheten til å oppleve ekte sykkelglede, aktivitet og økt frihet i hverdagen.</p>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center shadow">
                    <img src="@/assets/images/tilpasning.jpg" alt="Person tilpasser en spesialsykkel for en bruker" 
                        class="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                    >
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 text-center">
            <HeadingElement :level="2" class="mb-4">Sykkelmodeller og tilpasningsmuligheter</HeadingElement>
            <p class="max-w-xl mx-auto">Vi tilbyr spesialsykler fra Hase Bikes for barn, ungdom og voksne - liggesykler, tandem og hånddrevne modeller. Syklene er modulbaserte og kan tilpasses med et omfattende utvalg av tilbehør for alle behov. Flere modeller er prisforhandlet eller kan søkes via dispensasjon.</p>
            <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
                <div>
                    <div class="mb-3 rounded">
                        <img src="/images/products/kettwiesel/kettwiesel1.png" alt="Rød liggesykkel med ett hjul foran og to hjul bak" 
                            class="bg-white w-full h-full object-contain rounded"
                            loading="lazy"
                        >
                    </div>
                    <HeadingElement :level="3" class="mb-1">Modulbaserte liggesykler</HeadingElement>
                    <p class="text-sm">Svært stabile og tilpasningsdyktige (feks  Kettwiesel).</p>
                </div>
                <div>
                    <div class="mb-3 rounded">
                        <img src="/images/products/handbike/handbike1.jpg" alt="Rød hånddrevet liggesykkel" 
                            class="w-full h-full object-contain rounded"
                            loading="lazy"
                        >
                    </div>
                    <HeadingElement :level="3" class="mb-1">Håndsykkel med tilpasning</HeadingElement>
                    <p class="text-sm">Ergonomisk og stabil - kan skreddersys med hånddrift, støttepunkter og girsystem (HandbikeH).</p>
                </div>
                <div>
                    <div class="mb-3 rounded">
                        <img src="/images/products/pino-steps/pino-steps1.png" alt="Hvit tandemsykkel" 
                            class="bg-white w-full h-full object-contain rounded"
                            loading="lazy"
                        >
                    </div>
                    <HeadingElement :level="3" class="mb-1">Tandemsykkel for samkjøring</HeadingElement>
                    <p class="text-sm">Én modell, mange bruksområder - trygg og fleksibel løsning for bruker og ledsager (Pino).</p>
                </div>
            </div>
            <div class="text-center space-x-4">
                <NavigationLink :to="{ name: 'produkter'}" class="inline-block bg-gray-800 border-2 border-gray-800 text-white link-btn">
                    se alle våre sykler
                </NavigationLink>
                <NavigationLink :to="{ name: 'tilbehor'}" class="inline-block bg-white border border-gray-300 text-gray-800 link-btn">
                    utforsk tilbehør
                </NavigationLink>
            </div>
        </section>

        <section class="full-width bg-gray-50 dark:bg-gray-900 md:py-20" id="dokumentasjon">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement :level="2" class="mb-6">Dokumentasjon og støtte til NAV søknad</HeadingElement>
                <div class="prose prose-lg lg:prose-xl max-w-none space-y-6">
                    <p>Du som terapeut sender inn søknaden til NAV - vi bistår deg med det du trenger for å gjøre jobben effektivt. Mange av våre spesialsykler er på rammeavtale med NAV, noe som <strong>forenkler søknadsprosessen</strong>. Vi holder oss <strong>kontinuerlig oppdatert på gjeldende avtaler og HMS-nummer</strong>.</p>             
                    <div>
                        <HeadingElement :level="4" class="mb-2">Vi bistår gjerne med:</HeadingElement>
                        <ul class="list-disc space-y-1 list-outside ml-5">
                            <li>Informasjon om hvilke modeller som er på avtale</li>
                            <li>Utarbeidelse av tilbud med korrekte HMS-nummer</li>
                            <li>Teknisk dokumentasjon (inkl data og sprengskisser)</li>
                            <li>Brosjyrer og brukerveiledninger</li>
                            <li>Rask tilgang på annen dokumentasjon du måtte mangle</li>
                            <li>Kontakt med Hjelpemiddelsentralen ved behov</li>
                        </ul>
                    </div>

                    <p>Målet vårt er å gjøre prosessen så smidig som mulig for deg som fagperson og for brukeren. Finn nyttige ressurser nedenfor eller <a href="/kontakt-oss" class="text-gray-800 dark:text-gray-300 underline hover:text-gray-600 dark:hover:text-gray-400">kontakt oss direkte</a>.</p>
                </div>
            </div>
        </section>

        <section class=" full-width bg-gray-100 dark:bg-gray-950 py-16 md:py-20">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement :level="2" class="text-center">Ressurser for fagfolk</HeadingElement>
                <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-none">
                        <HeadingElement :level="3" class="mb-2">Teknisk info</HeadingElement>
                        <p class="text-sm mb-3">Finn brukermanualer, monteringsanvisninger og sprengskisser.</p>
                        <a href="/teknisk-info" class="text-sm underline hover:text-gray-900">Gå til teknisk info</a>
                    </div>
                    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-none">
                        <HeadingElement :level="3" class="mb-2">NAV ressurser</HeadingElement>
                        <ul class="space-y-2"><!-- TODO sett inn andre linker?-->
                            <li>
                                <NavigationLink to="https://www.nav.no/om-hjelpemidler" target="_blank" rel="noopener noreferrer" class="underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    NAV: Hvordan søke om hjelpemidler
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink to="https://www.nav.no/aktivitetshjelpemidler-over-26" target="_blank" rel="noopener noreferrer" class="underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    NAV: Aktivitetshjelpemidler over 26 år (Akt26)
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                                </NavigationLink>
                            </li>
                            <li>
                                <NavigationLink to="https://www.nav.no/brukerpass" target="_blank" rel="noopener noreferrer" class="underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    NAV: Brukerpass
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="hidden lg:inline-block h-4 w-4 ml-1" viewBox="0 0 24 24"><g fill="currentColor"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                                </NavigationLink>
                            </li>
                        </ul>                    
                    </div>
                </div>
            </div>
        </section>

        <section class="mt-20 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div class="dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-none flex flex-col items-center">
                    <HeadingElement :level="2" class="mb-4">Bestill utprøving for en bruker</HeadingElement>
                    <p>Vi tilbyr prøving hjemme hos bruker eller på aktivitetsdager i nærheten. Du som terapeut kan være med på utprøvingen - vi justerer, tilpasser og finner riktig modell sammen.</p>
                    <NavigationLink :to="{ name: 'bestill-provetime'}" class="mt-8 inline-block w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn">
                        bestill gratis prøvetime
                    </NavigationLink>
                </div>
                <div class="dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-none flex flex-col items-center">
                    <HeadingElement :level="2" class="mb-4">Din lokale kontaktperson</HeadingElement>
                    <p>Våre fagkonsulenter dekker hele landet og har god kjennskap til lokale rutiner og NAV-praksis. Sammen finner vi riktig løsning - på brukers premisser.</p>
                    <NavigationLink :to="{ name: 'kontakt-oss', hash: '#districts'}" class="mt-8 sm:mt-auto">
                        Finn din kontaktperson
                    </NavigationLink>
                </div>
                <div class="dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-none flex flex-col items-center">
                    <HeadingElement :level="2" class="mb-4">Spørsmål?</HeadingElement>
                    <p>Vi står klare til å hjelpe deg - enten du har en konkret sak, trenger dokumentasjon, eller ønsker å diskutere et behov.</p>
                    <NavigationLink :to="{ name: 'kontakt-oss', hash: '#form'}" class="mt-8 sm:mt-auto">
                        Kontakt oss
                    </NavigationLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
</script>