// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
        '@pinia/nuxt',

    [
      '@nuxtjs/i18n',
      {
        langDir: 'locales/',
        lazy: true,
        defaultLocale: 'tr',
        locales: [
          { code: 'tr', name: 'Türkçe', file: 'tr.json' },
          { code: 'en', name: 'English', file: 'en.json' },
          { code: 'ru', name: 'Русский', file: 'ru.json' },
        ]
      }
    ]
  ],

  imports: {
    dirs: ['composables/**']
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    },
    head: {
      title: 'Elton Teknik Servis',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        // {
        //   rel: 'icon',
        //   type: 'image/x-icon',
        //   href: '/favicon.ico'
        // }
      ]
    }
  },
  
  css: [
    '~/assets/css/main.css',
    'flag-icons/css/flag-icons.min.css'
  ],

  compatibilityDate: '2025-04-21'
})