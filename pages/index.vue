<template>  
  <div>
    <section>
      <h1 v-if="parsedHomeData?.welcome" class="gradient-text text-md 400:text-lg sm:text-2xl md:text-3xl mt-2 md:mt-10">
        {{ parsedHomeData.welcome }}
      </h1>
      <div class="main-image-container">
        <img src="/assets/images/office.jpg" alt="Office" class="main-image">
      </div>
      <div class="info-text">
        <h2 class="text-base xs:text-lg sm:text-2xl">
          {{ parsedHomeData.h1 }}
        </h2>
        <p>
          {{ parsedHomeData.p1 }}
        </p>
      </div>
      <!-- phone and address -->
      <div class="phone-and-address">
        <div class="phone-numbers">
          <a :href="`tel:${parsedHomeData.mobile?.replace(/ /g, '')}`" class="phone-link flex items-center gap-2">
            <p>Mobil Tel: {{ parsedHomeData.mobile }}</p>
          </a>
          <a :href="`tel:${parsedHomeData.landlinePhone?.replace(/ /g, '')}`" class="phone-link">
            <p>Sabit Tel: {{ parsedHomeData.landlinePhone }}</p>
          </a>
        </div>
        <div class="address-link" @click="showMap = true">
          <p>Adres: {{ parsedHomeData.address }}</p>
        </div>
      </div>
      <!-- customer testimonial -->
      <div class="customer-testimonial info-text">
        <p>{{ parsedHomeData.p2 }}</p>
        <p>{{ parsedHomeData.p3 }}</p>
        <p>{{ parsedHomeData.p4 }}</p>
        <p>{{ parsedHomeData.p5 }}</p>
      </div>      <!-- Parts Images -->
      <div class="parts-container" v-if="partImages.length > 0">
        <div
          v-for="(img, index) in partImages"
          :key="index"
          class="part-item"
          @click="openModal(img, index)"
        >
          <img :src="img" :alt="`Part ${index + 1}`" class="part-image" />
        </div>
      </div>
    </section>

    <MapModal v-model:isOpen="showMap" />

    <ImageModal
      :is-open="isModalOpen"
      :show-navigation="true"
      :is-first-image="currentImageIndex === 0"
      :is-last-image="currentImageIndex === partImages.length - 1"
      @update:is-open="isModalOpen = $event"
      @prev="prevImage"
      @next="nextImage"
    >
      <img :src="selectedImage" class="modal-image" :alt="'Selected part'">
    </ImageModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watchEffect } from 'vue'
import ImageModal from '~/components/Modal.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const showMap = ref(false)
const parts = ref(Array(6).fill(null))
const isModalOpen = ref(false)
const selectedImage = ref('')
const currentImageIndex = ref(0)
const isHiding = ref(false)

// Async data loading with proper waiting
const pageStore = usePagesData()
const { pending: pagesPending } = await useAsyncData('pages', () => pageStore.fetchPages())
const { pending: contentPending } = await useAsyncData('pageContent', () => pageStore.fetchPageContent())
const { pending: imagePending } = await useAsyncData('pageImage', () => pageStore.fetchPageImage())

const homePageData = computed(() => {
  return pageStore.getPageData('index', locale.value)
})

const parsedHomeData = computed(() => {
  const data = homePageData.value
  
  if (!data || !data.data) {
    return {}
  }

  return {
    ...data.data, // welcome, h1, p1, mobile, landlinePhone, address, p2, p3, p4, p5
    partImages: data.partImages || []
  }
})

const partImages = computed(() => {
  if (!parsedHomeData.value || !parsedHomeData.value.partImages || !Array.isArray(parsedHomeData.value.partImages)) {
    return []
  }
  
  return parsedHomeData.value.partImages
})

const openModal = (imageSrc, index) => {
  selectedImage.value = imageSrc
  currentImageIndex.value = index
  isModalOpen.value = true
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    selectedImage.value = partImages.value[currentImageIndex.value]
  }
}

const nextImage = () => {
  if (currentImageIndex.value < partImages.value.length - 1) {
    currentImageIndex.value++
    selectedImage.value = partImages.value[currentImageIndex.value]
  }
}
</script>

<style scoped>
section {
  /* background-color: #f5f5f5;  */
  /* min-height: 100vh; */
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}


section:nth-child(even) {
  background-color: #fff;
}
.main-image-container {
  width: 100%;
  /* min-height: 550px;   */
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

@media screen and (max-width: 768px) {
  .main-image-container {
    width: 100%;
    /* min-height: 300px; */
    position: relative;
    overflow: hidden;
    margin-top: 2rem;
    border-radius: 10px;
  }
}

@media screen and (max-width: 768px) {
  .phone-and-address {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    /* padding: 0 1rem; */
  }
  
  .address-link {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    padding-left: 0px;
    padding-right: 0px;
  }
  
  .address-link p {
    font-size: 0.9rem;
    line-height: 1.4;
    word-break: break-all;
    white-space: normal;
    overflow-wrap: anywhere;
    padding: 8px 0;
    margin: 0;
    width: 100%;
    max-width: 100%;
  }
  .phone-link {
    padding-left: 0px;
    padding-right: 0px;
  }
  .phone-numbers {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  
  .phone-link {
    width: 100%;
    max-width: 100%;
  }
  
  .phone-and-address p {
    font-size: 0.9rem;
    padding: 6px 0;
    width: 100%;
    max-width: 100%;
  }
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
  margin-top: 1rem;
}

/* @media (max-width: 768px) {
  .info-text {
    padding: 0px !important;
    margin-top: 1rem !important;
  }
} */

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

.info-text {
  margin-top: 1.5rem;
  width: 100%;
  max-width: 100%;
  /* padding: 0 2rem; */
}

.info-text h2 {
  color: var(--secondary-color);
  font-weight: 600;
  text-align: center;
}

.info-text p {
  color: #333;
  font-size: 1.3rem;
  line-height: 1.8;
  text-align: justify;
  max-width: 100%;
  margin-top: 10px;
  padding: 0;
}


@media screen and (min-width: 600px) {
  .info-text h2 {
    color: var(--secondary-color);
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .info-text {
    padding: 0px !important;
  }
  
  .info-text p {
    font-size: 1rem;
    line-height: 1.6;
    padding: 0px !important;
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

</style>