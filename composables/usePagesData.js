import { usePageStore } from '~/stores/usePageStore'
import { storeToRefs } from 'pinia'

export function usePagesData() {
  const pageStore = usePageStore()
  
  // API məlumatlarını yükləyir
  const loadData = async () => {
    await pageStore.fetchAllData()
  }
  
  // Səhifə məlumatlarını qaytarır
  const getPageData = (slug, language = 'tr') => {
    return pageStore.getPageData(slug, language)
  }
  
  return {
    // Store state
    ...storeToRefs(pageStore),
    
    // Methods
    loadData,
    getPageData,
    
    // Store actions
    fetchAllData: pageStore.fetchAllData,
    getPageIdBySlug: pageStore.getPageIdBySlug,
    getPageImages: pageStore.getPageImages
  }
}