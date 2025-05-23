<template>
    <header class="mx-auto max-w-7xl w-full relative md:absolute top-0 left-0 right-0 z-10"
        :class="{ 'dark:text-gray-700': isHomepage, 'dark:text-gray-200': !isHomepage }"
        >
        
        <div class="hidden lg:flex justify-between items-center w-full">
            <div class="mt-4 z-10">
                <NavigationLink to="/">
                    <img src="@/assets/images/qc-logo.png" class="max-w-26" alt="Til startsiden" />
                </NavigationLink>
                <p class="text-xs"
                    :class="{ '!text-red-700': isHomepage, '!text-red-700 dark:!text-red-600': !isHomepage }">Din spesialsykkel-ekspert!</p>
            </div>          
            
            <GlobalSearchInput  
                v-model="desktopSearchQuery"
                id="desktop-search-input" 
                :isHomepageVariant="isHomepage"
            />
            
            <nav class="p-2" aria-label="Hovedmeny for desktop">
                <ul class="flex flex-wrap justify-center items-center space-x-4 text-sm tracking-wider">
                    <li class="relative" @mouseenter="openDropdown('produkter')" @mouseleave="closeDropdown('produkter')">
                        <button @click="toggleDropdown('produkter')" type="button" class="menu-item flex items-center" aria-haspopup="true" :aria-expanded="isProdukterOpen.toString()">
                            produkter 
                            <svg class="w-4 h-4 ml-1 text-primary" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <Transition name="dropdown-fade">
                            <ul v-show="isProdukterOpen" 
                                class="absolute left-0 mt-2 w-48 bg-transparent rounded-md shadow-lg py-1 z-20 ring-1 ring-primary ring-opacity-5"
                                :class="{ 'bg-transparent': isHomepage, 'bg-white dark:bg-gray-950': !isHomepage }">
                                <li>
                                    <NavigationLink :to="{ name: 'produkter' }" :noUnderline="true" @click="closeDropdownsAndMenu" class="dropdown-link">våre sykler</NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink :to="{ name: 'tilbehor' }" :noUnderline="true" @click="closeDropdownsAndMenu" class="dropdown-link">tilbehør</NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink :to="{ name: 'teknisk-info' }" :noUnderline="true" @click="closeDropdownsAndMenu" class="dropdown-link">teknisk info</NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink to="https://drive.google.com/file/d/1D7xCyq6jugzo9ZH3GUnqjIYEF1-1Sux-/view" :noUnderline="true" @click="closeDropdownsAndMenu" class="dropdown-link">produktkatalog</NavigationLink>
                                </li>
                            </ul>
                        </Transition>
                    </li>

                    <li class="relative" @mouseenter="openDropdown('info')" @mouseleave="closeDropdown('info')">
                        <button @click="toggleDropdown('info')" type="button" class="menu-item flex items-center" aria-haspopup="true" :aria-expanded="isInfoOpen.toString()">
                            informasjon
                            <svg class="w-4 h-4 ml-1 text-primary" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <Transition name="dropdown-fade">
                            <ul v-show="isInfoOpen" 
                                class="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20 ring-1 ring-primary ring-opacity-5" 
                                :class="{ 'bg-transparent': isHomepage, 'bg-white dark:bg-gray-950': !isHomepage }">
                                <li>
                                    <NavigationLink :to="{ name: 'bruker' }" :noUnderline="true" @click="closeDropdownsAndMenu" class="dropdown-link">info bruker</NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink :to="{ name: 'terapeut' }" :noUnderline="true"  @click="closeDropdownsAndMenu" class="dropdown-link">info terapeut</NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink :to="{ name: 'hvordan-soke-hjelpemidler' }" :noUnderline="true" @click="closeDropdownsAndMenu" class="dropdown-link">hvordan søke hjelpemidler</NavigationLink>
                                </li>
                            </ul>
                        </Transition>
                    </li>

                    <li><NavigationLink :to="{ name: 'arrangementer' }" class="menu-item" @click="closeDropdownsAndMenu">arrangementer</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'blogg' }" class="menu-item" @click="closeDropdownsAndMenu">blogg</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'om-oss' }" class="menu-item" @click="closeDropdownsAndMenu">om oss</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'kontakt-oss' }" class="menu-item" @click="closeDropdownsAndMenu">kontakt oss</NavigationLink></li>

                </ul>
            </nav>
            
            <NavigationLink :to="{ name: 'bestill-provetime' }" class=" bg-primary text-gray-100 link-btn">bestill prøvetime</NavigationLink>
            
        </div>

        <AnniversaryBanner class="hidden lg:block" v-if="isHomepage" />

        <!-- mobil menu -->
        <div class="lg:hidden">
            <div class="relative mt-2 grid grid-cols-2 gap-20">
                <NavigationLink to="/" class="basis-full">
                    <img src="@/assets/images/qc-logo.png" class="max-w-32" alt="Til startsiden" />
                </NavigationLink>
                                
                <div class="flex items-center">
                    <button 
                        @click="showMobileSearch = !showMobileSearch; menuOpen = false" 
                        class="text-gray-400 focus:outline-none p-2" 
                        type="button"
                        :aria-label="showMobileSearch ? 'Lukk søk' : 'Åpne søk'" 
                        :aria-expanded="showMobileSearch.toString()"
                    >
                        <span v-if="!showMobileSearch">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                        <span v-else>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </span>
                    </button>

                    <button 
                        @click="menuOpen = !menuOpen; showMobileSearch = false" 
                        class="ml-auto mr-2 text-primary focus:outline-none p-2" 
                        type="button"
                        :aria-label="menuOpen ? 'Lukk meny' : 'Åpne meny'" 
                        :aria-expanded="menuOpen.toString()" 
                        aria-controls="mobile-menu-list" 
                    >
                        <span v-if="!menuOpen">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </span>
                        <span v-else>
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            <div v-if="showMobileSearch" 
                class="-mx-.5 absolute top-0 left-0 right-0 z-30 bg-white dark:bg-gray-950 p-8 shadow-lg"
                @keydown.esc="showMobileSearch = false" 
                role="search"
            >
                <GlobalSearchInput 
                    v-model="mobileSearchQuery"
                    id="mobile-search-input"
                    class="w-full" 
                />
                
                <button @click="showMobileSearch = false" aria-label="Lukk søkefelt" class="absolute top-1 right-1 text-gray-500 p-2" type="button">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="full-width">
            <nav v-if="menuOpen" 
                class="lg:hidden" 
                aria-label="Hovedmeny for mobil">
                <ul id="mobile-menu-list"  class="lg:hidden absolute top-full left-0 mt-0 w-full h-screen overflow-y-auto bg-primary text-white p-4 py-8 space-y-2 z-20">
                    <li><NavigationLink :to="{ name: 'produkter' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">våre sykler</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'tilbehor' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">tilbehør</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'teknisk-info' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">teknisk info</NavigationLink></li>
                    <li><NavigationLink to="https://drive.google.com/file/d/1D7xCyq6jugzo9ZH3GUnqjIYEF1-1Sux-/view" class="menu-item block p-1" @click="closeDropdownsAndMenu">produktkatalog</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'bruker' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">info bruker</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'terapeut' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">info terapeut</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'hvordan-soke-hjelpemidler' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">hvordan søke hjelpemidler</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'arrangementer' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">arrangementer</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'blogg' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">blogg</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'om-oss' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">om oss</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'kontakt-oss' }" class="menu-item block p-1" @click="closeDropdownsAndMenu">kontakt oss</NavigationLink></li>
                    <li><NavigationLink :to="{ name: 'bestill-provetime' }" class="menu-item block p-1 uppercase tracking-wide" @click="closeDropdownsAndMenu">bestill prøvetime</NavigationLink></li>
                </ul>
            </nav>
            
        </div>
    </header>
</template>

<script setup>
    import { ref, computed, watch, nextTick } from 'vue';
    import { useRoute } from 'vue-router';
    import AnniversaryBanner from '../common/AnniversaryBanner.vue';
    import GlobalSearchInput from './GlobalSearchInput.vue';

    const menuOpen = ref(false);
    const desktopSearchQuery = ref('');
    const mobileSearchQuery = ref(''); 
    const showMobileSearch = ref(false);
    const route = useRoute();
    const isHomepage = computed(() => route.name === 'hjem');

    const isProdukterOpen = ref(false);
    const isInfoOpen = ref(false);
    const isAboutOpen = ref(false);

    const openDropdown = (menu) => {
        if (typeof showMobileSearch !== 'undefined' && showMobileSearch.value) { 
            showMobileSearch.value = false; 
        }
        if (typeof menuOpen !== 'undefined' && menuOpen.value) {
            menuOpen.value = false;
        }

        if (menu === 'produkter') {
            isProdukterOpen.value = true;
            isInfoOpen.value = false;
            isAboutOpen.value = false; 
        } else if (menu === 'info') {
            isInfoOpen.value = true;
            isProdukterOpen.value = false; 
            isAboutOpen.value = false; 
        } else if (menu === 'about') { 
            isAboutOpen.value = true;
            isProdukterOpen.value = false; 
            isInfoOpen.value = false; 
        }
    };

    const closeDropdown = (menu) => {
        if (menu === 'produkter') {
            isProdukterOpen.value = false;
        } else if (menu === 'info') {
            isInfoOpen.value = false; 
        } else if (menu === 'about') { 
            isAboutOpen.value = false;
        }
    };

    const toggleDropdown = (menu) => {
        if (typeof showMobileSearch !== 'undefined' && showMobileSearch.value) {
            showMobileSearch.value = false;
        }
        if (typeof menuOpen !== 'undefined' && menuOpen.value) {
            menuOpen.value = false;
        }

        if (menu === 'produkter') {
            isProdukterOpen.value = !isProdukterOpen.value; 
            isInfoOpen.value = false; 
            isAboutOpen.value = false;
        } else if (menu === 'info') {
            isInfoOpen.value = !isInfoOpen.value; 
            isProdukterOpen.value = false;
            isAboutOpen.value = false;
        } else if (menu === 'about') { 
            isAboutOpen.value = !isAboutOpen.value; 
            isProdukterOpen.value = false;
            isInfoOpen.value = false;
        }
    };

    const closeDropdownsAndMenu = () => {
        isProdukterOpen.value = false;
        isInfoOpen.value = false;
        isAboutOpen.value = false; 
        menuOpen.value = false; 
        if (typeof showMobileSearch !== 'undefined') {
            showMobileSearch.value = false; 
        }
    };

    watch(menuOpen, (isOpen) => {
        if (isOpen && showMobileSearch.value) {
            showMobileSearch.value = false;
        }
    });

    watch(showMobileSearch, (isSearchNowOpen) => {
        if (isSearchNowOpen) {
            if (menuOpen.value) {
                menuOpen.value = false;
            }
            nextTick(() => {
                const searchInput = document.getElementById('mobile-search-input');
                searchInput?.focus();
            });
        } else {
            mobileSearchQuery.value = '';
        }
    });

    watch(() => route.fullPath, () => {
        if (showMobileSearch.value) {
            showMobileSearch.value = false;
        }
    });
</script>

<style scoped>

    .menu-item {
        text-decoration: none;
        padding: 0.5rem 0.1rem 0.25rem; 
        border-bottom: 1px solid transparent;
        transition: border-color 0.2s ease-in-out;
    }

    .menu-item.router-link-exact-active {
        border-bottom-color: #b91c1c; 
        text-decoration: none;
    }
    .menu-item.router-link-exact-active:hover {
        text-decoration: none;
        border-bottom-color: #b91c1c;
    }

    .menu-item:hover {
        border-bottom-color: #b91c1c; 
    }

    .dropdown-fade-enter-active,
    .dropdown-fade-leave-active {
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .dropdown-fade-enter-from,
    .dropdown-fade-leave-to {
        opacity: 0;
        transform: translateY(-5px) scale(0.95);
    }
    .dropdown-fade-enter-to,
    .dropdown-fade-leave-from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    @keyframes scale-up-down {
        0% { transform: scale(1); }
        50% { transform: scale(1.18); }
        100% { transform: scale(1); }
    }

    .animate-scale-up-down {
        animation: scale-up-down 4s ease-in-out infinite;
    }
</style>