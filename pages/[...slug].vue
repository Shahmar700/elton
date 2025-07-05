<template>
  <div>
    <!-- Komponent varsa göstər, yoxdursa xəta mesajı ver -->
    <component :is="pageComponent" v-if="pageComponent" />
    <div v-else class="not-found-container">
      <h1>{{ $t('error.pageNotFound') || 'Səhifə tapılmadı' }}</h1>
      <p>{{ $t('error.pageNotFoundDesc') || 'Axtardığınız səhifə mövcud deyil.' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePageStore } from '~/stores/usePageStore'
import { storeToRefs } from 'pinia'

// Komponentləri asinxron yükləyərək ilkin paket həcmini azaldın
const IndexPage = defineAsyncComponent(() => import('~/pages/index.vue'))
const MarkalarPage = defineAsyncComponent(() => import('~/pages/markalar.vue'))
const HizmetlerPage = defineAsyncComponent(() => import('~/pages/hizmetler.vue'))
const IletisimPage = defineAsyncComponent(() => import('~/pages/iletisim.vue'))
const SSSPage = defineAsyncComponent(() => import('~/pages/sik-sorulan-sorular.vue'))

const route = useRoute()
const { locale, t } = useI18n()
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

// Slug-dan pageId tapın
const pageId = computed(() => {
  const fullPath = route.path
  // URL-dən cari slug-u təmiz şəkildə alın
  const currentSlug = fullPath.replace(/^\/(en|ru)/, '').replace(/^\//, '')

  // Ana səhifənin slug-u boş olur
  if (currentSlug === '' || fullPath === '/en' || fullPath === '/ru') {
      return 3 // Ana səhifənin ID-si
  }

  if (!pages.value?.results) {
    return null
  }
  
  // API-dən gələn səhifələr arasında uyğun slug-u tapın
  const foundPage = pages.value.results.find(page => 
    Object.values(page.translations).some(t => t.slug === currentSlug)
  )
  
  return foundPage?.id || null
})

// Page ID-yə görə component seçin
const pageComponent = computed(() => {
  switch (pageId.value) {
    case 3: return IndexPage
    case 4: return MarkalarPage
    case 5: return HizmetlerPage
    case 6: return IletisimPage
    case 7: return SSSPage
    default: return null
  }
})

// SEO və meta məlumatları
useHead(computed(() => {
  if (!pageId.value || !pages.value?.results) {
    return { title: t('error.pageNotFound') }
  }
  
  const page = pages.value.results.find(p => p.id === pageId.value)
  if (!page) return { title: t('error.pageNotFound') }

  const backendLang = pageStore.LANG_MAPPING[locale.value] || locale.value
  const translation = page.translations[backendLang] || Object.values(page.translations)[0]

  return {
    title: translation.meta_title || page.name,
    meta: [
      { name: 'description', content: translation.meta_description },
      { name: 'keywords', content: translation.meta_keywords }
    ]
  }
}))
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;
}
.not-found-container h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
