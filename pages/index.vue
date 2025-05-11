<template>
  <div>
    <section>
      <h1 class="gradient-text">Elton Teknik Servis'e Hoş Geldiniz</h1>
      <div class="main-image-container" data-aos="fade-up" data-aos-duration="1000">
        <img src="/assets/images/office.jpg" alt="Office" class="main-image">
      </div>
      <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
        <h2>Elton Teknik Servis: Bilgisayar, Telefon ve Tablet Tamiri</h2>
        <p>
          Yenidoğan Mah. Demirkapı Cad. Özaltın İş Merkezi'nde yer alan Elton Teknik Servis, uzun yıllara dayanan tecrübesi ve alanında uzmanlaşmış kadrosu ile bilgisayar, telefon ve tablet tamiri alanında hizmet vermektedir. Müşterilerine kaliteli ve güvenilir bir teknik servis deneyimi sunan Elton Teknik Servis, her zaman en son teknolojileri kullanarak, hızlı ve etkili çözümler sunmaktadır. Profesyonel ekibimiz ve geniş yedek parça stokumuzla, her türlü teknik soruna karşı hazırız.
        </p>
      </div>
      <!-- phone and adress   -->
      <div class="phone-and-address">
        <div class="phone-numbers">
          <a href="tel:+905524318888" class="phone-link flex items-center gap-2">
            <p data-aos="fade-up" data-aos-duration="1000">Mobil Tel: 0552 431 8888</p>
          </a>
          <a href="tel:+902124318888" class="phone-link">
            <p data-aos="fade-up" data-aos-duration="1000">Sabit Tel: 0212 431 8888</p>
          </a>
        </div>
        <div class="address-link" @click="showMap = true">
          <p data-aos="fade-up" data-aos-duration="1000">Adres: Yenidogan Mah Demirkapı Cad Özaltın İş Merkezi Bodrum Kat No:10</p>
        </div>
      </div>
      <!-- customer testimonial  -->
       <div class="customer-testimonial info-text" data-aos="fade-up" data-aos-duration="1000">
          <p>Elton Teknik Servis, müşteri memnuniyetini ön planda tutan bir anlayışla çalışmaktadır. Müşterilerin cihazlarının tamir süreci boyunca en iyi hizmeti almasını sağlamak için özveriyle çalışan uzman ekip, hızlı ve etkili çözümler sunmaktadır. Bilgisayarlar, telefonlar ve tabletler gibi teknolojik cihazlar üzerinde her türlü sorunla başa çıkabilen Elton Teknik Servis, arızaları giderirken aynı zamanda veri kurtarma ve yedekleme gibi hizmetler de sunmaktadır.</p>
          <p>Elton Teknik Servis, müşterilerinin güvenliği ve gizliliği konusunda da hassasiyet göstermektedir. Tamir sürecinde müşteri verilerinin korunmasına özen gösteren servis, bilgilerinizi güvenli bir şekilde saklamakta ve gizlilik politikalarına sıkı sıkıya uymaktadır.</p>
          <p>
            İş merkezi içindeki modern ve donanımlı atölyesi sayesinde Elton Teknik Servis, hızlı ve etkili tamirler yapabilmektedir. Kaliteli yedek parçalar kullanarak uzun süreli kullanım sağlayan tamirler gerçekleştiren servis, müşterilerine cihazlarının yeniden sağlıklı bir şekilde kullanılmasını sağlamaktadır.
          </p>
          <p>
            Elton Teknik Servis olarak, müşteri memnuniyetini ve kaliteli hizmeti ön planda tutarak sektörde öne çıkmaktayız. Müşterilerimize en iyi tamir hizmetini sunmanın yanı sıra, rekabetçi fiyatlarla da dikkat çekmekteyiz
          </p>
       </div>
       <!-- Parts Images  --> 
       <div class="parts-container">
         <div v-for="(part, index) in parts" 
              :key="index" 
              class="part-item"
              :data-aos="getAnimationEffect(index)"
              :data-aos-duration="getDuration(index)"
              :data-aos-delay="index * 100"
              :data-aos-easing="getEasing(index)"
              @click="openModal(`/assets/images/parts${index + 1}.png`, index)">
           <img :src="`/assets/images/parts${index + 1}.png`" :alt="`Part ${index + 1}`" class="part-image">
         </div>
       </div>
    </section>

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

    <ImageModal 
    :is-open="isModalOpen" 
    :show-navigation="true"
    :is-first-image="currentImageIndex === 0"
    :is-last-image="currentImageIndex === parts.length - 1"
    @update:is-open="isModalOpen = $event"
    @prev="prevImage"
    @next="nextImage">
      <img :src="selectedImage" class="modal-image" :alt="'Selected part'">
    </ImageModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAos } from '../composables/useAos'
import ImageModal from '~/components/Modal.vue'

useAos()
const showMap = ref(false)
const parts = ref(Array(6).fill(null))
const isModalOpen = ref(false)
const selectedImage = ref('')
const currentImageIndex = ref(0)
const showScrollTop = ref(false)
const isHiding = ref(false)

const checkScroll = () => {
  const shouldShow = window.scrollY > 100
  
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

const getAnimationEffect = (index) => {
  const effects = ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-out']
  return effects[index % effects.length]
}

const getDuration = (index) => {
  return 500 + (index * 50)
}

const getEasing = (index) => {
  const easings = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']
  return easings[index % easings.length]
}

const openModal = (imageSrc, index) => {
  selectedImage.value = imageSrc
  currentImageIndex.value = index
  isModalOpen.value = true
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    selectedImage.value = `/assets/images/parts${currentImageIndex.value + 1}.png`
  }
}

const nextImage = () => {
  if (currentImageIndex.value < parts.value.length - 1) {
    currentImageIndex.value++
    selectedImage.value = `/assets/images/parts${currentImageIndex.value + 1}.png`
  }
}
</script>

<style scoped>
section {
  /* background-color: #f5f5f5;  */
  /* min-height: 100vh; */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

section:nth-child(even) {
  background-color: #fff;
}
section h1 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.main-image-container {
  width: 100%;
  min-height: 550px;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  border-radius: 20px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.gradient-text {
  background: linear-gradient(
    45deg,
    #1AA54D,
    #121D61
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 40px;
  font-weight: 700;
  animation: gradient 3s ease infinite;
  position: relative;
  padding-bottom: 10px;
}

.gradient-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1AA54D, #121D61);
  transform: scaleX(0);
  transform-origin: left;
  animation: lineAnimation 1s ease forwards;
}

.customer-testimonial {
  width: 100%;
  max-width: 100%;
  padding: 0 2rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .phone-numbers {
    flex-direction: column;
    gap: 10px;
  }
  
  .phone-and-address p {
    font-size: 1rem;
    padding: 8px 15px;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes lineAnimation {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@media (max-width: 768px) {
  .gradient-text {
    font-size: 2rem;
  }
  
  .main-image-container {
    height: 50vh;
  }
}

.info-text {
  margin-top: 2rem;
  width: 100%;
  max-width: 100%;
  padding: 0 2rem;
}

.info-text h2 {
  color: var(--secondary-color);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.info-text p {
  color: #333;
  font-size: 1.3rem;
  line-height: 1.8;
  text-align: justify;
  max-width: 100%;
  margin-top: 20px;
  padding: 0;
}

@media (max-width: 768px) {
  .info-text {
    padding: 0 1rem;
  }
  
  .info-text h2 {
    font-size: 1.5rem;
  }
  
  .info-text p {
    font-size: 1rem;
    line-height: 1.6;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .info-text p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .phone-and-address p {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}

.parts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
}

.part-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform-origin: center;
  aspect-ratio: 1;
  cursor: pointer;
}

.part-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  filter: brightness(0.95);
}

.part-item:hover {
  transform: scale(1.05);
}

.part-item:hover .part-image {
  filter: brightness(1);
}

@media (max-width: 768px) {
  .parts-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .parts-container {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0 10px;
  }
}

.floating-icons {
  position: fixed;
  bottom: 35px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
  align-items: flex-end;
}

.scroll-top-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #25D366, #121D61);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  margin-right: 5px;
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
  width: 50px;
  height: 50px;
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
  .floating-icons {
    bottom: 20px;
    right: 20px;
  }

  .icon-link {
    width: 45px;
    height: 45px;
  }

  .icon {
    width: 25px;
    height: 25px;
  }
}

@media (max-width: 480px) {
  .floating-icons {
    bottom: 15px;
    right: 15px;
  }

  .icon-link {
    width: 40px;
    height: 40px;
  }

  .icon {
    width: 22px;
    height: 22px;
  }
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .modal-image {
    max-height: 70vh;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .modal-image {
    max-height: 75vh;
  }
}

@media (min-width: 1025px) {
  .modal-image {
    max-height: 80vh;
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
</style> 