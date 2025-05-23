<template>
    <div class="relative w-full h-16">
        <div class="bike-container absolute bottom-0 left-0">
            <img src="@/assets/images/liggesykkel_m_person.png" alt="Rød strektegning av en liggesykkel med en person på" class="max-w-14 animate-bike text-icon-red">
        </div>
    </div>
</template>

<style scoped>
    @keyframes bikeRide {
        0% {
        transform: translateX(0);
        }
        100% {
        transform: translateX(100vw); 
        }
    }
    
    .animate-bike {
        animation: bikeRide 15s linear infinite;
    }
</style>
  