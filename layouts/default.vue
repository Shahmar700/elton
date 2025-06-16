<template>
  <div>
    <div id="top-header" class="top-header">      
      <div class="container">
        <div class="contact-and-social">
          <div class="contact-info flex items-center">
            <!-- Mobile contact toggle button -->
            <div class="mobile-contact-toggle" @click="toggleContactInfo">
              <span>{{ t('contact.contactInfo') }}</span>
              <Icon :name="isContactInfoOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" size="20" />
            </div>
            
            <!-- Contact info items -->
            <div class="contact-items shadow-2xl border border-[#1AA54D] md:border-0 !z-[999] min-w-[280px]" :class="{ 'active': isContactInfoOpen }">
              <span><Icon name="mdi:phone" size="20" /> +90 552 431 8888</span>
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
              {{ locale }}
              <Icon :name="isLanguageDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" size="20" />
            </button>
            <ul class="language-dropdown" :class="{ 'active': isLanguageDropdownOpen }">
              <li 
                v-for="lang in locales" 
                :key="lang.code"
                :class="{ active: locale === lang.code }"
                @click="selectLanguage(lang.code)"
              >
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
          <NuxtLink to="/" >
            <img src="../public/assets/logo.png" alt="Logo" class="w-[40px] h-[52px] sm:w-[50px] sm:h-[62px]">
          </NuxtLink>
        </div>
        <nav class="nav-links">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.key"
            :to="link.href"
            :class="{ active: isLinkActive(link.href) }"
          >
            {{ t(link.textKey) }}
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
          <div class="copyright-section">            <div class="logo-section">
              <NuxtLink to="/" class="footer-logo-link" @click="handleLogoClick">
                <img src="../public/assets/logo.png" alt="Elton Logo" class="footer-logo">
              </NuxtLink>
              <h3>Elton Teknik Servis</h3>
            </div>
            <p class="copyright-text">
              © {{ currentYear }} {{ t('footer.copyright') }}
            </p>
            <div class="footer-links">
              <NuxtLink 
                v-for="link in navLinks" 
                :key="link.key"
                :to="link.href"
                class="footer-link"
              >
                {{ t(link.textKey) }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="floating-particles" ref="particlesRef"></div>
    </footer>

    <!-- Sidebar -->
    <div 
      class="sidebar-overlay" 
      :class="{ 'active': isSidebarOpen }" 
      @click="closeSidebar"
    />
    <div class="sidebar" :class="{ 'active': isSidebarOpen }">
      <button class="close-btn" @click="closeSidebar">
        <Icon name="mdi:close" size="28" />
      </button>
      <nav class="sidebar-nav">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.key"
          :to="link.href"
          :class="{ active: isLinkActive(link.href) }"
          @click="closeSidebar"
        >
          {{ t(link.textKey) }}
        </NuxtLink>
      </nav>
    </div>

    

    <!-- Map Modal -->
    <MapModal v-model:isOpen="showMap" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import ServiceVideos from '~/components/ServiceVideos.vue'
import MapModal from '~/components/MapModal.vue'

const isSidebarOpen = ref(false)
const isLanguageDropdownOpen = ref(false)
const isContactInfoOpen = ref(false)
const showMap = ref(false)
const footerRef = ref(null)
const canvasRef = ref(null)
const particlesRef = ref(null)

const { locales, locale, setLocale, t } = useI18n()
const $route = useRoute()

const currentYear = new Date().getFullYear()

const navLinks = computed(() => [
  { key: 'home', textKey: 'nav.home', href: '/' },
  { key: 'brands', textKey: 'nav.brands', href: '/markalar' },
  { key: 'services', textKey: 'nav.services', href: '/hizmetler' },
  { key: 'faq', textKey: 'nav.faq', href: '/sik-sorulan-sorular' },
  { key: 'contact', textKey: 'nav.contact', href: '/iletisim' }
])

// Function to check if a link is active
const isLinkActive = (href) => {
  const currentPath = $route.path
  const currentPathWithoutLocale = currentPath.replace(/^\/(en|tr|ru)/, '') || '/'
  return currentPathWithoutLocale === href
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

const selectLanguage = (langCode) => {
  setLocale(langCode)
  isLanguageDropdownOpen.value = false
}

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
  // Əks halda normal navigation davam etsin
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
  document.addEventListener('click', (e) => {
    const languageSelector = document.querySelector('.language-selector')
    if (languageSelector && !languageSelector.contains(e.target)) {
      isLanguageDropdownOpen.value = false
    }
    
    const contactInfo = document.querySelector('.contact-info')
    if (contactInfo && !contactInfo.contains(e.target)) {
      isContactInfoOpen.value = false
    }
  })

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

.contact-items span {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-items span:hover {
  color: var(--primary-color);
  transform: scale(1.02);
}

@media screen and (max-width: 768px) {
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

.sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background: white;
  z-index: 999;
  transition: right 0.3s ease;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
}

.sidebar.active {
  right: 0;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--secondary-color);
  cursor: pointer;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
}

.sidebar-nav a {
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 18px;
  padding: 10px 0;
}

.nav-links a,
.sidebar-nav a {
  padding: 4px 14px; 
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a::after,
.sidebar-nav a::after {
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease;
}

.nav-links a:hover::after,
.sidebar-nav a:hover::after {
  width: 100%;
}

.nav-links a.active,
.sidebar-nav a.active {
  background-color: #1AA54D;
  color: white;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
}

.nav-links a.active:hover,
.sidebar-nav a.active:hover {
  background-color: #1AA54D;
  color: white;
}

.nav-links a.active::after,
.sidebar-nav a.active::after {
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
}

@media (min-width: 1024px) {
  .sidebar,
  .sidebar-overlay {
    display: none;
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
  margin-top: 5px;
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

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--secondary-color);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-top: 5px;
  padding: 5px 0;
  min-width: 120px;
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
}

.language-dropdown li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.language-dropdown li.active {
  background-color: var(--primary-color);
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

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
}

a {
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

a:hover {
  color: #1AA54D;
}

a.active {
  background-color: #1AA54D;
  color: white;
  box-shadow: 0 2px 8px rgba(26, 165, 77, 0.3);
}

a.active:hover {
  background-color: #189044;
  color: white;
}

.address-link {
  cursor: pointer;
  transition: all 0.3s ease;
}

.address-link:hover span {
  color: var(--primary-color);
  transform: scale(1.02);
}

.address-link:hover span :deep(Icon) {
  color: var(--primary-color);
  transform: scale(1.2);
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
  width: calc(100% + 1.3px);
  height: 60px;
}

.footer-wave .shape-fill {
  fill: rgba(255, 255, 255, 0.1);
  animation: wave 6s ease-in-out infinite;
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

.copyright-text {
  font-size: 16px;
  margin: 20px 0 30px;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
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
  
  .copyright-text {
    font-size: 14px;
    margin: 15px 0 25px;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .footer-link {
    width: fit-content;
  }
}
</style>