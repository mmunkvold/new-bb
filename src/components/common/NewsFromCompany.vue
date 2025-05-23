<template>
        <p v-if="isLoading" class="flex justify-center items-center">Laster...</p>
  
        <div v-else class="relative flex flex-col h-full">
            <div v-if="latestNews.length > 0" >
                <p class="text-xs text-primary dark:text-red-500 font-semibold uppercase tracking-wider ml-5 pt-2">Nytt fra Quality Care</p>
                <div v-for="(item, id) in latestNews" :key="id" class="p-5 flex flex-col flex-1">
                    <img :src="item.image" :alt="item.imageAlt" class="mb-5 h-40 object-contain self-center" />
                    <HeadingElement :level="3" class="!text-xl text-center">{{ item.title }}</HeadingElement>
                    <p class="my-1 text-xs text-center dark:text-gray-300">01.04.2005-{{ formatDate(item.dateObj) }}</p>
                    <p class="text-sm mb-4 line-clamp-4 dark:text-gray-300">{{ item.info }}</p>
                    <div class="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-300">
                        <time :datetime="item.dateObj.toISOString().split('T')[0]">
                        {{ formatDateFancy(item.dateObj) }}
                        </time>
                        <NavigationLink :to="item.url" class="inline-block text-primary dark:text-red-500 font-bold dark:font-normal">
                            Les mer
                        </NavigationLink>
                    </div>
                </div>
            </div>

            <p v-else>Ingen nyheter tilgjengelig akkurat nå.</p>

            <!-- legg til når det er flere nyheter -->
        <!-- <NavigationLink to="/nyheter" class="text-yellow-500 font-bold mt-6 block">Les flere nyheter</NavigationLink> -->
    </div>
    
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const latestNews = ref([]);
    const isLoading = ref(true);

    const formatDate = (dateObj) => {
        if (!(dateObj instanceof Date) || isNaN(dateObj)) {
            return "Ugyldig dato";
        }
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const formatDateFancy = (dateObj) => {
        if (!(dateObj instanceof Date) || isNaN(dateObj)) {
            return "Ugyldig dato"
        }

        return dateObj.toLocaleDateString('no-NO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const fetchLatestNews = async () => {
        const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID_NEWS;
        const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv&cb=${Date.now()}`;
        isLoading.value = true;
        latestNews.value = [];

        try {
            const response = await fetch(url);
            if (!response.ok) { 
                throw new Error(`Nettverksfeil: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            const rows = text.trim().split('\n').slice(1);

            const mappedNews = rows.map((row, index) => {
                const cols = row.split(',');

                let parsedDate = null;
                let dateParseError = null;
                const dateColIndex = 7;
                const rawDateStr = cols[dateColIndex]?.trim() || '';

                if (rawDateStr !== '') {
                    try {
                        const parts = rawDateStr.split('.');
                        if (parts.length === 3) {
                            const year = parseInt(parts[2], 10);
                            const monthIndex = parseInt(parts[1], 10) - 1;
                            const day = parseInt(parts[0], 10);
                            parsedDate = new Date(year, monthIndex, day);
                            if (isNaN(parsedDate.getTime()) || parsedDate.getFullYear() !== year || parsedDate.getMonth() !== monthIndex || parsedDate.getDate() !== day) {
                                dateParseError = 'Ugyldig dato etter konstruksjon';
                                parsedDate = null;
                            }
                        } else {
                            dateParseError = `Uventet antall deler (${parts.length}) for dato`;
                            parsedDate = null;
                        }
                    } catch (e) {
                        dateParseError = e.message;
                        parsedDate = null;
                    }
                } else {
                    dateParseError = 'Tom datostreng';
                    parsedDate = null;
                }
                if(dateParseError && rawDateStr) {
                    console.warn(`Rad ${index + 2}: ${dateParseError} for datostreng '${rawDateStr}'`);
                } else if (dateParseError && !rawDateStr && dateColIndex < cols.length) {
                    console.warn(`Rad ${index + 2}: Manglende dato (kolonne ${dateColIndex + 1}).`);
                }

                const title = cols[1]?.trim() || '';
                const imageSrc = cols[2]?.trim() || "/placeholder.png";
                const imageAltText = cols[3]?.trim() || `Nyhetsbilde for ${title || 'en nyhet'}`;

                return {
                    id: cols[0]?.trim() || String(index + 1), 
                    title: title,
                    image: imageSrc,
                    imageAlt: imageAltText,
                    info: cols[4]?.trim() || '',
                    infoPart2: cols[5]?.trim() || '',
                    url: cols[6]?.trim() || '',
                    dateObj: parsedDate,
                    _isValidDateForFilter: parsedDate instanceof Date && !isNaN(parsedDate?.getTime())
                };
            });

            const allNews = mappedNews.filter(item => item._isValidDateForFilter && item.title && item.image && item.info && item.url); // Litt strengere filter her
            allNews.sort((a, b) => b.dateObj - a.dateObj);
            const latestItem = allNews.length > 0 ? allNews[0] : null;

            let displayItem = [];
            if (latestItem) {
                const { id, title, image, info, dateObj, url } = latestItem;
                if (id && title && image && info && dateObj && url) {
                    displayItem = [latestItem];
                } else {
                    console.warn("Nyeste nyhet (etter datofilter og validering) mangler kjernefelt. Vises ikke.", latestItem);
                }
            }
            latestNews.value = displayItem;

        } catch (error) {
            console.error('Feil ved henting av nyhetsdata:', error);
            latestNews.value = []; 
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchLatestNews);
</script>