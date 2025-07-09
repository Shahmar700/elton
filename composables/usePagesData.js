import { usePageStore } from '~/stores/usePageStore'
import { storeToRefs } from 'pinia'

export function usePagesData() {
  const pageStore = usePageStore()
  
  // API məlumatlarını yükləyir
  const loadData = async () => {
    await pageStore.fetchAllData()
  }
  
  // Səhifə məlumatlarını qaytarır
  const getPageData = (pageId, language = 'tr') => {
    const backendLang = pageStore.LANG_MAPPING[language] || language
    
    if (!pageStore.pages?.results || !pageStore.pageContents?.results) {
      return { content: {}, images: [], mainImage: null }
    }

    // Səhifə ID-sinə görə page-content məlumatlarını filtrə edirik
    const pageContents = pageStore.pageContents.results.filter(content => 
      content.page === pageId && content.is_active
    )

    // Content obyektini yaradırıq
    const content = {}
    let mainImage = null
    
    pageContents.forEach(item => {
      const translation = item.translations[backendLang]
      if (translation) {
        content[item.name] = translation.content
      }

      // Əgər elementin `icon`u varsa, onu `content` obyektinə əlavə edirik.
      // Bu, məzmunu boş olan, ancaq ikona malik elementlər üçün (məsələn, developmentIcon) lazımdır.
      if (item.icon) {
        content[item.name] = item.icon
      }

      // Əgər tərcümədə məzmun varsa, onu `content` obyektinə əlavə edirik.
      // Bu, `icon`u olan elementin məzmununu (əgər varsa) yazacaq,
      // ancaq adətən ikon elementlərinin məzmunu boş olur.
      if (translation && translation.content) {
        content[item.name] = translation.content
      }
      
      // Ana şəkil (order = 1 olan Welcome item-indən)
      if (item.name === 'Welcome' && item.icon) {
        mainImage = item.icon
      }
    })

    // Səhifə şəkillərini alırıq
    const images = pageStore.getPageImages(pageId)
    
    return { content, images, mainImage }
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