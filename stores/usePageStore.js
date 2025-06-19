import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state: () => ({
    pages: null,
    pageContent: null,
    pageImage: null,
    DEFAULT_LANG: 'az',
  }),
  actions: {
    async fetchPages() {
      this.pages = await $fetch('https://ets.200soft.com/api/admin/v1/page/')
    },
    async fetchPageContent() {
      this.pageContent = await $fetch('https://ets.200soft.com/api/admin/v1/page-content/')
    },
    async fetchPageImage() {
      this.pageImage = await $fetch('https://ets.200soft.com/api/admin/v1/page-image/')
    },
    getPageIdBySlug(slug, currentLang) {
      if (!this.pages?.results) return null
      const page = this.pages.results.find(page => {
        const translation = page.translations?.[currentLang]
        if (!translation) {
          const defaultTranslation = page.translations?.[this.DEFAULT_LANG]
          return defaultTranslation?.slug === slug && page.is_active
        }
        return translation.slug === slug && page.is_active
      })
      return page?.id
    },
    getPageData(slug, langKey) {
      const pageId = this.getPageIdBySlug(slug, this.DEFAULT_LANG)
      if (!pageId || !this.pageContent?.results) return null
      const pageContents = this.pageContent.results.filter(p => p.page === pageId)
      if (!pageContents.length) return null
      return {
        pageId,
        contents: pageContents.map(item => ({
          ...item,
          content: item.translations?.[langKey] || item.translations?.[this.DEFAULT_LANG] || null
        })),
        created_at: pageContents[0].created_at,
      }
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