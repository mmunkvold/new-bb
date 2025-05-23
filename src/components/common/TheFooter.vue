<template>
    <footer class="full-width mt-auto pb-4 bg-secondary dark:bg-yellow-400 dark:text-gray-800 text-xs">
        <div class="mx-auto max-w-7xl">
            <div class="flex flex-col gap-8 lg:grid lg:grid-cols-3 xl:gap-40">
                <div class="mt-8 order-first lg:order-last flex flex-col items-center lg:items-start">
                    <div class="flex flex-row text-sm gap-16 "> 
                        <ul class="space-y-2">
                            <li><NavigationLink :to="{ name: 'produkter'}" class="hover:underline">Våre sykler</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'tilbehor'}" class="hover:underline">Tilbehør</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'teknisk-info'}" class="hover:underline">Teknisk info</NavigationLink></li>
                            <li><NavigationLink to="https://drive.google.com/file/d/1D7xCyq6jugzo9ZH3GUnqjIYEF1-1Sux-/view" class="hover:underline">Produktkatalog</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'bruker'}" class="hover:underline">Info bruker</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'terapeut'}" class="hover:underline">Info terapeut</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'hvordan-soke-hjelpemidler'}" class="hover:underline">Hvordan søke hjelpemidler</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'arrangementer'}" class="hover:underline">Arrangementer</NavigationLink></li>
                            <li><NavigationLink :to="{ name: 'blogg'}" class="hover:underline">Blogg</NavigationLink></li>
                        </ul>
                        <div>
                            <ul class="space-y-2">
                                <li><NavigationLink :to="{ name: 'om-oss'}" class="hover:underline">Om oss</NavigationLink></li>
                                <li><NavigationLink :to="{ name: 'kontakt-oss'}" class="hover:underline">Kontakt oss</NavigationLink></li>
                                <li><NavigationLink :to="{ name: 'personvern'}" class="hover:underline">Personvernerklæring</NavigationLink></li>
                                <li><NavigationLink :to="{ name: 'etiske-retningslinjer'}" class="hover:underline">Etiske retningslinjer</NavigationLink></li>
                            </ul>
                            <div class="mt-6 flex gap-4 items-center ">
                                <div class="w-16 h-12 flex items-center justify-center"> 
                                    <img src="@/assets/images/miljofyrtarn.png" alt="Miljøfyrtårn Sertifisert bedrift" class="max-w-full max-h-full object-contain" loading="lazy" />
                                </div>
                                <div class="w-16 h-12 flex items-center justify-center"> 
                                    <img src="@/assets/images/gront-punkt.png" alt="Medlem av Grønt Punkt Norge" class="max-w-full max-h-full object-contain" loading="lazy" /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:order-2 flex flex-col items-center text-center">
                    <NavigationLink to="/" class="lg:hidden"><img src="@/assets/images/qc-logo.png" class="max-w-36 mb-2" alt="Til startsiden" loading="lazy" /></NavigationLink>
                    <p class="italic lg:hidden mb-4 !text-gray-800">Ekspert på spesialsykler siden 1. april 2025!</p>
                    <p class="mt-4 lg:mt-20 text-xl italic text-center">Opplevelse av mestring og glede gjennom aktivitet for alle!</p> 
                    <div class="mt-6 justify-center flex gap-5 text-2xl">
                        <NavigationLink to="https://www.facebook.com/QualityCareAS/" aria-label="facebook"><FBIcon /></NavigationLink>
                        <NavigationLink to="https://www.instagram.com/qualitycareas/" aria-label="instagram"><InstagramIcon /></NavigationLink>
                        <NavigationLink to="https://www.youtube.com/user/ASQualityCare/videos" aria-label="youtube"><YouTubeIcon /></NavigationLink>
                    </div>
                </div>

                <div class="order-last lg:order-first flex flex-col items-center lg:items-start text-center lg:text-left">
                    <NavigationLink to="/" class="hidden lg:block mt-4"><img src="@/assets/images/qc-logo.png" class="max-w-36 mb-2" alt="Til startsiden" loading="lazy" /></NavigationLink>
                    <p class="italic hidden lg:block mb-4 !text-gray-800">Ekspert på spesialsykler siden 1. april 2025!</p>
                    <div class="border-t border-primary w-full my-3"></div>
                    <address class="not-italic uppercase w-full"> 
                        Fossegrenda 30b<br />
                        7038 Trondheim
                        <div class="border-t border-primary w-full my-3"></div>
                        <span class="normal-case block">Åpningstider: mandag-fredag 08:00-16:00</span>
                        <span class="normal-case my-2 inline-flex items-center gap-1"><PhoneIcon aria-hidden="true" class="text-primary h-4 w-4" /> <a href="tel:+4797097071" class="hover:underline">+47 970 970 71</a></span><br />
                        <span class="normal-case inline-flex items-center gap-1"><MailIcon aria-hidden="true" class="text-primary h-4 w-4" /> <a href="mailto:post@quality-care.no" class="hover:underline">post@quality-care.no</a></span>
                    </address>
                </div>
            </div>

            <div class="mt-8 pt-4">
                <p class="text-[10px] uppercase text-center">© Quality Care AS 2025 <span class="text-gray-400 px-1">|</span> Utviklet av Kickass AI & Marketing</p>
            </div>
        </div>
    </footer>
</template>

<script setup>

</script>
