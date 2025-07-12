<template>
  <div>
      <div class="info-text">
        <h2 class="text-lg sm:text-2xl md:text-[27px] !leading-relaxed sm:mt-8">{{ pageData?.content?.title }}</h2>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">{{ pageData?.content?.subTitle }}</p>
      </div>
      <!-- S.S.S  -->
      <div class="faq-container">
        <div v-for="(item, index) in questions" :key="item.id" class="faq-item" @click="toggleFaq(index)">
          <div class="faq-question p-2 sm:p-4 lg:p-6">
            <h3 class="text-base">{{ item.question }}</h3>
            <Icon :name="activeFaqs.includes(index) ? 'material-symbols:expand-less' : 'material-symbols:expand-more'" class="expand-icon" />
            <Icon v-if="index === 0 && showTouchAnimation" name="material-symbols:touch-app" class="touch-icon" />
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaqs.includes(index) }">
            <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">{{ item.answer }}</p>
          </div>
        </div>
      </div>
      <!-- S.S.S END  -->
       <div class="info-text">
          <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">{{ pageData?.content?.info1 }}</p>
       </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePagesData } from '~/composables/usePagesData'

const { locale } = useI18n()
const pageStore = usePagesData()

// Server-side data loading
await pageStore.loadData()

// Səhifə məlumatları - SSS səhifəsi üçün page ID = 6
const pageData = computed(() => {
  const data = pageStore.getPageData(6, locale.value)
  console.log('SSS Page Data:', data) // Məlumatları konsola çıxarırıq
  return data
})

// Title təyin etmək - yalnız tr dili üçün
if (locale.value === 'tr') {
  useHead({
    title: 'Sık Sorulan Sorular | Elton Teknik Servis'
  })
}

const activeFaqs = ref([])
const showTouchAnimation = ref(false)

onMounted(() => {
  setTimeout(() => {
    showTouchAnimation.value = true
    setTimeout(() => {
      showTouchAnimation.value = false
    }, 2000)
  }, 1000)
})

const questions = computed(() => {
  if (!pageData.value?.content) {
    return []
  }
  const faqs = []
  let i = 1
  // 'soru' mövcud olduğu müddətcə dövr davam edəcək
  while (pageData.value.content[`soru${i}`] && pageData.value.content[`cevap${i}`]) {
    faqs.push({
      id: i,
      question: pageData.value.content[`soru${i}`],
      answer: pageData.value.content[`cevap${i}`]
    })
    i++
  }
  return faqs
})

const toggleFaq = (index) => {
  const currentIndex = activeFaqs.value.indexOf(index)
  if (currentIndex === -1) {
    activeFaqs.value.push(index)
  } else {
    activeFaqs.value.splice(currentIndex, 1)
  }
}
</script>

<style scoped>
.info-text {
  margin-top: 1rem;
  width: 100%;
  max-width: 100%;
  /* padding: 0 2rem; */
}

.info-text h2 {
  background: linear-gradient(
    45deg,
    #1AA54D,
    #121D61
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* font-size: 1.6rem; */
  font-weight: 700;
  animation: gradient 3s ease infinite;
  position: relative;
  padding-bottom: 10px;
  text-align: center;
}

.info-text p {
  color: #333;
  /* font-size: 1.3rem; */
  line-height: 1.8;
  text-align: justify;
  max-width: 100%;
  margin-top: 20px;
  padding: 0;
}

.info-text h2::after {
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

/* @media (max-width: 768px) {
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
} */

.faq-container {
  max-width: 900px; 
  margin: 2rem auto;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  cursor: pointer;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #1AA54D, #121D61);
  color: white;
  position: relative;
}

.expand-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  background-color: #f9f9f9;
  opacity: 0;
}

.faq-answer.active {
  max-height: 200px;
  opacity: 1;
}

.faq-answer p {
  padding: 1rem;
  margin: 0;
  line-height: 1.6;
}

.touch-icon {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.5rem;
  animation: touchPulse 2s ease-in-out;
  opacity: 0;
}

@keyframes touchPulse {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  20% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  80% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
}
</style>