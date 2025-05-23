<template>
    <section class="bg-gray-100 dark:bg-gray-900 py-16 md:py-20 text-pretty">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HeadingElement :level="2" class="mb-4 text-pretty">Finn informasjon som passer best for deg</HeadingElement>
            <p class="text-lg max-w-3xl mx-auto mb-12">
                Usikker på hvor du skal starte? Velg den rollen som passer deg best - vi har laget egne sider med relevant info for både brukere/pårørende og terapeuter/fagfolk.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                <div class="bg-white dark:bg-gray-900/50 p-8 rounded border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                    <div class="flex-shrink-0 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-icon-red" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M12 3.5q1.039 0 1.789.75t.75 1.789t-.75 1.788t-1.789.75t-1.789-.75t-.75-1.789t.75-1.788T12 3.5m.003 5.923q.985 0 1.95.237q.964.236 1.736.64q.796.417 1.284.959q.489.541.489 1.187v4.886q0 .358-.164.71q-.165.352-.452.65q-.295.294-.686.546q-.39.252-.875.462v-1.896q0-.8-1.106-1.306q-1.105-.506-2.179-.506q-1.038 0-2.028.426t-1.206 1.117q.834.356 1.757.448t1.839.098q.123 0 .239-.01t.245-.01v2.178q-.143.03-.297.03h-.318q-.76 0-1.743-.142t-1.869-.49t-1.483-.911t-.597-1.403v-4.877q0-.645.488-1.187t1.26-.959q.776-.404 1.753-.64q.977-.237 1.963-.237M12 14.5q.698 0 1.195-.497t.497-1.195t-.497-1.195T12 11.116t-1.195.497t-.497 1.195t.497 1.195T12 14.5"/>
                        </svg>
                    </div>
                    <HeadingElement :level="3" class="mb-3 text-gray-900">For brukere og pårørende</HeadingElement>
                    <p class="mb-6 flex-grow">Se hvilke sykler som finnes, hvordan NAV-støtten fungerer, og hvordan du enkelt kommer i gang med utprøving.</p>
                    <NavigationLink :to="{ name: 'bruker'}" class="inline-block w-6/7 min-[450px]:w-auto text-center bg-gray-800 dark:border dark:border-gray-700 text-white link-btn !text-base">
                        start her
                    </NavigationLink>
                </div>

                <div class="bg-white dark:bg-gray-900/50 p-8 rounded border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                    <div class="flex-shrink-0 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-icon-red" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l-1-3l4-2l4 1h3.5M3 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m8-13a1 1 0 1 0 2 0a1 1 0 1 0-2 0m1 11v-7M8 20h7l1-4l4-2m-2 6h3"/>
                        </svg>
                    </div>
                    <HeadingElement :level="3" class="mb-3 text-gray-900">For terapeuter og fagfolk</HeadingElement>
                    <p class="mb-6 flex-grow">Finn teknisk info, dokumentasjon og alt du trenger for å hjelpe brukeren din med å søke riktig sykkel.</p>
                    <NavigationLink :to="{ name: 'terapeut'}" class="inline-block w-6/7 min-[450px]:w-auto text-center bg-gray-800 dark:border dark:border-gray-700 text-white link-btn !text-base">
                        info for fagpersoner
                    </NavigationLink>
                </div>
            </div>
        </div>
    </section>

    <section class="py-12 md:py-16">
        <div class="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-20">
            <div class="md:w-1/2">
                <HeadingElement :level="2" class="text-center text-3xl font-bold mb-16 text-gray-800">Slik får du en spesialsykkel - steg for steg</HeadingElement>
                <div class="mt-8 max-w-lg mx-auto">      
                    <div class="space-y-12"> 
                        <div class="relative pl-16"> 
                            <div class="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-icon-red dark:bg-red-700 text-white z-10 shadow-md">
                                <PhoneIcon class="text-2xl" aria-hidden="true"/>
                            </div>
                            <div class="bg-gray-100 dark:bg-gray-900 p-4 rounded">
                                <HeadingElement :level="3" class="mb-1 text-gray-900">1. Bestill gratis prøvetime</HeadingElement>
                                <p class=" text-sm">Vi kommer hjem til deg, og sammen finner vi sykkelen som passer dine behov og din hverdag.</p>
                            </div>
                        </div>

                        <div class="relative pl-16">
                            <div class="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-secondary dark:bg-yellow-600 text-white z-10 shadow-md">
                                <DocumentIcon class="text-2xl" aria-hidden="true"/>
                            </div>
                            <div class="bg-gray-100 dark:bg-gray-900 p-4 rounded">
                                <HeadingElement :level="3" class="mb-1 text-gray-900">2. Søk støtte fra NAV</HeadingElement>
                                <p class="text-sm">Terapeuten hjelper deg med å sende søknaden til NAV. Vi bidrar med relevant produktinformasjon og dokumentasjon som du kan bruke i prosessen.</p>
                            </div>
                        </div>

                        <div class="relative pl-16">
                            <div class="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-400 dark:bg-green-700 text-white z-10 shadow-md">
                                <img src="@/assets/images/liggesykkel_hvit.png" alt="Hvit strektegning av en liggesykkel" class="inline-block p-2" aria-hidden="true" />
                            </div>
                            <div class="bg-gray-100 dark:bg-gray-900 p-4 rounded">
                                <HeadingElement :level="3" class="mb-1 text-gray-900">3. Få levert din nye sykkel</HeadingElement>
                                <p class="text-sm">Når søknaden er godkjent, tilpasser vi sykkelen og leverer den klar til bruk.</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            
            <div class="md:pt-10 md:w-1/2">
                <div class="text-center">
                    <img src="@/assets/images/liggesykkel.png" alt="Rød strektegning av en liggesykkel" class="inline-block align-center max-w-20 mb-6" />
                </div>
                <HeadingElement :level="3" class="text-center">Klar for neste steg eller kanskje har du spørsmål?</HeadingElement>
                <p class="max-w-lg text-center text-lg  mb-8">Bestill en uforpliktende prøvetime i dag - eller les mer om hvordan du søker støtte til sykkel som aktivitetshjelpemiddel gjennom NAV. Har du spørsmål underveis, står vi klare med informasjon og støtte.</p>
                <div class="mt-6 flex flex-col gap-4 sm:gap-6 items-center">
                    <NavigationLink :to="{ name: 'bestill-provetime'}" class="w-6/7 sm:w-auto sm:max-w-[250px] bg-primary text-center text-white !no-underline hover:no-underline rounded px-3 py-2 link-btn !text-base ">
                        bestill prøvetime
                    </NavigationLink>
                    <NavigationLink :to="{ name: 'hvordan-soke-hjelpemidler'}">
                        Les mer om søkeprosessen
                    </NavigationLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import PhoneIcon from '@/assets/icons/PhoneIcon.vue';
    
</script>