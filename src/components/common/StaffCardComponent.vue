<template>
    <div :id="id" class="rounded-lg border border-gray-200 dark:border-gray-800 text-center transition-shadow duration-300 hover:shadow-lg flex flex-col">
        <div class="aspect-square bg-gray-100 dark:bg-gray-900 rounded-t-lg flex items-center justify-center overflow-hidden">
            <img v-if="staff.photo" :src="staff.photo" :alt="staff.name" class="w-full h-full object-cover" loading="lazy">
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div class="p-5 flex flex-col flex-1">
            <span class="hidden">{{ staff.id }}</span>
            <HeadingElement :level="4">{{ staff.name }}</HeadingElement>
            <p v-if="staff.position" class="font-medium text-sm mb-3">{{ staff.position }}</p>
            <p v-if="staff.districtNames" class="mb-3 text-xs text-gray-500 dark:text-gray-500 italic">
                Distrikt: {{ staff.districtNames }}
            </p>
            <div class="space-y-1 text-sm mt-auto pt-3">
                <p v-if="staff.email">
                    <a :href="`mailto:${staff.email}`" class="hover:text-gray-900 dark:hover:text-gray-300 hover:underline break-all">{{ staff.email }}</a>
                </p>
                <p v-if="staff.number">
                    <a :href="`tel:${staff.number.replace(/\s/g, '')}`" class="hover:text-gray-900 dark:hover:text-gray-300 hover:underline">{{ staff.number }}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        staff: {
            type: Object,
            required: true,
        },
        id: { 
            type: String,
            required: true
        }
    });
</script>