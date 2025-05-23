<template>
    <div class="relative full-width">

        <div class="relative overflow-hidden mt-0 bg-gray-300 min-h-[180px] sm:min-h-[310px] lg:min-h-[500px] xl:min-h-[735px]">
            <img
                src="@/assets/images/hero.jpg"
                alt="En voksen på liggesykkel på sandstrand"
                class="absolute inset-0 w-full h-full object-cover"
            />
        </div>

        <div class="relative z-1 mx-auto max-w-[1280px] px-4 lg:px-8 lg:-mt-90 xl:-mt-140 mb-10 lg:mb-20 lg:dark:!text-gray-900">
            <div class="lg:w-2/5 bg-white/80 dark:bg-transparent lg:dark:bg-white/80 p-6 md:p-8 rounded-lg sm:hadow-xl">
                <HeadingElement class="mt-0 text-left lg:dark:!text-gray-900">Frihet og mestring!</HeadingElement>
                <p class="mt-4">Vanlige sykler passer ikke for alle.</p>
                <p class="mt-2">Spesialsykler er utviklet for personer med funksjonsnedsettelser - og gjør det mulig å oppleve bevegelse, frisk luft og mestring.</p>
                <p>Du får prøve<span class="italic"> - hjemme hos deg selv - </span><strong>helt gratis!</strong></p>
                <div class="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
                    <NavigationLink to="#process" class="bg-dark text-gray-100 link-btn !px-4 !text-base">
                        jeg vil vite mer
                    </NavigationLink>
                    <NavigationLink :to="{ name: 'bestill-provetime'} " class="bg-primary text-gray-100 link-btn !text-base">
                        bestill prøvetime
                    </NavigationLink>
                </div>
            </div>
        </div>
    </div>
</template>
