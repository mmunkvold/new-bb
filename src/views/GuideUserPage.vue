<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl px-2 sm:px-4 text-pretty">

        <section class="text-center">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeadingElement>Spesialsykler for barn og voksne</HeadingElement>
                <p class="-mt-2 mb-4 text-2xl"> Slik får du riktig hjelpemiddel</p>
                <p class="text-lg md:text-xl mb-8 mx-auto max-w-2xl">Ønsker du eller noen du er glad i <strong>mer frihet, aktivitet og mestring i hverdagen</strong>? Vi hjelper både barn og voksne med å finne den spesialsykkelen som passer deres behov - enten det er til fritid, trening eller som aktivitetshjelpemiddel.</p>
                <NavigationLink :to="{ name: 'bestill-provetime'}" class="inline-block w-6/7 min-[450px]:w-auto text-center !text-base bg-primary text-gray-100 link-btn">
                    bestill gratis prøvetime
                </NavigationLink>
            </div>
        </section>

        <section class="mt-10 py-16 md:py-20" id="spesialsykkel">                
            <div class="flex flex-col md:flex-row items-start gap-6">
                <div class="w-full">
                    <img src="@/assets/images/vinter.jpg" alt="Person m vinterklær på gul liggesykkel i en snøkledd skog" class="w-full sm:max-w-5/6 justify-self-center rounded">
                </div>
                <div class="w-full">
                    <HeadingElement :level="2">Hva er en spesialsykkel - og hvem passer den for?</HeadingElement>
                    <p>En spesialsykkel er mer enn bare et fremkomstmiddel. Den er et nøye designet og <strong>tilpasset hjelpemiddel</strong> for personer med ulike funksjonsutfordringer - enten det gjelder balanse, mobilitet, styrke eller annet.</p>
                    <p class="mt-4">Målet er å la brukeren komme seg ut, være i fysisk aktivitet, delta sosialt og <strong>oppleve mestring på egne vilkår</strong>.</p>
                </div>
            </div>

            <div class="mt-16 flex flex-col md:flex-row-reverse items-start gap-8" id="hase">
                <div class="w-full">
                    <img src="@/assets/images/bruker.jpg" alt="Veldig glad gutt på trets liggesykkel ute i en høstkledd skog" 
                        class="w-full sm:max-w-5/6 justify-self-center rounded"
                        loading="lazy"
                    >
                </div>
                <div class="w-full">
                    <HeadingElement :level="2">Kvalitetssykler fra anerkjente Hase Bikes</HeadingElement>
                    <p>Vi tilbyr et <strong>bredt utvalg</strong>, inkludert trehjulssykler, tandemsykler og hånddrevne modeller. Syklene er levert av Hase Bikes, kjent for <strong>kvalitet, fleksibilitet og innovative løsninger</strong></p>
                    <p class="mt-4">Flere av modellene er på <strong>rammeavtale med NAV</strong> og kan tilpasses både barn og voksne med ulike behov. Mange brukes som aktivitetshjelpemiddel, og gir både frihet og bedre helse.</p>
                </div>
            </div>
        </section>

        <section class="full-width bg-gray-50 dark:bg-gray-900/50 py-16 md:py-20 ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <HeadingElement :level="2" class="mb-12">Hvordan kommer du i gang?</HeadingElement>
                <p class="max-w-xl mx-auto mb-8">Du starter med å <strong>bestille en gratis og uforpliktende prøvetime</strong>. Vi kommer hjem til deg - eller du kan møte oss på en aktivitetsdag. Sammen finner vi riktig sykkel, til dine behov og ønsker.</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <PhoneIcon class="text-3xl" aria-hidden="true"/>
                        </div>
                        <HeadingElement :level="3" class="mb-2">1. Bestill prøvetime</HeadingElement>
                        <p>Den beste måten å finne riktig sykkel på, er å prøve den. Vi tilbyr gratis prøvetimer over hele landet. </p>
                    </div>

                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <MapMarkerIcon class="text-3xl" />
                        </div>
                        <HeadingElement :level="3" class="mb-2">2. Test sykkelen der du vil bruke den</HeadingElement>
                        <p>Vi kommer hjem til deg eller vi møtes på en aktivitetsdag, hvor du får prøvd ulike sykler for å finne hvilken som passer deg best.</p>
                    </div>

                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 mb-4 ring-4 ring-gray-100 dark:ring-gray-800 dark:ring-2">
                            <DocumentIcon class="text-3xl" aria-hidden="true"/>
                        </div>
                        <HeadingElement :level="3" class="mb-2">3. Send søknad til NAV</HeadingElement>
                        <p>Søknaden sendes inn i samarbeid med terapeuten din. Vi hjelper med informasjon og dokumentasjon.</p>
                    </div>
                </div>

                <NavigationLink :to="{ name: 'bestill-provetime'}" class="my-16 inline-block w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn !text-base">
                    bestill gratis prøvetime
                </NavigationLink>
        
                <div class="py-6 md:py-10 rounded max-w-3xl mx-auto">
                    <div class="max-w-xl mx-auto text-center space-y-3">
                        <HeadingElement :level="2">Hvordan fungerer søkeprosessen?</HeadingElement>
                        <p>Når riktig sykkel er valgt, kan du søke støtte fra NAV.</p>
                        <p><span class="font-semibold">Søknaden må sendes av en kommunal ergo- eller fysioterapeut,</span> og vi hjelper dere med all nødvendig dokumentasjon.</p>
                        <p>Mange av våre sykler kan dekkes helt eller delvis av NAV. Vi sørger for at du får riktig informasjon og støtte hele veien.</p>
                        <NavigationLink :to="{ name: 'hvordan-soke-hjelpemidler'}">Les mer om søkeprosessen</NavigationLink>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 text-center">
            <HeadingElement :level="2" class="mb-4">Hvilke sykler finnes?</HeadingElement>
            <p class="max-w-xl text-center mx-auto">Vi tilbyr flere typer spesialsykler, tilpasset barn, voksne og ulike funksjonsnivåer.
                Enten du trenger støtte for balanse, motorikk eller styrke, finnes det en løsning.</p>
            <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
                <div>
                    <div class="mb-3 rounded">
                        <img src="/images/products/kettwiesel/kettwiesel1.png" alt="Rød liggesykkel med ett hjul foran og to hjul bak" 
                        class="bg-white w-full object-contain rounded"
                        loading="lazy"
                    >
                    </div>
                    <HeadingElement :level="3" class="mb-1">Liggesykler</HeadingElement>
                    <p class="text-sm">Stabile og trygge for balanseutfordringer (f eks Kettwiesel).</p>
                </div>
                <div>
                    <div class="mb-3 rounded">
                        <img src="/images/products/pino-steps/pino-steps1.png" alt="Hvit tandemsykkel" 
                            class="bg-white w-full object-contain rounded"
                            loading="lazy"
                        >
                    </div>
                    <HeadingElement :level="3" class="mb-1">Tandemsykler</HeadingElement>
                    <p class="text-sm">For sykling sammen, uansett forutsetninger (Pino).</p>
                </div>
                <div>
                    <div class="mb-3 rounded">
                        <img src="/images/products/handbike/handbike1.jpg" alt="Rød hånddrevet liggesykkel" 
                            class="bg-white w-full object-contain rounded"
                            loading="lazy"
                        >
                    </div>
                    <HeadingElement :level="3" class="mb-1">Håndsykler</HeadingElement>
                    <p class="text-sm">For deg med nedsatt mobilitet i beina (HandbikeH)</p>
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

        <section class="py-16 md:py-20 bg-gray-100 dark:bg-gray-900">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <HeadingElement :level="2" class="text-center">Hva sier andre familier og brukere?</HeadingElement>
                <div class="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <blockquote class="flex flex-col p-6 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-none">
                        <p class="text-lg italic mb-4">"Det første jeg vil nevne er at sykkelen gir frihet og mobilitet. Han er ikke avhengig av å ha med oss foreldre på tur og han sykler rundt omkring i nærmiljøet i på egen hånd."</p>
                        <footer class="text-right mt-auto">- Far til Henrik</footer>
                    </blockquote>
                    <blockquote class="flex flex-col p-6 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-none">
                        <p class="text-lg italic mb-4">"Jeg prøvde ulike sykkelmodeller og varianter men var aldri i tvil om at en Hase liggesykkel var det riktige for meg. Det å sitte såpass lavt samtidig som jeg har en behagelig sittestilling gjorde valget enkelt for meg. Motoren på sykkelen hjelper meg når jeg blir sliten."</p>
                        <footer class="text-right mt-auto">- Cecilie</footer>
                    </blockquote>
                </div>
                <p class="mt-10 mb-4 max-w-xl mx-auto text-lg">Flere familier har fått mer frihet og aktivitet med en tilpasset sykkel. Les deres historier og se hva som er mulig.</p>
                <NavigationLink :to="{ name: 'blogg'}">Les flere tilbakemeldinger på  bloggen vår</NavigationLink>
            </div>
        </section>

        <section class="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div class="p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                    <HeadingElement :level="2" class="mb-4">Har du spørsmål</HeadingElement>
                    <p class="mb-4">Du trenger ikke ha alle svarene - det er derfor vi er her.
                    Vi svarer gjerne på det du lurer på, og hjelper deg i gang - uansett hvor du er i prosessen.</p>
                    <NavigationLink :to="{ name: 'kontakt-oss'}">
                        Kontakt oss
                    </NavigationLink>
                </div>
                <div class="p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col items-center">
                    <HeadingElement :level="2" class="mb-4">Klar til å prøve?</HeadingElement>
                    <p>Det starter med én ting:</p>
                    <p>Bestill en gratis prøvetime - vi kommer hjem til deg så du får prøve sykkelen der du ferdes til daglig</p>
                    <NavigationLink :to="{ name: 'bestill-provetime'}" class="mt-8 inline-block w-6/7 min-[450px]:w-auto text-center bg-primary text-gray-100 link-btn">
                        bestill gratis prøvetime
                    </NavigationLink>
                </div>
            </div>
        </section>
    
    </div>
</template>