// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon'
  ],

  imports: {
    dirs: ['composables/**']
  },

  app: {
    head: {
      title: 'Elton',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },

  css: [
    'aos/dist/aos.css'
  ],

  compatibilityDate: '2025-04-21'
})