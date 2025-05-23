<template>
    <div class="flex flex-col md:flex-row gap-10">
        <HeadingElement :level="2" class="w-full lg:w-1/3 text-center">Derfor kan du trygt velge <br /><span class="font-semibold text-2xl">Quality Care</span></HeadingElement> 
        <div class="max-w-3xl mx-auto space-y-10 px-2"> 
            <div class="flex items-start gap-5 md:gap-6">
                <div class="flex-shrink-0 w-10 sm:w-16 h-10 sm:h-16 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-2">
                    <img src="@/assets/images/liggesykkel.png" alt="Rød strektegning av en liggesykkel" class="inline-block" aria-hidden="true" />
                </div>
                <div>
                    <HeadingElement :level="3">Eksperter på spesialsykler</HeadingElement>
                    <p>Vi jobber <span class="italic">kun</span> med spesialsykler, og vårt team inkluderer både ergoterapeuter og fysioterapeuter. Du får hjelp av folk som forstår behovene dine - både praktisk og faglig.</p>
                </div>
            </div>

            <div class="flex items-start gap-5 md:gap-6">
                <div class="flex-shrink-0 w-10 sm:w-16 h-10 sm:h-16 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <MapMarkerIcon class="w-6 sm:-8 h-6 sm:h-8 text-sky-600" aria-hidden="true"/> 
                </div>
                <div>
                    <HeadingElement :level="3">Vi kommer til deg - uansett hvor du bor</HeadingElement>
                    <p>Våre rådgivere dekker hele landet. Du kan prøve sykkelen i ditt nærmiljø eller møte oss på en aktivitetsdag nær deg - helt gratis og uforpliktende.</p>
                </div>
            </div>

            <div class="flex items-start gap-5 md:gap-6">
                <div class="flex-shrink-0 w-10 sm:w-16 h-10 sm:h-16 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <HandshakeIcon class="w-6 sm:w-8 h-6 sm:h-8 text-green-500" aria-hidden="true"/>
                </div>
                <div>
                    <HeadingElement :level="3">Oppfølging hele veien</HeadingElement> 
                    <p>Du får trygg oppfølging hele veien - fra første prøving til sykkelen er levert. Vi gir deg informasjon og dokumentasjon som kan være nyttig i søknadsprosessen gjennom NAV.</p>
                </div>
            </div>

            <div class="flex items-start gap-5 md:gap-6">
                <div class="flex-shrink-0 w-10 sm:w-16 h-10 sm:h-16 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <StarIcon class="w-6 sm:w-8 h-6 sm:h-8 text-secondary dark:text-yellow-600" aria-hidden="true"/> 
                </div>
                <div>
                    <HeadingElement :level="3">Markedets BESTE spesialsykler</HeadingElement> 
                    <p>Vi leverer tilpassede sykler fra Hase Bikes - internasjonalt anerkjent som ledende på kvalitet, funksjonalitet og brukertilpasning. </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { MapMarkerIcon, StarIcon, HandshakeIcon } from '@/assets/icons';
</script>