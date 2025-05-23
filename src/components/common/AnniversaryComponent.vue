<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:gap-12">

            <div class="md:w-2/5 lg:w-1/3 mb-8 md:mb-0 flex justify-center">
                <img src="@/assets/images/qc-logo-20.jpg" alt="20 års jubileumslogo" class="max-w-1/3 sm:max-w-2/5 lg:max-w-2/3 h-auto rounded-sm shadow-md">
            </div>

            <div class="md:w-3/5 lg:w-2/3 text-lg text-center md:text-left">
                <HeadingElement :level="2" class="!text-white">
                    Vi feirer <span class="text-2xl">20 år!</span>
                </HeadingElement>
                <p class="!text-white">Det har vært en helt utrolig reise fra starten i 2005 til i dag.</p>
                <p class="mb-6 !text-white">Vi er takknemlige for alle kunder, partnere og ansatte som har vært med oss på veien.</p>
                <NavigationLink :to="{ name: 'om-oss', hash:'#var-historie'}" class="text-base">
                    Les vår historie
                </NavigationLink>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>