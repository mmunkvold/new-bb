<template>
    <div>
        <button
            ref="triggerButton" @click="togglePopup"
            class="absolute right-0 top-4 lg:top-22 w-14 lg:w-16 h-14 lg:h-16 p-0 border-none bg-transparent cursor-pointer z-20 transition-transform hover:scale-110 " 
            aria-label="20 års jubileum" 
            title="20 års jubileum"
            aria-haspopup="dialog"
            aria-controls="info-popup"
            :aria-expanded="isPopupVisible.toString()"
            type="button"
        >
            <img
                src="@/assets/images/qc-logo-20.jpg"
                class="w-full h-full object-contain" 
                alt="20 års jubileumslogo" 
                aria-hidden="true" 
            />
        </button>
  
        <div
            v-show="isPopupVisible"
            id="info-popup"
            role="dialog" 
            aria-labelledby="popup-heading" 
            aria-describedby="popup-desc"
            class="absolute right-17 top-4 lg:top-22 w-64 bg-black text-white drop-shadow-lg transition-opacity duration-300 ease-in-out z-10"
            :class="isPopupVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            @click.self="closePopup" 
            @keydown.esc="closePopup"
            ref="popupRef"
        >
            <div class="relative p-2 lg:p-3 pl-3">
                <button
                    ref="closeButton" @click.stop="closePopup"
                    class="absolute top-1 right-1 p-1 text-gray-400 hover:text-white "
                    aria-label="Lukk"
                    title="Lukk"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p id="popup-heading" class="sr-only">20 års jubileum</p>
                <p id="popup-desc" class="text-sm tracking-wide">Norges fremste ekspert på spesialsykler siden 2005!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick } from 'vue';
    
    const isPopupVisible = ref(false);
    const triggerButton = ref(null); 
    const closeButton = ref(null);
    const popupRef = ref(null);
    
    const togglePopup = () => {
        isPopupVisible.value = !isPopupVisible.value;
    };
    
    const closePopup = () => {
        isPopupVisible.value = false;
    };
    
    watch(isPopupVisible, async (newValue) => {
        await nextTick();
    
        if (newValue) {
        closeButton.value?.focus(); 
        document.addEventListener('keydown', handleEsc);
        } else {
        triggerButton.value?.focus();
        document.removeEventListener('keydown', handleEsc);
        }
    });

    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    };
</script>