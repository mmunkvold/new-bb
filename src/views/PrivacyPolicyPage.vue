<template>
    <div class="mt-10 md:mt-36 mb-20 mx-auto max-w-7xl">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeadingElement>Personvernerklæring for Quality Care AS</HeadingElement>
            <div class="space-y-2 mt-4 mb-10">
                <p class="font-semibold">Vi i Quality Care AS er opptatt av å behandle dine personopplysninger på en trygg og forsvarlig måte, i tråd med gjeldende personvernlovgivning (GDPR og Ekomloven).</p>
                <p>Denne personvernerklæringen forklarer hvordan vi samler inn, bruker og beskytter informasjonen vi får tilgang til når du besøker nettsiden vår eller kontakter oss.</p>
            </div>

            <div class="bg-gray-100 dark:bg-gray-900/50 py-4 px-7 rounded-sm">
                <HeadingElement :level="2" >Innhold:</HeadingElement>
                <ul>
                    <li>
                        <a href="#1" class="hover:font-bold active:font-bold">1. Hvilken informasjon samler vi inn?</a>
                    </li>
                    <li>
                        <a href="#2" class="hover:font-bold active:font-bold">2. Hvordan bruker vi informasjonen?</a>
                    </li>
                    <li>
                        <a href="#3" class="hover:font-bold active:font-bold">3. Bruk av AI-chatbot</a>
                    </li>
                    <li>
                        <a href="#4" class="hover:font-bold active:font-bold">4. Informasjonskapsler (Cookies)</a>
                    </li>
                    <li>
                        <a href="#5" class="hover:font-bold active:font-bold">5. Tredjepartsleverandører</a>
                    </li>
                    <li>
                        <a href="#6" class="hover:font-bold active:font-bold">6. Dine rettigheter</a>
                    </li>     
                    <li>
                        <a href="#7" class="hover:font-bold active:font-bold">7. Endringer i personvernerklæringen</a>
                    </li>         
                </ul>
            </div>
    
            <section class="space-y-9 mt-10 scroll-mt-40">
                <div class="space-y-2">
                    <HeadingElement :level="2" id="1">1. Hvilken informasjon samler vi inn?</HeadingElement>
                    <p>Vi samler inn følgende typer informasjon:</p>
                    <ul class="list-disc list-outside pl-6 marker:text-gray-400 dark:marker:text-gray-700">
                        <li><span class="font-bold">Kontaktinformasjon:</span> Navn, e-postadresse, telefonnummer og fylke når du fyller ut kontaktskjema eller bestiller prøvetime.</li>
                        <li><span class="font-bold">Brukerdata:</span> Informasjon om hvordan du bruker nettsiden (f eks hvilke sider du besøker), som samles inn via informasjonskapsler (cookies).</li>
                        <li><span class="font-bold">Meldinger og henvendelser:</span> Når du kontakter oss via e-post, chat eller skjema, lagres meldingene og informasjonen du sender.</li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <HeadingElement :level="2" id="2">2. Hvordan bruker vi informasjonen?</HeadingElement>
                    <p>Vi bruker innhentet informasjon til:</p>
                    <ul class="list-disc list-outside pl-6 marker:text-gray-400 dark:marker:text-gray-700">
                        <li>Å besvare henvendelser og planlegge prøvetimer</li>
                        <li>Å gi deg relevant informasjon om våre spesialsykler og tjenester</li>
                        <li>Statistikk og analyse for å forbedre nettsiden</li>
                        <li>Markedsføring og utsendelse av nyhetsbrev (kun hvis du har gitt samtykke eller har et eksisterende kundeforhold)</li>
                    </ul> 
                </div>
                <div class="space-y-2">
                    <HeadingElement :level="2" id="3">3. Bruk av AI-chatbot</HeadingElement>
                    <p>Vi bruker en AI-basert chatbot på nettsiden for å hjelpe besøkende med å finne informasjon raskt og enkelt. Chatboten er kun informativ og gir generelle svar basert på innholdet på nettsiden, samt lenker til relevante sider.</p>
                    <ul class="list-disc list-outside pl-6 marker:text-gray-400 dark:marker:text-gray-700">
                        <li><span class="font-bold">Ingen sensitive opplysninger bør oppgis i chatboten</span> Dette vil tydelig fremgå i starten av samtalen.</li>
                        <li>Det du skriver i chatboten kan blir lagret i anonym form for å forbedre tjenesten. Chatboten har ikke tilgang til personlig informasjon, og samtaler knyttes ikke til deg med mindre du selv frivillig oppgir kontaktinformasjon - noe vi fraråder.</li>
                    </ul> 
                </div>
                <div class="space-y-2">
                    <HeadingElement :level="2" id="4">4. Informasjonskapsler (Cookies)</HeadingElement>
                    <p>Vi bruker informasjonskapsler (cookies) for å forbedre brukeropplevelsen på nettsiden, samt samle anonym statistikk om trafikk og bruksmønster.</p>
                    <p>Følgende cookies finnes på siden:</p>
                    <ul class="list-disc list-outside pl-6 marker:text-gray-400 dark:marker:text-gray-700">
                        <li><span class="font-bold">Egne cookies:</span>  Brukes for å sikre grunnleggende funksjonalitet og god navigasjon på nettsiden.</li>
                        <li><span class="font-bold">Google Analytics:</span> Samler anonym informasjon om hvordan nettsiden brukes - for eksempel antall besøk, hvilke sider som besøkes og hvor brukerne kommer fra. Denne informasjonen hjelper oss å forbedre innhold og struktur.</li>
                        <li><span class="font-bold">Facebook/Meta-piksel:</span> Brukes for å måle effekt av annonsering, og til å vise mer relevante annonser på Facebook og Instagram. Informasjonen som samles inn er anonym og benyttes kun til statistikk og annonsemåling.</li>
                    </ul>
                </div>
                <div class="space-y-2">
                    <HeadingElement :level="2" id="5">5. Tredjepartsleverandører</HeadingElement>
                    <p>Vi samarbeider med følgende aktører for lagring og behandling av data:</p>
                    <ul class="list-disc list-outside pl-6 marker:text-gray-400 dark:marker:text-gray-700">
                        <li>Google Inc. (Analytics og e-post)</li>
                        <li>Meta (Facebook/Instagram)</li>
                        <li>Kickass AI & Marketing (AI-tjenesteleverandør for chatbot)</li>
                    </ul>
                    <p>Disse behandler data i henhold til egne avtaler og GDPR.</p>
                </div>
                <div class="space-y-2">
                    <HeadingElement :level="2" id="6">6.  Dine rettigheter</HeadingElement>
                    <p>Du har rett til:</p>
                    <ul class="list-disc list-outside pl-6 marker:text-gray-400 dark:marker:text-gray-700">
                        <li>Innsyn i hvilke data vi har lagret om deg</li>
                        <li>Å få feilaktige data rettet</li>
                        <li>Å be om sletting av data</li>
                        <li>Å protestere mot eller reservere deg mot markedsføring</li>
                    </ul>
                    <p>For full oversikt over dine rettigheter, se: <NavigationLink to="https://lovdata.no/dokument/NL/lov/2018-06-15-38/KAPITTEL_gdpr-3">Personopplysningsloven - kapittel 3</NavigationLink>.</p>
                    <p>Du kan også lese mer om dine rettigheter hos <NavigationLink to="https://www.datatilsynet.no/">Datatilsynet</NavigationLink>.</p>
                    <p>Ønsker du å utøve dine rettigheter? Kontakt oss på post@quality-care.no</p>
                </div>
                <div class="space-y-2">
                    <HeadingElement :level="2" id="7">7.  Endringer i personvernerklæringen</HeadingElement>
                    <p>Vi oppdaterer denne erklæringen ved behov. Siste oppdatering vil alltid fremgå nederst på denne siden.</p>
                    <p class="font-semibold">Sist oppdatert: Mai 2025</p>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
</script>