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
    return titleChunk ? `${titleChunk}` : 'Elton Teknik Servis';
  },
  htmlAttrs: {
    lang: 'tr' // Saytın standart dilini təyin edin
  },
  meta: [
    { name: 'description', content: 'Elton Teknik Servis: Bilgisayar, telefon ve tablet tamiri konusunda uzman kadrosuyla hizmet vermektedir. 200soft ile işbirliği ile web sitesi geliştirme, ERP sistemleri, mobil uygulama geliştirme ve yazılım çözümleri sunuyoruz.' },
    { name: 'keywords', content: 'bilgisayar tamiri, laptop tamiri, telefon tamiri, tablet tamiri, teknik servis, bilgisayar servisi, telefon servisi, tablet servisi, ekran değişimi, batarya değişimi, yazılım sorunları, web sitesi geliştirme, ERP sistemleri, mobil uygulama, 200soft, yazılım çözümleri, web tasarım, mobil app geliştirme' },
    { name: 'author', content: 'Elton Teknik Servis' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Elton Teknik Servis' },
    { property: 'og:title', content: 'Elton Teknik Servis - Bilgisayar, Telefon ve Tablet Tamiri + Yazılım Çözümleri' },
    { property: 'og:description', content: 'Elton Teknik Servis: Bilgisayar, telefon ve tablet tamiri. 200soft ile işbirliği ile web sitesi geliştirme, ERP sistemleri ve mobil uygulama geliştirme hizmetleri.' },
    { property: 'og:locale', content: 'tr_TR' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Elton Teknik Servis - Bilgisayar, Telefon ve Tablet Tamiri + Yazılım Çözümleri' },
    { name: 'twitter:description', content: 'Elton Teknik Servis: Bilgisayar, telefon ve tablet tamiri. 200soft ile işbirliği ile web sitesi geliştirme, ERP sistemleri ve mobil uygulama geliştirme hizmetleri.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://eltonteknikservis.com' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
  filter: blur(2px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* Transition-in başlamazdan əvvəl elementin hazır olmasını təmin et */
.page-enter-active {
  transition-delay: 0.05s;
}

/* Transition-in bitdikdən sonra will-change-i təmizlə */
.page-enter-to {
  will-change: auto;
}
</style>