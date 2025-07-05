<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { usePageStore } from '~/stores/usePageStore'

// Bütün tətbiq üçün lazım olan əsas məlumatları serverdə yükləyin.
// Bu, məlumatların client-side naviqasiyada dərhal əlçatan olmasını təmin edir.
const pageStore = usePageStore()

// `useAsyncData` ilə məlumatları yalnız ehtiyac olduqda (məsələn, serverdə və ya ilk yükləmədə) yükləyin.
// 'initial-data' unikal açardır.
await useAsyncData('initial-data', async () => {
  // Əgər store-da məlumat artıq varsa, yenidən yükləməyin.
  if (!pageStore.pages || !pageStore.pages.results || pageStore.pages.results.length === 0) {
    await pageStore.fetchAllData()
  }
  return true
}, {
  // Bu, client-side naviqasiya zamanı təkrar yükləmənin qarşısını alır.
  // Məlumatlar artıq store-da olacaq.
  server: true,
  lazy: false
})

// SEO üçün ümumi meta teqlər
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Elton Teknik Servis` : 'Elton Teknik Servis';
  },
  htmlAttrs: {
    lang: 'az' // Saytın standart dilini təyin edin
  },
  meta: [
    { name: 'description', content: 'Elton Teknik Servis: Kompüter, noutbuk, telefon və planşet təmiri üzrə peşəkar xidmət.' },
    { name: 'keywords', content: 'kompüter təmiri, noutbuk təmiri, telefon təmiri, planşet təmiri, texniki servis' }
  ]
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(4px);
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
</style>