<template>
  <div>
    <section>
      <div class="info-text" >
        <h2 class="text-lg sm:text-2xl md:text-[27px] !leading-relaxed sm:mt-8">{{ pageData?.content?.title }}</h2>
      </div>
      <div class="info-text" >
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info1 }}
        </p>
      </div>
      <!-- Mobile Phone  -->
      <div class="mobile-phone">
        <div class="phone-and-address">
          <div class="phone-numbers">
            <a href="tel:+905524318888" class="phone-link flex items-center gap-2">
              <p> {{ $t('mobilePhone') }}  <span>{{ pageData?.content?.mobilePhone }}</span></p>
            </a>
          </div>
        </div>
        <div class="info-text" >
          <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
            {{ pageData?.content?.info2 }}
          </p>
        </div>
      </div>
      <!-- Landline Phone  -->
      <div class="landline-phone">
        <div class="phone-and-address">
          <div class="phone-numbers">
            <a href="tel:+902124318888" class="phone-link">
              <p>{{ $t('landlinePhone') }} <span>{{ pageData?.content?.landlinePhone }}</span></p>
            </a>
          </div>
        </div>
        <div class="info-text" >
          <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">{{ pageData?.content?.info3 }}
          </p>
        </div>
      </div>
      <!-- Adress  -->
      <div class="address">
        <div class="phone-and-address">
          <div class="address-link" @click="showMap = true">
            <p>{{ $t('address') }}<span>{{ pageData?.content?.adress }}</span></p>
          </div>
        </div>
        <div class="info-text" >
            <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">{{ pageData?.content?.info4 }}
            </p>
        </div>
      </div>

      <div class="info-text">
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          {{ pageData?.content?.info5 }}
        </p>
      </div>

      <MapModal v-model:isOpen="showMap" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePagesData } from '~/composables/usePagesData'
import MapModal from '~/components/MapModal.vue'

const { locale } = useI18n()
const pageStore = usePagesData()

// Server-side data loading
await pageStore.loadData()

// Səhifə məlumatları - İletişim səhifəsi üçün page ID = 7
const pageData = computed(() => {
  const data = pageStore.getPageData(7, locale.value)
  console.log('İletişim Page Data:', data) // Məlumatları konsola çıxarırıq
  return data
})

// Title təyin etmək - yalnız tr dili üçün
if (locale.value === 'tr') {
  useHead({
    title: 'İletişim | Elton Teknik Servis',
    meta: [
      { name: 'description', content: 'Elton Teknik Servis ile iletişim. Adres: Bayrampaşa Demirkapı Cad. 8/10. Telefon: +90 552 431 8888. Bilgisayar, telefon ve tablet tamiri. 200soft ile işbirliği ile yazılım çözümleri için bize ulaşın.' },
      { name: 'keywords', content: 'elton teknik servis iletişim, teknik servis telefon, bilgisayar tamiri adres, telefon tamiri adres, tablet tamiri adres, 200soft, yazılım çözümleri, web sitesi geliştirme, ERP sistemleri, mobil uygulama' },
      { property: 'og:title', content: 'İletişim | Elton Teknik Servis' },
      { property: 'og:description', content: 'Elton Teknik Servis ile iletişim. Adres: Bayrampaşa Demirkapı Cad. 8/10. Telefon: +90 552 431 8888. 200soft ile işbirliği ile yazılım çözümleri.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: 'İletişim | Elton Teknik Servis' },
      { name: 'twitter:description', content: 'Elton Teknik Servis ile iletişim. Bilgisayar, telefon ve tablet tamiri. 200soft ile işbirliği ile yazılım çözümleri için bize ulaşın.' }
    ]
  })
}

const showMap = ref(false)

</script>

<style scoped>

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
</style>