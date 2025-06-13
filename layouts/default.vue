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
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import ServiceVideos from '~/components/ServiceVideos.vue'
import MapModal from '~/components/MapModal.vue'

const isSidebarOpen = ref(false)
const isLanguageDropdownOpen = ref(false)
const isContactInfoOpen = ref(false)
const showMap = ref(false)

const { locales, locale, setLocale, t } = useI18n()
const $route = useRoute()

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

onMounted(() => {  document.addEventListener('click', (e) => {
    const languageSelector = document.querySelector('.language-selector')
    if (languageSelector && !languageSelector.contains(e.target)) {
      isLanguageDropdownOpen.value = false
    }
    
    const contactInfo = document.querySelector('.contact-info')
    if (contactInfo && !contactInfo.contains(e.target)) {
      isContactInfoOpen.value = false
    }
  })
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
</style>