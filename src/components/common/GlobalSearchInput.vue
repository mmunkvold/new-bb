<template>
    <div class="relative">
        <label :for="inputId" class="sr-only">Søk på siden</label>
        <input
            type="search"
            :id="inputId"
            :value="props.modelValue || ''"
            placeholder="søk her..."
            @input="onSearchInput($event)"
            @focus="showResults = true"
            @blur="hideResultsWithDelay"
            :class="inputClasses"
            autocomplete="off"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
        </div>

        <div v-if="showResults && ((props.modelValue && props.modelValue.length > 1) || (isLoadingSearchData && props.modelValue))" :class="dropdownClasses">
            <div v-if="isLoadingSearchData && props.modelValue" 
                :class="['p-4 text-center', props.isHomepageVariant ? 'text-gray-500' : 'text-gray-500 dark:text-gray-400']">
                Laster søkeresultater...
            </div>
                <ul v-else-if="foundResults.length > 0">
                    <li v-for="(result, index) in foundResults" :key="result.type + result.title + index" 
                        :class="['last:border-b-0', props.isHomepageVariant ? 'border-b border-gray-200' : 'border-b border-gray-200 dark:border-gray-700']"
                    >
                        <NavigationLink 
                            :to="result.link" 
                            :target="result.isExternal ? '_blank' : undefined"
                            :rel="result.isExternal ? 'noopener noreferrer' : undefined"
                            @click="clearSearch"
                            :class="['block p-3', props.isHomepageVariant ? 'hover:bg-gray-200' : 'hover:bg-gray-200 dark:hover:bg-gray-700']"
                        >
                            <div :class="['font-semibold', props.isHomepageVariant ? 'text-primary' : 'text-primary dark:text-secondary']">
                                {{ result.type }}: {{ result.title }}
                            </div>
                            <p v-if="result.snippet" 
                                :class="['text-xs line-clamp-2', props.isHomepageVariant ? 'text-gray-600' : 'text-gray-600 dark:text-gray-400']">
                                {{ result.snippet }}</p>
                        </NavigationLink>
                    </li>
                </ul>
            <p v-else-if="props.modelValue && props.modelValue.length > 1 && !isLoadingSearchData"
                :class="['p-4 text-center', props.isHomepageVariant ? 'text-gray-500' : 'text-gray-500 dark:text-gray-400']">
                Ingen treff for "{{ props.modelValue }}". Prøv å spørre chat-boten.
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useSiteSearch } from '@/composables/useSiteSearch'; 
    
    const props = defineProps({
        modelValue: String, 
        isHomepageVariant: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: 'global-search'
        }
    });

    const emit = defineEmits(['update:modelValue']); 
    const route = useRoute();
    
    const foundResults = ref([]);
    const showResults = ref(false);
    const { search, isLoadingSearchData } = useSiteSearch();
    let debounceTimer = null;
    
    const onSearchInput = (e) => {
        const currentValue = e.target.value;
        emit('update:modelValue', currentValue);

        clearTimeout(debounceTimer);
        if (currentValue.trim().length > 1) {
            showResults.value = true; 
            debounceTimer = setTimeout(() => {
                foundResults.value = search(currentValue);
            }, 300); 
        } else {
            foundResults.value = [];
            if(currentValue.trim().length === 0) showResults.value = false;
        }
    };

    const clearSearch = () => {
        emit('update:modelValue', '');
        foundResults.value = [];
        showResults.value = false;
    };
    defineExpose({ clearSearch });

    const hideResultsWithDelay = () => {
        setTimeout(() => {
            showResults.value = false;
        }, 150); 
    };

    const inputClasses = computed(() => {
        const baseLayout = "w-full p-1 pl-10 text-sm rounded-full border"; 
        
        if (props.isHomepageVariant) {
            return `${baseLayout} bg-transparent text-gray-900 border-gray-400 placeholder-gray-500 focus:ring-primary focus:border-primary`;
        } else {
            return `${baseLayout} bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary dark:focus:border-primary-dark`;
        }
    });

    const dropdownClasses = computed(() => {
        const baseLayout = "absolute mt-1 w-full max-h-96 overflow-y-auto rounded-md shadow-lg border";
        if (props.isHomepageVariant) {
            return `${baseLayout} bg-gray-100 border-gray-300 text-gray-900`;
        } else {
            return `${baseLayout} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200`;
        }
    });

    const inputId = computed(() => props.id);

    watch(() => route.fullPath, (newPath, oldPath) => {
    if (newPath !== oldPath) { 
        if ((props.modelValue && props.modelValue.trim() !== '') || showResults.value) {
            clearSearch(); 
        }
    }
});
</script>