import { ref, computed, onMounted } from "vue";

const parseCsvRow = (row) => {
    const result = [];
    let currentVal = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        const nextChar = row[i + 1];
        if (char === '"' && inQuotes && nextChar === '"') {
            currentVal += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(currentVal.trim());
            currentVal = '';
        } else {
            currentVal += char;
        }
    }
    result.push(currentVal.trim());
    return result;
};

const parseDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return null;
    const trimmedDateString = dateString.trim();
    const match = trimmedDateString.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (!match) return null;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year < 2000 || year > 2100 || month < 0 || month > 11 || day < 1 || day > 31) return null;
    try {
        const date = new Date(Date.UTC(year, month, day));
        if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day || isNaN(date.getTime())) return null;
        return date;
    } catch (e) { return null; }
};

const formatDateDay = (dateObj) => { if (!dateObj || isNaN(dateObj)) return '?'; return dateObj.getUTCDate(); };
const formatDateMonth = (dateObj) => { if (!dateObj || isNaN(dateObj)) return ''; return dateObj.toLocaleString('nb-NO', { month: 'short', timeZone: 'UTC' }).toUpperCase().replace('.', ''); };
const formatDateYear = (dateObj) => { if (!dateObj || isNaN(dateObj)) return ''; return dateObj.getUTCFullYear(); };
const isPast = (dateObj) => {
    if (!dateObj || isNaN(dateObj)) return false;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return dateObj.getTime() < today.getTime();
};

export const useActivities = () => {
    const allRawEvents = ref([]);
    const loading = ref(true);
    const errorState = ref(null);

    const fetchEvents = async () => {
        const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
        const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv&cb=${Date.now()}`;
        loading.value = true;
        allRawEvents.value = [];
        errorState.value = null; 
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Nettverksfeil ved henting av arrangementer: ${response.statusText}`);
            const text = await response.text();
            const rows = text.trim().replace(/\r\n/g, '\n').split('\n').slice(1);
            const parsedEvents = rows.map((row, index) => {
                if (!row) return null;
                const cols = parseCsvRow(row);
                const dateStr = cols[0]?.trim();
                const endDateStr = cols[1]?.trim();
                const location = cols[2]?.trim();
                const cityRegion = cols[3]?.trim();
                const time = cols[4]?.trim();
                const description = cols[5]?.trim();
                const moreInfoLink = cols[6]?.trim();
                const signupLink = cols[7]?.trim();
                const eventTypeRaw = cols[8]?.trim().toLowerCase() || '';

                const dateObj = parseDate(dateStr);
                const endDateObj = parseDate(endDateStr);
                if (!dateObj) return null;

                return {
                    id: index + 1,
                    dateString: dateStr || '',
                    endDateString: endDateStr || '',
                    location: location || '',
                    cityRegion: cityRegion || '',
                    time: time || '',
                    description: description || '',
                    moreInfoLink: moreInfoLink || '',
                    signupLink: signupLink || '',
                    eventType: eventTypeRaw,
                    dateObj: dateObj,
                    endDateObj: endDateObj,
                    month: dateObj.toLocaleString('nb-NO', { month: 'long', timeZone: 'UTC' })
                };
            }).filter(event => event !== null);
            allRawEvents.value = parsedEvents;
        } catch (error) {
            console.error("Feil ved henting av arrangementer i useActivities:", error);
            errorState.value = error.message || "En ukjent feil oppstod under lasting av arrangementer.";
            allRawEvents.value = [];
        } finally {
            loading.value = false;
        }
    };

    const allEvents = computed(() => {
        return [...allRawEvents.value].sort((a, b) => (a.dateObj?.getTime() ?? 0) - (b.dateObj?.getTime() ?? 0));
    });

    const upcomingEvents = computed(() => {
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const todayTimestamp = today.getTime();
        return allEvents.value.filter(event => {
            const eventTimestamp = event.dateObj?.getTime();
            return eventTimestamp !== undefined && eventTimestamp >= todayTimestamp;
        });
    });

    onMounted(fetchEvents);

    return {
        allEvents,
        upcomingEvents,
        loading,
        errorState,
        formatDateDay,
        formatDateMonth,
        formatDateYear,
        isPast,
        fetchEvents 
    };
};