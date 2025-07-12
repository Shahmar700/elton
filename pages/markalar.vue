<template>
  <div>
    <section>
      <div class="info-text">
        <h2 class="text-lg sm:text-2xl md:text-[27px] !leading-relaxed sm:mt-8">
          {{ pageData?.content?.title }}
        </h2>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info1 }}
        </p>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info2 }}
        </p>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info3 }}
        </p>
        <p class="text-gray-700 text-base sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info4 }}
        </p>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info5 }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { usePagesData } from '~/composables/usePagesData'

const { locale } = useI18n()

// Pages data store-u çağırırıq
const pageStore = usePagesData()

// Server-side data loading
await pageStore.loadData()

// Səhifə məlumatları - Markalar səhifəsi üçün page ID = 4
const pageData = computed(() => {
  const data = pageStore.getPageData(4, locale.value)
  return data
})

// Title təyin etmək - yalnız tr dili üçün
if (locale.value === 'tr') {
  useHead({
    title: 'Markalar | Elton Teknik Servis'
  })
}

// Dil dəyişdikdə məlumatları yenilə
watch(() => locale.value, (newLocale) => {
  // Məlumatlar artıq reactive olaraq yenilənir
})
</script>

<style scoped>
section {
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.info-text {
  /* margin-top: 2rem; */
  width: 100%;
  /* max-width: 100%; */
  /* padding: 0 2rem; */
}

.info-text h2 {
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
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
</style>    