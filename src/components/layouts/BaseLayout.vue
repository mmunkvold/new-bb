<template>
    <a href="#main-content"
        id="skipLink"
        ref="skipLink"
        class="absolute left-[-999px] top-auto focus:outline-none focus:static focus:border focus:bg-gray-500 text-white px-1 invisible">
        Hopp til hovedinnhold
    </a>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400">
        <TheHeader />
            
        <main id="main-content" class="mt-4 mx-auto px-3 relative text-pretty">
            <RouterView />
        </main>

        <TotopButton />

        <TheFooter />
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import TheFooter from '../common/TheFooter.vue';
    import TheHeader from '../common/TheHeaderDropdown.vue';
    import TotopButton from '../buttons/TotopButton.vue';

    const route = useRoute();
    const skipLink = ref(null)

    watch(
        () => route.path,
        () => {
            skipLink.value.focus()
        }
    )

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.getElementById('skipLink').style.visibility = 'visible';
        }
    });

    document.addEventListener('mousedown', function() {
        document.getElementById('skipLink').style.visibility = 'hidden';
    });

</script>