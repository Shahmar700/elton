<template>
  <div>
    <component 
      :is="currentComponent" 
      v-if="currentComponent" 
      :key="componentKey"
    />
    <div v-else class="not-found-container">
      <h1>{{ $t('error.pageNotFound') || 'Səhifə tapılmadı' }}</h1>
      <p>{{ $t('error.pageNotFoundDesc') || 'Axtardığınız səhifə mövcud deyil.' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePageStore } from '~/stores/usePageStore'
import { storeToRefs } from 'pinia'

// Komponentləri asinxron yükləyərək ilkin paket həcmini azaldın
const IndexPage = defineAsyncComponent({
  loader: () => import('~/pages/index.vue'),
  loadingComponent: null,
  delay: 0,
  timeout: 3000
})
const MarkalarPage = defineAsyncComponent({
  loader: () => import('~/pages/markalar.vue'),
  loadingComponent: null,
  delay: 0,
  timeout: 3000
})
const HizmetlerPage = defineAsyncComponent({
  loader: () => import('~/pages/hizmetler.vue'),
  loadingComponent: null,
  delay: 0,
  timeout: 3000
})
const IletisimPage = defineAsyncComponent({
  loader: () => import('~/pages/iletisim.vue'),
  loadingComponent: null,
  delay: 0,
  timeout: 3000
})
const SSSPage = defineAsyncComponent({
  loader: () => import('~/pages/sik-sorulan-sorular.vue'),
  loadingComponent: null,
  delay: 0,
  timeout: 3000
})

const route = useRoute()
const { locale, t } = useI18n()
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

// Komponent cache-i və key-i
const componentCache = new Map()
const componentKey = ref(0)
const currentPageId = ref(null)

// Slug-dan pageId tapın - memoized
const getPageId = (path) => {
  // URL-dən cari slug-u təmiz şəkildə alın və decode et
  const currentSlug = decodeURIComponent(path.replace(/^\/(en|ru)/, '').replace(/^\//, ''))

  // Ana səhifənin slug-u boş olur
  if (currentSlug === '' || path === '/en' || path === '/ru') {
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
}

// Page ID-yə görə component seçin - memoized
const getComponentByPageId = (pageId) => {
  if (componentCache.has(pageId)) {
    return componentCache.get(pageId)
  }

  let component = null
  switch (pageId) {
    case 3: 
      component = IndexPage
      break
    case 4: 
      component = MarkalarPage
      break
    case 5: 
      component = HizmetlerPage
      break
    case 7: 
      component = IletisimPage
      break
    case 6: 
      component = SSSPage
      break
    default: 
      component = null
  }

  componentCache.set(pageId, component)
  return component
}

// Cari komponenti hesabla
const currentComponent = computed(() => {
  const pageId = getPageId(route.path)
  
  // Əgər page ID dəyişibsə, key-i yenilə
  if (pageId !== currentPageId.value) {
    currentPageId.value = pageId
    componentKey.value++
  }
  
  return getComponentByPageId(pageId)
})

// Component key-i locale dəyişikliyi üçün də yenilə
watch(locale, () => {
  componentKey.value++
}, { flush: 'post' })

// Route dəyişikliklərini izlə
watch(
  () => route.path,
  () => {
    // Route dəyişdikdə key-i yenilə
    componentKey.value++
  },
  { immediate: false, flush: 'post' }
)

// SEO və meta məlumatları
useHead(computed(() => {
  const pageId = getPageId(route.path)
  
  if (!pageId || !pages.value?.results) {
    return { title: t('error.pageNotFound') }
  }
  
  const page = pages.value.results.find(p => p.id === pageId)
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
