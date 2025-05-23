<template>
    <ul class="flex flex-wrap gap-2 sm:flex-row sm:items-center sm:space-x-3 text-sm">
        <li v-for="filter in processedFilters"
            :key="filter.key"
            class="list-none"
        >
            <button 
                :class="[
                    'px-3 py-1 flex items-center gap-1 tracking-[0.08rem] hover:bg-gray-400 hover:dark:bg-gray-700 hover:text-white hover:cursor-pointer text-xs',
                    filter.clicked ? 'rounded-full' : filter.isSpecial ? 'rounded px-3 py-1 h-fit shadow-lg hover:scale-[.95] hover:opacity-75' : 'rounded-full',
                    {
                        'bg-secondary dark:bg-yellow-600 text-white': isActive(filter.key) && filter.style?.active,
                        ' border-gray-500 ': !isActive(filter.key) && filter.style?.inactive,
                        'bg-secondary dark:bg-yellow-600 text-gray-950': isActive(filter.key) && !filter.style?.active,
                        ' border border-gray-500 ': !isActive(filter.key)
                    }
                ]"
                type="button"
                @click="handleSingleSelection(filter)"
            >
                {{ filter.label }} 
                <span v-if="filter.count !== undefined && filter.count >= 0" class="ml-1 opacity-75">({{ filter.count }})</span>
            </button>
        </li>
    </ul>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        filters: {
            type: Array,
            required: true
        },
        activeFilter: {
            validator: function (value) {
                return typeof value === 'string' || typeof value === 'number' || value === null;
            },     
            required: true
        }
    });

    const emit = defineEmits(['update:activeFilter']);

    const defaultProps = {
        style: { active: false, inactive: true },
        clicked: false,
        isSpecial: false
    };

    const buttonState = {};

    const processedFilters = computed(() => {
        return props.filters.map(filter => ({
            ...defaultProps,
            ...filter,
            clicked: buttonState[filter.key] || false
        }));
    });

    const handleSingleSelection = (filter) => {
        emit('update:activeFilter', filter.key);
        buttonState[filter.key] = true;
    };

    const isActive = (filterKey) => props.activeFilter === filterKey;
</script>
