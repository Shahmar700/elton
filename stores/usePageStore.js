import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {  state: () => ({
    pages: null,
    pageContent: null,
    pageImage: null,
    DEFAULT_LANG: 'tr', // Nuxt config-də default locale tr-dir
  }),  actions: {    async fetchPages() {
      this.pages = await $fetch('https://ets.200soft.com/api/admin/v1/page/')
      return this.pages
    },

    async fetchPageContent() {
      this.pageContent = await $fetch('https://ets.200soft.com/api/admin/v1/page-content/')
      return this.pageContent
    },

    async fetchPageImage() {
      this.pageImage = await $fetch('https://ets.200soft.com/api/admin/v1/page-image/')
      return this.pageImage
    },getPageIdBySlug(slug, currentLang) {
      if (!this.pages?.results) return null
      
      const page = this.pages.results.find(page => {
        const translation = page.translations?.[currentLang]
        if (!translation) {
          const defaultTranslation = page.translations?.[this.DEFAULT_LANG]
          return defaultTranslation?.slug === slug && page.is_active
        }
        return translation.slug === slug && page.is_active
      })
      },    getPageData(slug, langKey) {
      console.log('🔍 getPageData çağırıldı:', { slug, langKey })
      console.log('🔍 pages.results mövcudluğu:', !!this.pages?.results)
      console.log('🔍 pageContent.results mövcudluğu:', !!this.pageContent?.results)
      console.log('🔍 pageImage.results mövcudluğu:', !!this.pageImage?.results)
      
      // Əgər slug ilə tapılmasa, direkt page id ilə yoxlayaq
      let pageId = this.getPageIdBySlug(slug, this.DEFAULT_LANG)
      
      // Slug ilə tapılmadıqda, index səhifəsi üçün page id = 1 istifadə edək
      if (!pageId && slug === 'index') {
        pageId = 1
        console.log('✅ Index səhifəsi üçün page_id=1 istifadə edilir')
      }
      
      console.log('📌 Tapılan pageId:', pageId)
      console.log('📌 pageContent mövcudluğu:', !!this.pageContent?.results)
      console.log('📌 pageImage mövcudluğu:', !!this.pageImage?.results)
      
      if (!pageId || !this.pageContent?.results) {
        console.log('❌ PageId və ya pageContent yoxdur')
        return null
      }
      
      const pageContents = this.pageContent.results.filter(p => p.page === pageId)
      console.log('📋 Filterlənmiş page contents:', pageContents.length, 'ədəd')
      
      if (!pageContents.length) {
        console.log('❌ Bu page_id üçün content tapılmadı')
        return null
      }      
      // Yeni API strukturuna uyğun olaraq məlumatları təşkil edirik
      const organizedData = {}
      const partImages = []
      
      console.log('🔄 Page contents emal edilir...')
      
      pageContents.forEach((item, index) => {
        console.log(`📄 Item ${index + 1}:`, {
          id: item.id,
          order: item.order,
          hasIcon: !!item.icon,
          iconUrl: item.icon,
          translations: Object.keys(item.translations || {})
        })
        
        const translation = item.translations?.[langKey] || item.translations?.[this.DEFAULT_LANG]
        console.log(`🌐 Seçilən translation (${langKey} || ${this.DEFAULT_LANG}):`, translation)
        
        if (translation?.title) {
          // Hər title üçün description-u organizedData-ya əlavə edirik
          organizedData[translation.title] = translation.description
          console.log(`✅ Əlavə edildi: "${translation.title}" = "${translation.description?.substring(0, 50)}..."`)
        } else {
          console.log(`❌ Title tapılmadı item ${index + 1} üçün`)
        }
        
        // Content-dən gələn icon-lu şəkillər (order 1 olan main şəkil)
        if (item.icon && item.order === 1) {
          organizedData.mainImage = item.icon
          console.log('🖼️ Main image əlavə edildi:', item.icon)
        }
      })      
      // Page Images API-dan part şəkillərini əlavə edək
      if (this.pageImage?.results) {
        const pageImages = this.pageImage.results.filter(img => img.page === pageId)
        console.log('🖼️ Page images tapıldı:', pageImages.length, 'ədəd')
        
        pageImages.forEach((img, index) => {
          console.log(`🖼️ Page Image ${index + 1}:`, {
            id: img.id,
            hasImage: !!img.image,
            imageUrl: img.image
          })
          
          if (img.image) {
            partImages.push({
              icon: img.image,
              order: img.id,
              altText: img.translations?.[langKey]?.alt_text || 
                      img.translations?.[this.DEFAULT_LANG]?.alt_text || ''
            })
            console.log(`✅ Part image əlavə edildi: ${img.image}`)
          }
        })
      } else {
        console.log('❌ pageImage.results mövcud deyil')
      }
      
      // Part şəkillərini order-ə görə sıralayırıq
      partImages.sort((a, b) => a.order - b.order)
      
      const result = {
        pageId,
        data: organizedData,
        partImages: partImages.map(img => img.icon),
        rawContents: pageContents,
        created_at: pageContents[0].created_at,
      }
      
      console.log('🎯 SON NƏTİCƏ:', {
        pageId: result.pageId,
        dataKeys: Object.keys(result.data),
        organizedData: result.data,
        partImagesCount: result.partImages.length,
        partImages: result.partImages
      })
      
      return result
    },
    getPageImage(slug, langKey) {
      const pageId = this.getPageIdBySlug(slug, this.DEFAULT_LANG)
      if (!pageId || !this.pageImage?.results) return null
      const images = this.pageImage.results.filter(img => img.page === pageId)
      if (!images.length) return null
      return images.map(item => ({
        id: item.id,
        image: item.image,
        altText: item.translations?.[langKey]?.alt_text ||
          item.translations?.[this.DEFAULT_LANG]?.alt_text || '',
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }))
    },
    getPageActiveState(slug) {
      const pageId = this.getPageIdBySlug(slug, this.DEFAULT_LANG)
      if (!pageId || !this.pages?.results) return false
      const page = this.pages.results.find(p => p.id === pageId)
      return page?.is_active || false
    }
  }
})