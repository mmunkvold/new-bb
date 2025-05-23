<template>
    <div class="flex flex-col py-28 px-10 marker tracking-wider text-gray-700 dark:text-gray-200">
        <HeadingElement :level="3" class="!text-xl text-center -rotate-1 dark:!text-gray-200">Følg oss på sosiale media!</HeadingElement>
        <p class="text-center">Se nyeste innlegg, finn nyttige videoer og ikke gå glipp av arrangementer og aktiviteter!</p>
        <div class="mt-7 justify-center flex gap-10 text-2xl">
            <NavigationLink to="https://www.facebook.com/QualityCareAS/" ><FBIcon aria-label="facebook" /></NavigationLink>
            <NavigationLink to="https://www.instagram.com/qualitycareas/" ><InstagramIcon aria-label="instagram" /></NavigationLink>
            <NavigationLink to="https://www.youtube.com/user/ASQualityCare/videos" ><YouTubeIcon aria-label="youtube" /></NavigationLink>    
        </div>   
    </div>
</template>

<script setup>
</script>

