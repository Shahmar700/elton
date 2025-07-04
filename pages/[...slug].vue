<template>
  <div>
    <!-- Dinamik komponent render etmək üçün -->
    <component :is="pageComponent" v-if="pageComponent" />
    <div v-else>
      <h1>{{ $t('error.pageNotFound') || 'Səhifə tapılmadı' }}</h1>
      <p>{{ $t('error.pageNotFoundDesc') || 'Axtardığınız səhifə mövcud deyil.' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePagesData } from '~/composables/usePagesData'
import { usePageStore } from '~/stores/usePageStore'

// Import page components
import IndexPage from '~/pages/index.vue'
import MarkalarPage from '~/pages/markalar.vue'
import HizmetlerPage from '~/pages/hizmetler.vue'
import IletisimPage from '~/pages/iletisim.vue'
import SSSPage from '~/pages/sik-sorulan-sorular.vue'

const route = useRoute()
const { locale } = useI18n()
const { pages } = usePagesData()
const pageStore = usePageStore()

// Slug-dan pageId tapın
const pageId = computed(() => {
  const fullPath = route.path
  const currentSlug = route.params.slug?.[0] || fullPath.replace(/^\/[a-z]{2}\//, '').replace(/^\//, '')
  
  if (!pages.value?.results || !currentSlug) return null
  
  const backendLang = pageStore.LANG_MAPPING[locale.value] || locale.value
  
  // API-dən gələn səhifələr arasında uyğun slug-u tapın
  const foundPage = pages.value.results.find(page => {
    const translation = page.translations[backendLang]
    return translation && translation.slug === currentSlug
  })
  
  // Əgər hazırki dildə tapılmazsa, digər dillərdə yoxla
  if (!foundPage) {
    const foundPageAnyLang = pages.value.results.find(page => {
      return Object.values(page.translations).some(translation => 
        translation.slug === currentSlug
      )
    })
    return foundPageAnyLang?.id || null
  }
  
  return foundPage?.id || null
})

// Page ID-yə görə component seçin
const pageComponent = computed(() => {
  switch (pageId.value) {
    case 3:
      return IndexPage
    case 4:
      return MarkalarPage
    case 5:
      return HizmetlerPage
    case 6:
      return IletisimPage
    case 7:
      return SSSPage
    default:
      return null
  }
})

// SEO və meta məlumatları
useHead({
  title: computed(() => {
    if (!pageId.value || !pages.value?.results) return 'Elton Teknik Servis'
    
    const backendLang = pageStore.LANG_MAPPING[locale.value] || locale.value
    const foundPage = pages.value.results.find(page => page.id === pageId.value)
    
    if (foundPage && foundPage.translations[backendLang]) {
      return foundPage.translations[backendLang].name + ' - Elton Teknik Servis'
    }
    
    return 'Elton Teknik Servis'
  })
})
</script>
