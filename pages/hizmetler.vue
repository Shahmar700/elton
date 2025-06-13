<template>
  <div>
    <section>
      <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
        <h2 class="text-lg sm:text-2xl md:text-[27px] !leading-relaxed sm:mt-8">Elton Teknik Servis: Bilgisayar, Telefon ve Tablet Tamiri Hizmetleri</h2>
        <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">
          Elton Teknik Servis olarak, bilgisayar, telefon ve tablet tamiri konusunda uzmanlaşmış bir ekip olarak müşterilerimize eşsiz hizmetler sunuyoruz. Geniş marka yelpazemiz ve kapsamlı arıza türleriyle her türlü cihaz sorununu çözme konusunda deneyimliyiz.
        </p>
      </div>
      <!-- pc and phone repair  -->
       <div style="width: 100%">
         <div class="pc-repair-container" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
             <div class="pc-repair-icon">
                <Icon name="hugeicons:settings-02" class="icon settings-icon" />
                <img src="/public/assets/icons/laptop.png" alt="phone" class="icon laptop-icon">
                <!-- <Icon name="material-symbols:laptop-mac-outline-sharp" class="icon laptop-icon" />  -->
             </div>
            <h3 class="text-xl 500:text-2xl md:text-3xl text-[#1AA54D] font-bold">Bilgisayar Tamiri</h3>
         </div>
         <!-- Laptop Repair  -->
          <div class="info-text" data-aos="fade-up" data-aos-duration="900" data-aos-delay="200">
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl md:text-3xl font-bold">Laptop Tamiri</h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">Pek çok markanın laptop tamirini gerçekleştiriyoruz. Ekran değişimi, klavye tamiri, batarya değişimi, anakart onarımı ve yazılım sorunları gibi birçok hizmeti sunuyoruz.</p>
          </div>

          <!-- Desktop Repair  -->
          <div class="info-text" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl md:text-3xl font-bold">Masaüstü Bilgisayarlar Tamiri</h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">Tüm markaların modellerin masaüstü bilgisayarlarının tamirini yapıyoruz. Güç kaynağı değişimi, donanım yükseltme, veri kurtarma ve virüs temizleme gibi hizmetlerle cihazlarınızı yeniden çalışır duruma getiriyoruz.</p>
          </div>

          <div class="pc-repair-container" data-aos="fade-up" data-aos-duration="1000">
             <div class="pc-repair-icon">
                <Icon name="hugeicons:settings-02" class="icon settings-icon" />
                 <img src="/public/assets/icons/phone.png" alt="phone" class="icon laptop-icon">
             </div>
            <h3 class="text-xl 500:text-2xl md:text-3xl text-[#1AA54D] font-bold">Telefon Tamiri</h3>
         </div>

         <!-- phone repair  -->
         <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl md:text-3xl font-bold">Telefon Tamiri</h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">Tüm telefon modellerinin ekran değişimi, batarya değişimi, arka kamera tamiri, şarj portu onarımı gibi hizmetleri sunuyoruz. Tüm marka modellerin tamirini gerçekleştiriyoruz.</p>
          </div>

          <!-- tablet repair  -->
          <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
              <div class="repair-heading">
                <Icon name="hugeicons:repair" class="icon repair-icon" />  
                <h4 class="text-md 500:text-lg sm:text-2xl md:text-3xl font-bold">Tablet Tamiri</h4>
              </div>
              <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">Tüm marka modellerinin ekran değişimi, batarya değişimi, güç düğmesi tamiri, WiFi sorunları gibi hizmetlerini sunuyoruz.</p>
          </div>

          <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
            <p class="text-gray-700 text-sm sm:text-xl leading-relaxed text-justify mt-5 px-1 sm:px-0">Bu sadece bir örnek olup, daha fazla marka ve arıza türü için bizimle iletişime geçebilirsiniz. Elton Teknik Servis olarak, uzman teknisyenlerimizle en kaliteli hizmeti sunmayı hedefliyoruz. Her türlü tamir ihtiyacınız için bize güvenebilirsiniz.</p>
          </div>
       </div>
    </section>
  </div>
</template>

<script setup>
import { useAos } from '~/composables/useAos'

useAos()
</script>

<style scoped>
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

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.repair-heading {
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #1AA54D;
  padding: 5px 15px;
  border-radius: 10px;
  background: linear-gradient(45deg, #1AA54D, #121D61);
  color: white;
}
.repair-icon {
  font-size: 2rem;
  color: #fff;
  margin-right: 10px;
}


.info-text {
  margin-top: 2rem;
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