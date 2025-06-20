import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state: () => ({
    pages: null,
    pageContents: null,
    pageImages: null,
    error: null,
    DEFAULT_LANG: 'tr',
    // Dil mapping - frontend dili -> backend dili
    LANG_MAPPING: {
      'tr': 'az',  // Frontend-də 'tr' istəyirkən backend-də 'az' axtarırıq
      'en': 'en',
      'ru': 'ru'
    }
  }),

  actions: {    // API çağırışları
    async fetchAllData() {
      this.error = null
      
      try {
        const [pages, pageContents, pageImages] = await Promise.all([
          $fetch('https://ets.200soft.com/api/admin/v1/page/'),
          $fetch('https://ets.200soft.com/api/admin/v1/page-content/'),
          $fetch('https://ets.200soft.com/api/admin/v1/page-image/')
        ])
        
        this.pages = pages
        this.pageContents = pageContents
        this.pageImages = pageImages
        
      } catch (error) {
        this.error = error.message
        console.error('API çağırışında xəta:', error)
        throw error
      }
    },    // Səhifə ID-sini slug əsasında tapır
    getPageIdBySlug(slug) {
      if (!this.pages?.results) return null
      
      // İndex səhifəsi üçün həmişə page_id = 1
      if (slug === 'index') return 1
      
      // Frontend dilini backend dilinə çevirik
      const backendLang = this.LANG_MAPPING[this.DEFAULT_LANG] || this.DEFAULT_LANG
      
      const page = this.pages.results.find(page => {
        return page.translations?.[backendLang]?.slug === slug && page.is_active
      })
      
      return page?.id || null
    },    // Səhifə məlumatlarını təşkil edir
    getPageData(pageSlug, language = 'tr') {
      const pageId = this.getPageIdBySlug(pageSlug)
      
      if (!pageId || !this.pageContents?.results) {
        return {
          content: {},
          images: [],
          mainImage: null
        }
      }

      // Frontend dilini backend dilinə çevirik
      const backendLang = this.LANG_MAPPING[language] || language
      const fallbackLang = this.LANG_MAPPING[this.DEFAULT_LANG] || this.DEFAULT_LANG


      // Səhifə məzmununu filtrlə
      const contents = this.pageContents.results.filter(item => 
        item.page === pageId && item.is_active
      )

      // Məzmunu təşkil et
      const organizedContent = {}
      let mainImage = null

      contents.forEach(item => {
        // Əvvəl tələb olunan dildə axtarırıq, sonra fallback dilə keçirik
        const translation = item.translations?.[backendLang] || 
                          item.translations?.[fallbackLang]
        
        console.log(`📄 Item translation tapıldı:`, {
          requestedLang: backendLang,
          fallbackLang: fallbackLang,
          availableLangs: Object.keys(item.translations || {}),
          foundTranslation: !!translation
        })
        
        if (translation?.title && translation?.description) {
          organizedContent[translation.title] = translation.description
        }

        // Ana şəkil (order = 1 olan)
        if (item.icon && item.order === 1) {
          mainImage = item.icon
        }
      })

      // Səhifə şəkillərini əlavə et
      const pageImages = this.getPageImages(pageId)

      console.log(`✅ Nəticə:`, {
        contentKeys: Object.keys(organizedContent),
        imagesCount: pageImages.length,
        hasMainImage: !!mainImage
      })

      return {
        content: organizedContent,
        images: pageImages,
        mainImage: mainImage
      }
    },

    // Səhifə şəkillərini gətirir
    getPageImages(pageId) {
      if (!this.pageImages?.results) return []
      
      return this.pageImages.results
        .filter(img => img.page === pageId)
        .map(img => img.image)
        .filter(Boolean)
    }
  },
  getters: {
    // Index səhifəsi məlumatları
    indexPageData: (state) => (language = 'tr') => {
      return state.getPageData('index', language)
    }
  }
})