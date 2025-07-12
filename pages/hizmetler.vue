<template>
  <div>
    <section>
      <div class="info-text" >
        <h2 class="text-lg sm:text-2xl md:text-[27px] !leading-relaxed sm:mt-8">
          <!-- Elton Teknik Servis: Bilgisayar, Telefon ve Tablet Tamiri -->
          {{ pageData?.content?.title }}
        </h2>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0"
        v-html="pageData?.content?.info1"
        >
        </p>
      </div>

      <!-- pc and phone repair  -->
       <div style="width: 100%">
         <div class="pc-repair-container">
             <div class="pc-repair-icon">
                <Icon name="hugeicons:settings-02" class="icon settings-icon" />
                <img 
                  v-if="pageData?.content?.laptopIcon"
                  :src="pageData?.content?.laptopIcon" 
                  alt="laptop icon" 
                  class="icon laptop-icon"
                >
                <!-- <Icon name="material-symbols:laptop-mac-outline-sharp" class="icon laptop-icon" />  -->
             </div>
            <h3 class="text-xl 500:text-2xl md:text-3xl text-[#1AA54D] font-bold">
              <!-- Bilgisayar Tamiri -->
              {{ pageData?.content?.pcHeader }}
            </h3>
         </div>
         <!-- Laptop Repair  -->
          <div class="info-text">
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Laptop Tamiri -->
                  {{ pageData?.content?.laptopRepairHeader }}
                </h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
                <!-- Pek çok markanın laptop tamirini gerçekleştiriyoruz. Ekran değişimi, klavye tamiri, batarya değişimi, anakart onarımı ve yazılım sorunları gibi birçok hizmeti sunuyoruz. -->
                {{ pageData?.content?.laptopRepairContent }}
              </p>
          </div>

          <!-- Desktop Repair  -->
          <div class="info-text">
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Masaüstü Bilgisayarlar Tamiri -->
                  {{ pageData?.content?.desktopRepairHeader }}
                </h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
                <!-- Tüm markaların modellerin masaüstü bilgisayarlarının tamirini yapıyoruz. Güç kaynağı değişimi, donanım yükseltme, veri kurtarma ve virüs temizleme gibi hizmetlerle cihazlarınızı yeniden çalışır duruma getiriyoruz. -->
                {{ pageData?.content?.desktopRepairContent }}
              </p>
          </div>

          <div class="pc-repair-container" >
             <div class="pc-repair-icon">
                <Icon name="hugeicons:settings-02" class="icon settings-icon" />
                <img 
                  v-if="pageData?.content?.phoneIcon"
                  :src="pageData?.content?.phoneIcon" 
                  alt="phone icon" 
                  class="icon laptop-icon"
                >
             </div>
            <h3 class="text-xl 500:text-2xl md:text-3xl text-[#1AA54D] font-bold">
              <!-- Telefon Tamiri -->
              {{ pageData?.content?.phoneRepairHeader }}
            </h3>
         </div>

         <!-- phone repair  -->
         <div class="info-text" >
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Telefon Tamiri -->
                  {{ pageData?.content?.phoneRepairHeader }}
                </h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
                <!-- Tüm telefon modellerinin ekran değişimi, batarya değişimi, arka kamera tamiri, şarj portu onarımı gibi hizmetleri sunuyoruz. Tüm marka modellerin tamirini gerçekleştiriyoruz. -->
                {{ pageData?.content?.phoneRepairContent }}
              </p>
          </div>

          <!-- tablet repair  -->
          <div class="info-text" >
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Tablet Tamiri -->
                  {{ pageData?.content?.tabletRepairHeader }}
                </h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
                <!-- Tüm marka modellerinin ekran değişimi, batarya değişimi, güç düğmesi tamiri, WiFi sorunları gibi hizmetlerini sunuyoruz. -->
                {{ pageData?.content?.tabletRepairContent }}
              </p>
          </div>

          <div class="info-text" >
            <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
              <!-- Bu sadece bir örnek olup, daha fazla marka ve arıza türü için bizimle iletişime geçebilirsiniz. Elton Teknik Servis olarak, uzman teknisyenlerimizle en kaliteli hizmeti sunmayı hedefliyoruz. Her türlü tamir ihtiyacınız için bize güvenebilirsiniz. -->
              {{ pageData?.content?.info2 }}
            </p>
          </div>
       </div>
                                                                       
      <!-- ========================= 200 Soft Development SIDE ========================= -->
      <div class="info-text">
          <div class="">
            <div class="coding-container mb-4">
              <img 
                v-if="pageData?.content?.developmentIcon"
                :src="pageData?.content?.developmentIcon" 
                alt="development icon" 
                class="icon coding-icon mr-[10px]"
              >
              <HeaderScramble 
                :text="pageData?.content?.developmentHeader" 
                class="text-md sm:text-2xl text-xl 500:text-2xl md:text-3xl text-[#1AA54D] font-bold" 
              />
            </div>
            <div class="logo-wrapper">
              <FooterLogo />
            </div>
          </div>
          <p 
            class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0"
            v-html="pageData?.content?.developmentContent"
          >
          </p>

          <!-- =============== Web Development ===============  -->
          <div class="dev-heading mt-4">
                <Icon name="mdi:web-check" class="icon dev-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Laptop Tamiri -->
                  {{ pageData?.content?.webDevHeader }}
                </h4>
          </div>
          <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
              {{ pageData?.content?.webDevContent }}
          </p>

          <!-- =============== Mobile Development ===============  -->
          <div class="dev-heading mt-4">
                <Icon name="material-symbols:app-registration" class="icon dev-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Laptop Tamiri -->
                  {{ pageData?.content?.mobileDevHeader }}
                </h4>
          </div>
          <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
              {{ pageData?.content?.mobileDevContent  }}
          </p>

          <!-- =============== ERP ve Özel Yazılım Çözümleri ===============  -->
          <div class="dev-heading mt-4">
                <Icon name="hugeicons:peer-to-peer-02" class="icon dev-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl font-bold">
                  <!-- Laptop Tamiri -->
                  {{ pageData?.content?.erpHeader }}
                </h4>
          </div>
          <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
              {{ pageData?.content?.erpContent  }}
          </p>

          <div class="info-text">
            <p 
            class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0"
            v-html="pageData?.content?.lastDevText"
            >
          </p>
          </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePagesData } from '~/composables/usePagesData'
import FooterLogo from '~/components/FooterLogo.vue'
import HeaderScramble from '~/components/HeaderScramble.vue'

const { locale } = useI18n()

// Pages data store-u çağırırıq
const pageStore = usePagesData()

// Server-side data loading
await pageStore.loadData()

// Səhifə məlumatları - Hizmetler səhifəsi üçün page ID = 5
const pageData = computed(() => {
  const data = pageStore.getPageData(5, locale.value)
  // console.log('Hizmetler Page Data (server-side ola bilər):', data) // Bu, terminalda görünə bilər
  return data
})

// Title təyin etmək - yalnız tr dili üçün
if (locale.value === 'tr') {
  useHead({
    title: 'Hizmetler | Elton Teknik Servis',
    meta: [
      { name: 'description', content: 'Elton Teknik Servis: Bilgisayar, telefon ve tablet tamiri hizmetleri. 200soft ile işbirliği ile web sitesi geliştirme, ERP sistemleri, mobil uygulama geliştirme, özel yazılım çözümleri ve dijital dönüşüm hizmetleri sunuyoruz.' },
      { name: 'keywords', content: 'bilgisayar tamiri, laptop tamiri, telefon tamiri, tablet tamiri, teknik servis, yazılım geliştirme, web tasarım, mobil uygulama, ERP sistemleri, 200soft, özel yazılım, dijital dönüşüm, web sitesi geliştirme, mobil app geliştirme, yazılım çözümleri' },
      { property: 'og:title', content: 'Hizmetler | Elton Teknik Servis' },
      { property: 'og:description', content: 'Elton Teknik Servis: Bilgisayar, telefon ve tablet tamiri hizmetleri. 200soft ile işbirliği ile web sitesi geliştirme, ERP sistemleri, mobil uygulama geliştirme ve özel yazılım çözümleri.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: 'Hizmetler | Elton Teknik Servis' },
      { name: 'twitter:description', content: 'Elton Teknik Servis: Bilgisayar, telefon ve tablet tamiri hizmetleri. 200soft ile işbirliği ile yazılım çözümleri.' }
    ]
  })
}

// Dil dəyişdikdə məlumatları yenilə
watch(() => locale.value, (newLocale) => {
  // Məlumatlar artıq computed property vasitəsilə reaktiv olaraq yenilənir
})
</script>

<style scoped>
.logo-wrapper {
  transform: scale(1.5);
}
@media screen and (max-width: 768px) {
  .logo-wrapper {
    transform: scale(1.2);
  }
}
section {
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.pc-repair-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}
.coding-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}
.icon {
  font-size: 3rem;
}
.pc-repair-icon {
  position: relative;
  margin-right: 10px;
}
.settings-icon {
  color: #1AA54D;
  position: absolute;
  top: -7px;
  left: -8px;
  font-size: 2rem;
  animation: rotate 7s linear infinite;
  z-index: -1;
}
.laptop-icon {
  color: #1AA54D;
  width: 50px;
  height: 50px;
  z-index: 2;
}

.coding-icon {
  width: 50px;
  height: 50px;
  z-index: 2;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.repair-heading, .dev-heading {
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #1AA54D;
  padding: 5px 15px;
  border-radius: 10px;
  background: linear-gradient(45deg, #1AA54D, #121D61);
  color: white;
}
.repair-icon, .dev-icon {
  font-size: 2rem;
  color: #fff;
  margin-right: 10px;
}


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
} */

/* @media (max-width: 480px) {
  .info-text p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
} */
</style>