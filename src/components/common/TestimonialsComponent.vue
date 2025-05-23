<template>
   <div class="">
        <HeadingElement :level="2" class="text-center">Hva sier kundene våre?</HeadingElement>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10"> 
            <ul v-for="(testimonial, index) in randomTestimonials" 
                :key="testimonial.id"
                class="[perspective:1000px] group" 
                tabindex="0" >
    
                <li class="relative h-50 w-full transition-transform duration-1500 ease-in-out [transform-style:preserve-3d] group-hover:rotate-y-180 group-focus-within:rotate-y-180" >
                    <div class="absolute inset-0 backface-hidden z-10">
                        <blockquote 
                            :class="[
                                'p-4 rounded-lg  flex flex-col h-full border-l-4 overflow-hidden', 
                                index === 0 ? 'bg-red-50 border-red-500 dark:bg-gray-900' : '',
                                index === 1 ? 'bg-yellow-50 border-yellow-500 dark:bg-gray-900' : '',
                                index === 2 ? 'bg-gray-100 border-gray-500 dark:bg-gray-900' : '' 
                            ]">
                            <span 
                                :class="[
                                    'absolute top-0 left-0 text-7xl -mt-3 ml-2 select-none font-serif',
                                    index === 0 ? 'text-red-500' : '',
                                    index === 1 ? 'text-yellow-500' : '', 
                                    index === 2 ? 'text-gray-500' : '' 
                                ]"
                                aria-hidden="true" >
                                &ldquo;
                            </span> 
            
                            <p class="font-serif italic mt-4  mb-4 flex-grow text-lg relative z-10">
                                <span class="relative z-10">"{{ testimonial.text }}"</span> 
                            </p>
                            
                            <footer class="text-sm mt-auto self-end relative z-10" >
                                - {{ testimonial.author }}
                            </footer>
                        </blockquote>
                    </div>

                    <div 
                        :class="[
                            'absolute inset-0 backface-hidden rotate-y-180 rounded-lg shadow-lg overflow-hidden', 
                            index === 0 ? 'bg-red-50' : '', 
                            index === 1 ? 'bg-yellow-50' : '',
                            index === 2 ? 'bg-gray-100' : ''
                        ]">
                    
                        <img 
                            :src="testimonial.image.src" 
                            :alt="testimonial.image.altText"
                            class="w-full h-full object-cover object-center" />
                    </div>
                </li>
            </ul> 
        </div>
        <div class="mt-10 text-center">
            <NavigationLink :to="{ name: 'blogg'}">Les flere tilbakemeldinger på bloggen vår</NavigationLink>
        </div>
    </div>    
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const testimonials = ref([]);
    const randomTestimonials = ref([]);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/data/testimonials.json');
            const data = await response.json();
            testimonials.value = data;

            randomTestimonials.value = getRandomTestimonials(data, 3);
        } catch (error) {
            console.error('Kunne ikke laste testimonials:', error);
        }
    };

    const getRandomTestimonials = (array, count) => {
        let shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    onMounted(fetchTestimonials);
</script>




