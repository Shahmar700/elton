<template>
  <div>
    <div id="top-header" class="top-header">
      <div class="container">
        <div class="contact-info">
          <span><Icon name="mdi:phone" size="20" /> +90 552 431 8888</span>
          <div class="address-link" @click="showMap = true">
            <span><Icon name="mdi:map-legend" size="20" /> Bayrampaşa Demirkapı Cad. 8/10</span>
          </div>
          <span><Icon name="mdi:clock" size="20" /> Pt-Ct 9:00 - 21:00</span>
        </div>
        <div class="social-links">
          <a href="#"><Icon name="mdi:facebook" size="22" /></a>
          <a href="#"><Icon name="mdi:instagram" size="22" /></a>
          <a href="#"><Icon name="mdi:whatsapp" size="22" /></a>
          <div class="language-selector">
            <button class="language-btn" @click="toggleLanguageDropdown">
              {{ currentLanguage }}
              <Icon :name="isLanguageDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" size="20" />
            </button>
            <ul class="language-dropdown" :class="{ 'active': isLanguageDropdownOpen }">
              <li 
                v-for="lang in languages" 
                :key="lang.code"
                :class="{ active: currentLanguage === lang.code }"
                @click="selectLanguage(lang.code)"
              >
                {{ lang.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <NuxtLink to="/">
            <img src="../public/assets/logo.png" alt="Logo">
          </NuxtLink>
        </div>
        <nav class="nav-links">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.href"
            :to="link.href"
            :class="{ active: $route.path === link.href }"
          >
            {{ link.text }}
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
          :key="link.href"
          :to="link.href"
          :class="{ active: $route.path === link.href }"
          @click="closeSidebar"
        >
          {{ link.text }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Map Modal -->
    <MapModal v-model:isOpen="showMap" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ServiceVideos from '~/components/ServiceVideos.vue'
import MapModal from '~/components/MapModal.vue'

const isSidebarOpen = ref(false)
const isLanguageDropdownOpen = ref(false)
const currentLanguage = ref('TR')
const showMap = ref(false)

const languages = [
  { code: 'TR', name: 'Türkçe' },
  { code: 'EN', name: 'English' },
  { code: 'RU', name: 'Русский' }
]

const navLinks = [
  { text: 'Anasayfa', href: '/' },
  { text: 'Markalar', href: '/markalar' },
  { text: 'Hizmetler', href: '/hizmetler' },
  { text: 'S.S.S', href: '/sik-sorulan-sorular' },
  { text: 'İletişim', href: '/iletisim' }
]

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
  currentLanguage.value = langCode
  isLanguageDropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const languageSelector = document.querySelector('.language-selector')
    if (languageSelector && !languageSelector.contains(e.target)) {
      isLanguageDropdownOpen.value = false
    }
  })
})
</script>

<style>
@import '~/assets/css/main.css';

.contact-info span {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.contact-info span:hover {
  color: var(--primary-color);
  transform: scale(1.02);
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