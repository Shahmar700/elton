<template>
  <div>
    <div id="top-header" class="top-header">      
      <div class="container">
        <div class="contact-and-social">
          <div class="contact-info flex items-center">
            <!-- Mobile contact toggle button -->
            <div class="mobile-contact-toggle" @click="toggleContactInfo">
              <span class="contactInfoText text-[15px]">{{ t('contact.contactInfo') }}</span>
              <Icon :name="isContactInfoOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" size="20" />
            </div>
              <!-- Contact info items -->
            <div class="contact-items shadow-2xl border border-[#1AA54D] md:border-0 !z-[999] min-w-[280px]" :class="{ 'active': isContactInfoOpen }">
              <a href="tel:+905524318888" class="phone-link"><Icon name="mdi:phone" size="20" /> +90 552 431 8888</a>
              <div class="address-link" @click="showMap = true">
                <span><Icon name="mdi:map-legend" size="20" /> Bayrampaşa Demirkapı Cad. 8/10</span>
              </div>
              <span><Icon name="mdi:clock" size="20" /> Pt-Ct 9:00 - 21:00</span>
            </div>
          </div>
        <div class="social-links">
          <a href="https://www.facebook.com/eltonteknikservis" target="_blank"><Icon name="mdi:facebook" size="22" /></a>
          <a href="https://www.instagram.com/eltonteknikservis" target="_blank" ><Icon name="mdi:instagram" size="22" /></a>
          <a href="https://wa.me/905524318888" target="_blank" ><Icon name="mdi:whatsapp" size="22" /></a>          
          <div class="language-selector">
            <button class="language-btn" @click="toggleLanguageDropdown">
              <span :class="`fi fi-${getLanguageFlag(locale)}`" class="header-flag"></span>
              <!-- {{ locale }}  -->
              <Icon :name="isLanguageDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" size="20" />
            </button>
            <ul class="language-dropdown" :class="{ 'active': isLanguageDropdownOpen }">
              <li 
                v-for="lang in locales" 
                :key="lang.code"
                :class="{ active: locale === lang.code }"
                @click="selectLanguage(lang.code)"
              >
                <span :class="`fi fi-${getLanguageFlag(lang.code)}`" class="dropdown-flag"></span>
                {{ t('languageName.' + lang.code) }}   
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>

    <header class="main-header !py-2 sm:py-4 lg:py-5">
      <div class="container">
        <div class="logo flex items-center">          
          <NuxtLink :to="getLocalizedRoute('/')" @click="handleLogoClick">
            <img src="../public/assets/logo.png" alt="Logo" class="w-[40px] h-[52px] sm:w-[50px] sm:h-[62px]">
          </NuxtLink>
        </div>
        <nav class="nav-links" v-if="navLinks.length > 0">         
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.key"
            :to="getLocalizedRoute(link.href)"
            :class="{ active: isLinkActive(link.href) }"
          >
            {{ getDisplayName(link.name) }}
          </NuxtLink>
        </nav>
        <button class="mobile-menu-btn" @click="toggleSidebar">
          <Icon name="mdi:menu" size="28" />
        </button>
      </div>
    </header>
    <div class="main-content">
      <main class="page-content">
        <slot />
      </main>
      <ServiceVideos />
    </div>

    <!-- Interactive Footer -->
    <footer class="interactive-footer" ref="footerRef">
      <canvas ref="canvasRef" class="footer-canvas"></canvas>
      <div class="footer-content">
        <div class="footer-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
          </svg>
        </div>
        <div class="footer-main">
          <div class="copyright-section">            
            <div class="logo-section">              
              <NuxtLink :to="getLocalizedRoute('/')" class="footer-logo-link" @click="handleLogoClick">
                <img src="../public/assets/logo.png" alt="Elton Logo" class="footer-logo">
              </NuxtLink>
              <h3>Elton Teknik Servis</h3>
            </div>
            <div class="footer-links" v-if="navLinks.length > 0">              
              <NuxtLink 
                v-for="link in navLinks" 
                :key="link.key"
                :to="getLocalizedRoute(link.href)"
                class="footer-link"
              >
                {{ getDisplayName(link.name) }}
              </NuxtLink>
            </div>
            <div class="copyright-content">
              <p class="copyright-text">
              © {{ currentYear }} {{ t('footer.copyright') }}
              </p>
              <FooterLogo class="scale-[0.9] md:scale-100 mt-2 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
      <div class="floating-particles" ref="particlesRef"></div>
    </footer>    
    <!-- Modern Sidebar -->
    <div 
      class="sidebar-overlay modern-overlay" 
      :class="{ 'active': isSidebarOpen }" 
      @click="closeSidebar"
    />
    <div class="modern-sidebar pb-10" :class="{ 'active': isSidebarOpen }">
      <!-- Background Pattern -->
      <div class="sidebar-bg-pattern"></div>
      
      <!-- Header Section -->
      <div class="sidebar-header">
        <div class="sidebar-logo-section">          
          <NuxtLink :to="getLocalizedRoute('/')" @click="handleLogoClick" class="sidebar-logo-link">
            <img src="../public/assets/logo.png" alt="Elton Logo" class="sidebar-logo">
          </NuxtLink>
          <h3 class="sidebar-brand">Elton Teknik Servis</h3>
        </div>
        <button class="modern-close-btn" @click="closeSidebar">
          <Icon name="mdi:close" size="32" />
        </button>
      </div>

      <!-- Navigation Section -->
      <nav class="modern-sidebar-nav" v-if="navLinks.length > 0">        
        <NuxtLink 
          v-for="(link, index) in navLinks" 
          :key="link.key"
          :to="getLocalizedRoute(link.href)"
          :class="{ 'active': isLinkActive(link.href) }"
          @click="closeSidebar()"
          class="modern-nav-link"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <span class="nav-link-text">{{ getDisplayName(link.name) }}</span>
          <span class="nav-link-icon flex items-center justify-center border rounded-full">
            <Icon name="mdi:arrow-right" size="20" />
          </span>
        </NuxtLink>
      </nav>

      <!-- Language Selector Section -->
      <div class="sidebar-language-section">
        <h4 class="language-title">{{ t('common.language') || 'Dil' }}</h4>
        <div class="sidebar-language-selector">          
          <div 
            v-for="lang in locales" 
            :key="lang.code"
            :class="{ 'active': locale === lang.code }"
            @click="selectLanguage(lang.code)"
            class="sidebar-language-option"
          >
            <span :class="`fi fi-${getLanguageFlag(lang.code)}`" class="language-flag"></span>
            <span class="language-name">{{ t('languageName.' + lang.code) }}</span>
            <Icon v-if="locale === lang.code" name="mdi:check-circle" size="20" class="language-check" />
          </div>
        </div>
      </div>

      <!-- Contact Info Section -->
      <div class="sidebar-contact-section">
        <h4 class="contact-title">{{ t('contact.contactInfo') || 'İletişim' }}</h4>
        <div class="sidebar-contact-items">
          <div class="sidebar-contact-item">
            <Icon name="mdi:phone" size="20" />
            <span>+90 552 431 8888</span>
          </div>
          <div class="sidebar-contact-item address-item" @click="showMap = true; closeSidebar()">
            <Icon name="mdi:map-marker" size="20" />
            <span>Bayrampaşa Demirkapı Cad. 8/10</span>
          </div>
          <div class="sidebar-contact-item">
            <Icon name="mdi:clock" size="20" />
            <span>Pt-Ct 9:00 - 21:00</span>
          </div>
        </div>
      </div>

      <!-- Social Links Section -->
      <div class="sidebar-social-section">
        <div class="sidebar-social-links">
          <a href="https://www.facebook.com/eltonteknikservis" target="_blank" class="sidebar-social-link facebook">
            <Icon name="mdi:facebook" size="24" />
          </a>
          <a href="https://www.instagram.com/eltonteknikservis" target="_blank" class="sidebar-social-link instagram">
            <Icon name="mdi:instagram" size="24" />
          </a>
          <a href="https://wa.me/905524318888" target="_blank" class="sidebar-social-link whatsapp">
            <Icon name="mdi:whatsapp" size="24" />
          </a>
        </div>
      </div>
        <div class="copyright-content">
          <p class="copyright-text text-white">
          © {{ currentYear }} {{ t('footer.copyright') }}
          </p>
          <FooterLogo class="scale-[0.9] md:scale-100 mt-2 md:mt-0" />
        </div>
    </div>

    

    <!-- Map Modal -->
    <MapModal v-model:isOpen="showMap" />

    <!-- Floating Icons -->
    <div class="floating-icons">
      <button 
        v-if="showScrollTop" 
        class="scroll-top-btn"
        :class="{ show: !isHiding, hide: isHiding }"
        @click="scrollToTop"
      >
        <div class="chevron-container">
          <Icon name="mdi:chevron-up" class="icon chevron-1" />
          <Icon name="mdi:chevron-up" class="icon chevron-2" />
        </div>
      </button>
      <a href="https://wa.me/905524318888" target="_blank" class="icon-link whatsapp">
        <Icon name="logos:whatsapp-icon" class="icon" />
      </a>
      <a href="tel:+905524318888" class="icon-link phone">
        <Icon name="ph:phone-call" class="icon" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import ServiceVideos from '~/components/ServiceVideos.vue'
import MapModal from '~/components/MapModal.vue'
import { usePagesData } from '~/composables/usePagesData'
import { usePageStore } from '~/stores/usePageStore';

const { pages, loadData } = usePagesData()
const pageStore = usePageStore() // Store-u birbaşa istifadə edirik
const localePath = useLocalePath() // Nuxt i18n-dən import edirik

// Proqram başlayanda bütün məlumatları yükləyirik
await loadData()

const showScrollTop = ref(false)  
const isSidebarOpen = ref(false)
const isLanguageDropdownOpen = ref(false)
const isContactInfoOpen = ref(false)
const showMap = ref(false)
const footerRef = ref(null)
const canvasRef = ref(null)
const particlesRef = ref(null)
const isHiding = ref(false)

const checkScroll = () => {
  const shouldShow = window.scrollY > 500
  
  if (shouldShow && !showScrollTop.value) {
    showScrollTop.value = true
    isHiding.value = false
  } else if (!shouldShow && showScrollTop.value) {
    isHiding.value = true
    setTimeout(() => {
      showScrollTop.value = false
    }, 600)
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const { locales, locale, setLocale, t } = useI18n()
const $route = useRoute()

const currentYear = new Date().getFullYear()

const navLinks = computed(() => {
  // Əgər səhifə məlumatları hələ yüklənməyibsə, boş massiv qaytar
  if (!pages.value?.results) {
    return []
  }

  // Backend-də istifadə olunan dil kodunu alırıq (məsələn, 'tr' -> 'az')
  const backendLang = pageStore.LANG_MAPPING[locale.value] || locale.value

  const result = pages.value.results
    // Yalnız aktiv olan səhifələri göstər
    .filter(page => page.is_active)
    // API-dən gələn 'order' dəyərinə görə sırala
    .sort((a, b) => a.order - b.order)
    // Naviqasiya üçün lazım olan formata sal
    .map(page => {
      const translation = page.translations[backendLang]
      if (!translation) return null // Əgər tərcümə yoxdursa, bu səhifəni ötür

      // Ana səhifə üçün slug-ı '/' olaraq təyin edirik
      const href = page.id === 3 ? '/' : `/${translation.slug}`

      return {
        key: page.id,
        name: translation.name, // API-dən gələn səhifə adı
        href: href // API-dən gələn slug
      }
    })
    .filter(Boolean) // null olan elementləri massivdən təmizlə
  
  return result;
})

// Function to get localized route with proper URL handling
const getLocalizedRoute = (path) => {
  // If we're at the root path '/', handle locale prefix
  if (path === '/') {
    return locale.value === 'tr' ? '/' : `/${locale.value}/`
  }
  
  // For other paths, add the locale prefix if not default
  return locale.value === 'tr' ? path : `/${locale.value}${path}`
}

// Function to get display name for navigation links
const getDisplayName = (linkName) => {
  // "Sik Sorulan Sorular" üçün xüsusi qısaltmalar
  if (linkName) {
    const lowerName = linkName.toLowerCase()
    // Müxtəlif dillər üçün yoxlama
    if (lowerName.includes('sik sorulan sorular') || 
        lowerName.includes('frequently asked questions') || 
        lowerName.includes('частые вопросы') ||
        lowerName.includes('часто задаваемые вопросы') ||
        lowerName.includes('sık sorulan sorular')) {
      switch (locale.value) {
        case 'tr':
          return 'S.S.S'
        case 'en':
          return 'F.A.Q'
        case 'ru':
          return 'ЧЗВ'
        default:
          return 'S.S.S'
      }
    }
  }
  
  // Digər linklər üçün orijinal adı qaytar
  return linkName
}

const getLanguageFlag = (langCode) => {
  const flagMap = {
    en: 'gb',
    tr: 'tr',
    ru: 'ru',
  };
  return flagMap[langCode] || 'us'; // Fallback to a default flag
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

const selectLanguage = async (newLocale) => {
  // Prevent changing to the same language
  if (newLocale === locale.value) {
    isLanguageDropdownOpen.value = false;
    return;
  }

  const currentPath = $route.path;
  const currentPathWithoutLocale = currentPath.replace(/^\/(en|ru)/, '') || '/';
  const currentSlug = currentPathWithoutLocale.startsWith('/') ? currentPathWithoutLocale.substring(1) : currentPathWithoutLocale;

  let targetPage = null;

  // Handle homepage separately
  if (currentPathWithoutLocale === '/') {
    // Find the homepage object (assuming it has a specific ID, like 3)
    targetPage = pages.value?.results?.find(p => p.id === 3);
  } else {
    // Find the current page by matching the slug in any language
    targetPage = pages.value?.results?.find(p =>
      Object.values(p.translations).some(t => t.slug === currentSlug)
    );
  }

  const backendNewLang = pageStore.LANG_MAPPING[newLocale] || newLocale;
  let newPath = '';

  if (targetPage && targetPage.translations[backendNewLang]) {
    const newSlug = targetPage.translations[backendNewLang].slug;
    // Handle homepage case where slug might be empty or special
    if (targetPage.id === 3) {
      newPath = newLocale === 'tr' ? '/' : `/${newLocale}`;
    } else {
      newPath = newLocale === 'tr' ? `/${newSlug}` : `/${newLocale}/${newSlug}`;
    }
  }

  // Fallback if no specific page match is found
  if (!newPath) {
    const switchPath = useSwitchLocalePath();
    newPath = switchPath(newLocale);
  }
  
  isLanguageDropdownOpen.value = false;
  await navigateTo(newPath);
};

const isLinkActive = computed(() => {
  return (href) => {
    const currentPath = $route.path
    const currentPathWithoutLocale = currentPath.replace(/^\/(en|tr|ru)/, '') || '/'
    
    // Special handling for homepage
    if (href === '/' && currentPathWithoutLocale === '/') {
      return true
    }
    
    // For other pages, check if current page matches the link's page by ID
    if (pages.value?.results && href !== '/') {
      const currentSlug = currentPathWithoutLocale.replace(/^\//, '')
      const linkSlug = href.replace(/^\//, '')
      
      const backendLang = pageStore.LANG_MAPPING[locale.value] || locale.value
      
      // Find current page by checking all language translations
      const currentPage = pages.value.results.find(page => {
        return Object.values(page.translations).some(translation => 
          translation.slug === currentSlug
        )
      })
      
      // Find link page by checking the current language translation
      const linkPage = pages.value.results.find(page => {
        const translation = page.translations[backendLang]
        return translation && translation.slug === linkSlug
      })
      
      // If both pages exist and have same ID, then link is active
      if (currentPage && linkPage) {
        return currentPage.id === linkPage.id
      }
    }
    
    // Fallback to simple path comparison
    return currentPathWithoutLocale === href
  }
})

const toggleContactInfo = () => {
  isContactInfoOpen.value = !isContactInfoOpen.value
}

// Handle footer logo click
const handleLogoClick = (event) => {
  const currentPath = $route.path
  const currentPathWithoutLocale = currentPath.replace(/^\/(en|tr|ru)/, '') || '/'
  
  // Əgər artıq ana səhifədəyiksə, səhifənin başına scroll et
  if (currentPathWithoutLocale === '/') {
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  // Əks halda normal navigation davam etsin, locale qorunacaq
}

// Footer Interactive Effects
let mouseMoveHandler = null
let resizeHandler = null

const initFooterEffects = () => {
  if (!process.client) return
  
  const footer = footerRef.value
  const canvas = canvasRef.value
  const particles = particlesRef.value
  
  if (!footer || !canvas || !particles) return
  // Canvas setup
  const ctx = canvas.getContext('2d')
  const footerRect = footer.getBoundingClientRect()
  canvas.width = footerRect.width
  canvas.height = footerRect.height
  
  // Canvas display size ilə actual size eyni olmalıdır
  canvas.style.width = footerRect.width + 'px'
  canvas.style.height = footerRect.height + 'px'

  // Particle system
  const particleArray = []
  const maxParticles = 50

  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 2
      this.vy = (Math.random() - 0.5) * 2
      this.life = 1
      this.decay = Math.random() * 0.02 + 0.005
      this.size = Math.random() * 3 + 1
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.life -= this.decay
      this.vx *= 0.98
      this.vy *= 0.98
    }

    draw() {
      if (this.life <= 0) return
      
      ctx.save()
      ctx.globalAlpha = this.life
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(26, 165, 77, ${this.life})`
      ctx.fill()
      ctx.restore()
    }
  }
  // Mouse move handler
  mouseMoveHandler = (e) => {
    const rect = footer.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    
    // Daha dəqiq koordinatlar üçün scroll offsetləri əlavə edirik
    const x = e.clientX - rect.left + scrollLeft
    const y = e.clientY - rect.top + scrollTop
    
    // Canvas-a nisbətən koordinatları hesablayırıq
    const canvasRect = canvas.getBoundingClientRect()
    const canvasX = e.clientX - canvasRect.left
    const canvasY = e.clientY - canvasRect.top

    // Add particles at exact mouse position on canvas
    for (let i = 0; i < 3; i++) {
      particleArray.push(new Particle(
        canvasX + (Math.random() - 0.5) * 10, // Daha kiçik random offset
        canvasY + (Math.random() - 0.5) * 10
      ))
    }

    // Limit particles
    if (particleArray.length > maxParticles) {
      particleArray.splice(0, particleArray.length - maxParticles)
    }    // Create ripple effect - footer elementinə nisbətən
    gsap.fromTo(footer, 
      { 
        '--ripple-x': `${e.clientX - rect.left}px`,
        '--ripple-y': `${e.clientY - rect.top}px`,
        '--ripple-opacity': 0.1  // 0.3-dən 0.1-ə azaldıldı (daha az şəffaf)
      },
      { 
        '--ripple-opacity': 0,
        duration: 0.8,
        ease: "power2.out"
      }
    )
  }

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Update and draw particles
    for (let i = particleArray.length - 1; i >= 0; i--) {
      const particle = particleArray[i]
      particle.update()
      particle.draw()
      
      if (particle.life <= 0) {
        particleArray.splice(i, 1)
      }
    }
    
    requestAnimationFrame(animate)
  }
  // Resize handler
  resizeHandler = () => {
    const footerRect = footer.getBoundingClientRect()
    canvas.width = footerRect.width
    canvas.height = footerRect.height
    
    // Canvas display size ilə actual size eyni olmalıdır
    canvas.style.width = footerRect.width + 'px'
    canvas.style.height = footerRect.height + 'px'
  }

  footer.addEventListener('mousemove', mouseMoveHandler)
  window.addEventListener('resize', resizeHandler)
  
  animate()

  // GSAP animations for footer elements
  gsap.fromTo('.footer-main', 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
  )
  
  gsap.fromTo('.footer-wave path', 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" }
  )
}

const cleanupFooterEffects = () => {
  if (footerRef.value && mouseMoveHandler) {
    footerRef.value.removeEventListener('mousemove', mouseMoveHandler)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
}

onMounted(() => {  
  const closeDropdowns = (e) => {
    // Close language dropdown when clicking outside
    const languageSelector = document.querySelector('.language-selector')
    if (languageSelector && !languageSelector.contains(e.target)) {
      isLanguageDropdownOpen.value = false
    }
    
    // Close contact info when clicking outside
    const contactInfo = document.querySelector('.contact-info')
    if (contactInfo && !contactInfo.contains(e.target)) {
      isContactInfoOpen.value = false
    }
  }

  // Use capture phase to ensure the event is handled before navigation
  document.addEventListener('click', closeDropdowns, true)

  // Initialize footer effects
  nextTick(() => {
    initFooterEffects()
  })
})

onUnmounted(() => {
  cleanupFooterEffects()
})
</script>

<style scoped>
@import '~/assets/css/main.css';

@media screen and (max-width: 370px) {
  .contactInfoText {
    font-size: 12px;
  }
}

.contact-and-social{
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  width: 100%;
}
.contact-info {
  display: flex;
  align-items: center;
  position: relative;
}

.mobile-contact-toggle {
  display: none;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
}

.mobile-contact-toggle:hover {
  color: var(--primary-color);
}

.contact-items {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-items span, .contact-items .phone-link {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-items span:hover, .contact-items .phone-link:hover {
  color: var(--primary-color);
  transform: scale(1.02);
}

.contact-items .phone-link {
  text-decoration: none;
  color: inherit;
}

.floating-icons {
  position: fixed;
  bottom: 35px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .floating-icons {
    bottom: 20px;
    right: 20px;
  }
  .mobile-contact-toggle {
    display: flex;
  }
  
  .contact-items {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--secondary-color);
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 100;
  }
  
  .contact-items.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .contact-items span {
    color: white;
    font-size: 14px;
  }
}

@media (max-width: 480px)  {
  .floating-icons {
    bottom: 15px;
    right: 15px;
  }
}

.scroll-top-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1b52a5;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  transform: scale(0);
  opacity: 0;
}

.scroll-top-btn.show {
  animation: scaleIn 0.6s ease-out forwards;
}

.scroll-top-btn.hide {
  animation: scaleOut 0.6s ease-out forwards;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 1;
  }
}

@keyframes scaleOut {
  0% {
    transform: scale(0.9);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.icon-link {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
}

.icon-link::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.whatsapp::before {
  background-color: #25D366;
}

.phone::before {
  background-color: #121D61;
}

.icon-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.whatsapp {
  background-color: #25D366;
}

.phone {
  background-color: #121D61;
}

.icon {
  width: 30px;
  height: 30px;
  color: white;
  position: relative;
  z-index: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .icon-link {
    width: 55px;
    height: 55px;
  }

  .icon {
    width: 25px;
    height: 25px;
  }
}

@media (max-width: 480px) {
  .icon-link {
    width: 50px;
    height: 50px;
  }

  .icon {
    width: 22px;
    height: 22px;
  }
}

.chevron-container {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron-container .icon {
  position: absolute;
  width: 24px;
  height: 24px;
  color: white;
  transition: all 0.2s ease;
}

.chevron-1 {
  top: -5px;
  opacity: 1;
}

.chevron-2 {
  top: 5px;
  opacity: 1;
}

.scroll-top-btn:hover .chevron-1 {
  animation: fadeChevron 0.5s ease-in-out forwards;
}

.scroll-top-btn:hover .chevron-2 {
  animation: fadeChevron 0.5s ease-in-out 0.25s forwards;
}

@keyframes fadeChevron {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


/* @media screen and (max-width: 930px) {
  .contact-info {
    width: 100%;
  }
  .social-links{
    width: 100%;
    justify-content: end;
  }
  .social-links a {
    padding: 0;
  }
} */

@media screen and (max-width: 660px) {
  .contact-info {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar-overlay.active {
  display: block;
  opacity: 1;
}

/* Modern Sidebar Styles */
.modern-overlay {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modern-sidebar {
  position: fixed;
  top: 0;
  right: -100vw;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1AA54D 100%);
  z-index: 9999;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  opacity: 1;
  visibility: visible;
}

.modern-sidebar.active {
  right: 0;
}

.sidebar-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%);
  background-size: 200px 200px;
  animation: backgroundFloat 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes backgroundFloat {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(1deg); }
  66% { transform: translate(-20px, 20px) rotate(-1deg); }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;
  transform: translateY(-30px);
  opacity: 0;
  transition: all 0.4s ease-out;
  transition-delay: 0.1s;
}

.modern-sidebar.active .sidebar-header {
  transform: translateY(0);
  opacity: 1;
}

.sidebar-logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-logo-link {
  display: inline-block;
  transition: all 0.3s ease;
  border-radius: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.sidebar-logo-link:hover {
  transform: translateY(-2px) scale(1.05);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.sidebar-logo {
  width: 50px;
  height: 65px;
  filter: brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  transition: all 0.3s ease;
}

.sidebar-brand {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

.modern-close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: none;
}

.modern-sidebar.active .modern-close-btn {
  animation: spinBounce 0.8s ease-out 0.5s forwards;
}

@keyframes spinBounce {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(180deg) scale(1.3);
  }
  50% {
    transform: rotate(360deg) scale(0.9);
  }
  100%{
    transform: rotate(540deg) scale(1.1);
  }
}

.modern-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modern-sidebar-nav {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
  transform: translateX(-30px);
  opacity: 0;
  transition: all 0.4s ease-out;
  transition-delay: 0.15s;
}

.modern-sidebar.active .modern-sidebar-nav {
  transform: translateX(0);
  opacity: 1;
}

.modern-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 15px;
  transition: all 0.3s ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  font-size: 1.1rem;
  font-weight: 500;
  transform: translateX(20px);
  opacity: 0;
  transition: all 0.3s ease-out;
  transition-delay: calc(0.2s + var(--delay, 0s));
}

.modern-sidebar.active .modern-nav-link {
  transform: translateX(0);
  opacity: 1;
}

.modern-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.6s ease;
}

.modern-nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(10px);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.modern-nav-link:hover::before {
  left: 100%;
}

.modern-nav-link:hover .nav-link-icon {
  transform: translateX(5px);
}

.modern-nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 25px rgba(26, 165, 77, 0.3);
  transform: translateX(10px);
}

.nav-link-text {
  transition: all 0.3s ease;
}

.nav-link-icon {
  transition: all 0.3s ease;
  opacity: 0.7;
}

.modern-nav-link:hover .nav-link-icon,
.modern-nav-link.active .nav-link-icon {
  opacity: 1;
}

.sidebar-language-section {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease-out;
  transition-delay: 0.25s;
}

.modern-sidebar.active .sidebar-language-section {
  transform: translateY(0);
  opacity: 1;
}

.language-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.sidebar-language-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sidebar-language-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  flex: 1;
  min-width: 80px;
  justify-content: center;
}

.sidebar-language-option:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.sidebar-language-option.active {
  background: rgba(26, 165, 77, 0.8);
  border-color: rgba(26, 165, 77, 1);
  color: white;
  box-shadow: 0 4px 15px rgba(26, 165, 77, 0.4);
}

.language-flag {
  width: 36px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-right: 10px;
  vertical-align: middle;
  flex-shrink: 0;
  line-height: 1;
  background-size: cover;
  background-position: center;
}

.language-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.language-check {
  color: #4ade80;
}

.sidebar-contact-section {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
  transform: translateX(20px);
  opacity: 0;
  transition: all 0.3s ease-out;
  transition-delay: 0.3s;
}

.modern-sidebar.active .sidebar-contact-section {
  transform: translateX(0);
  opacity: 1;
}

.contact-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.sidebar-contact-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.sidebar-contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
  border-color: rgba(255, 255, 255, 0.2);
}

.address-item {
  cursor: pointer;
}

.address-item:hover {
  background: rgba(26, 165, 77, 0.2);
  border-color: rgba(26, 165, 77, 0.5);
}

.sidebar-social-section {
  padding: 1.5rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
  transform: scale(0.9) translateY(15px);
  opacity: 0;
  transition: all 0.3s ease-out;
  transition-delay: 0.35s;
}

.modern-sidebar.active .sidebar-social-section {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.sidebar-social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.sidebar-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.sidebar-social-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  transition: all 0.4s ease;
  transform: translate(-50%, -50%);
}

.sidebar-social-link:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.sidebar-social-link.facebook:hover {
  background: #1877f2;
  border-color: #1877f2;
}

.sidebar-social-link.instagram:hover {
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  border-color: #e6683c;
}

.sidebar-social-link.whatsapp:hover {
  background: #25d366;
  border-color: #25d366;
}

/* Animation Keyframes */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-links a,
.modern-nav-link {
  padding: 4px 10px; 
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a::after {
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a.active {
  background-color: #1AA54D;
  color: white;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
}

.nav-links a.active:hover {
  background-color: #1AA54D;
  color: white;
}

.nav-links a.active::after {
  display: none;
}
.main-content {
  display: flex;
  align-items: start;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}
.page-content {
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
}
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
}

/* Responsive adjustments for modern sidebar */
@media (max-width: 480px) {
  .modern-sidebar {
    width: 100vw;
  }
  
  .sidebar-header {
    padding: 1.5rem;
  }
  
  .sidebar-brand {
    font-size: 1.2rem;
  }
  
  .modern-sidebar-nav {
    padding: 1.5rem;
  }
  
  .modern-nav-link {
    padding: 0.875rem 1.25rem;
    font-size: 1rem;
  }
  
  .sidebar-language-section,
  .sidebar-contact-section,
  .sidebar-social-section {
    padding: 1rem 1.5rem;
  }
  
  .sidebar-language-selector {
    flex-direction: column;
  }
  
  .sidebar-language-option {
    flex: none;
    justify-content: flex-start;
  }
}

@media (min-width: 1024px) {
  .modern-sidebar,
  .sidebar-overlay {
    display: none;
  }
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
}

.social-links a{
  padding: 0;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.social-links a:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.social-links select {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 5px 25px 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  outline: none;
}

.social-links select:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.social-links select:focus {
  border-color: white;
}

.social-links select option {
  background-color: var(--secondary-color);
  color: white;
  padding: 10px;
}

/* Select arrow icon */
.social-links select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.language-selector {
  position: relative;
}

.language-btn {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 5px 10px 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  outline: none;
}

.language-btn:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.header-flag,
.dropdown-flag {
  width: 24px;
  height: 16px;
  border-radius: 3px;
  overflow: hidden;
  display: inline-block;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  vertical-align: middle;
  line-height: 1;
  background-size: cover;
  background-position: center;
}

.header-flag {
  margin-right: 6px;
}

.dropdown-flag {
  margin-right: 8px;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--secondary-color);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-top: 5px;
  padding: 5px 0;
  min-width: 77px;
  text-align: center;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.language-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-dropdown li {
  padding: 8px 15px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.language-dropdown li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.language-dropdown li.active {
  background-color: var(--primary-color);
}

/* Interactive Footer Styles */
.interactive-footer {
  position: relative;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1AA54D 100%);
  min-height: 300px;
  overflow: hidden;
  margin-top: 50px;
  --ripple-x: 50%;
  --ripple-y: 50%;
  --ripple-opacity: 0;
}

.interactive-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--ripple-x) var(--ripple-y),
    rgba(255, 255, 255, var(--ripple-opacity)) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}

.footer-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  transform: translateZ(0); /* Hardware acceleration */
}

.footer-content {
  position: relative;
  z-index: 3;
  height: 100%;
}

.footer-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.footer-wave svg {
  position: relative;
  display: block;
  width: calc(110% + 1.3px);
  height: 60px;
}

.footer-wave .shape-fill {
  fill: rgba(255, 255, 255, 0.1);
  animation: wave 4s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 80px 20px 40px;
  text-align: center;
}

.copyright-section {
  max-width: 1200px;
  width: 100%;
  color: white;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.footer-logo-link {
  display: inline-block;
  transition: all 0.3s ease;
  text-decoration: none;
  border-radius: 8px;
  padding: 5px;
}

.footer-logo-link:hover {
  transform: translateY(-2px);
}

.footer-logo {
  cursor: pointer;
  width: 50px;
  height: 65px;
  filter: brightness(1.2) contrast(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.3));
  transition: all 0.3s ease;
}

.footer-logo:hover {
  filter: brightness(1.3) contrast(1.2) drop-shadow(0 4px 12px rgba(26, 165, 77, 0.4));
  transform: scale(1.08);
}

.logo-section h3 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.copyright-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: row;
}

.copyright-text {
  font-size: 17px;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  margin-right: 10px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px !important;
  border-radius: 25px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.footer-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.footer-link:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.footer-link:hover::before {
  left: 100%;
}

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .interactive-footer {
    min-height: 250px;
  }
  
  .footer-main {
    padding: 60px 15px 30px;
  }
  
  .logo-section {
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-logo {
    width: 40px;
    height: 52px;
  }
  
  .logo-section h3 {
    font-size: 24px;
  }
  
  .footer-links {
    gap: 15px;
  }
  
  .footer-link {
    padding: 6px 12px !important;
    font-size: 14px;
  }

  .copyright-content {
    flex-direction: column;
  }
  
  .copyright-text {
    font-size: 16px;
    margin-right: 0;
  }
}

@media (max-width: 480px) {
  .footer-links {
    align-items: center;
    gap: 10px;
  }
  
  .footer-link {
    width: fit-content;
  }
}
</style>