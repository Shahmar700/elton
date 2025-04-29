<template>
  <div>
    <section>
      <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
        <h2>Elton Teknik Servis: Bilgisayar, Telefon ve Tablet Tamiri Alanında Tüm Markaları Kapsayan Eşsiz Hizmet</h2>
        <p>
          Elton Teknik Servis, bilgisayar, telefon ve tablet tamiri konusunda uzmanlaşmış bir teknik servis merkezidir. Sunduğumuz eşsiz hizmet anlayışıyla, müşterilerimize tüm markaları kapsayan tamir imkanı sunuyoruz. Teknolojik cihazlarınızda yaşadığınız her türlü sorun için Elton Teknik Servis'e güvenebilirsiniz. Popüler markanın tamirini başarıyla gerçekleştiriyoruz. Ekran değişimi, batarya değişimi, donanım tamiri, yazılım sorunları gibi birçok hizmeti kapsayan geniş bir yelpazede hizmet sunuyoruz.
        </p>
        <p>
          Bilgisayar, telefon ve tablet tamiri konusunda deneyimli ve dıplomalı uzmanlarımız, en son teknik bilgi ve ekipmanlarla donatılmış tamir atölyemizde çalışmaktadır. Her markanın spesifik gereksinimlerine uygun olarak, yüksek kalitede ve güvenilir tamir hizmetleri sunmaktayız. Müşteri memnuniyetini ön planda tutarak, hızlı ve etkili çözümler sunmayı hedefliyoruz.
        </p>
        <p>
          Elton Teknik Servis olarak, müşterilerimize en iyi hizmeti sunabilmek için sürekli olarak kendimizi güncelliyor ve geliştiriyoruz. Teknoloji dünyasındaki yenilikleri yakından takip ediyor, tamir süreçlerimizi optimize ediyor ve müşterilerimizin cihazlarını daha kısa sürede geri almalarını sağlıyoruz.
        </p>
        <p>
          Müşterilerimizin güvenini kazanmak ve onların tamir ihtiyaçlarını en iyi şekilde karşılamak için kaliteli hizmet anlayışımızı her zaman sürdürüyoruz. Elton Teknik Servis'e gelerek, cihazlarınızı güvenilir ellere teslim edebilir ve tamir süreci hakkında ayrıntılı bilgi alabilirsiniz.
        </p>
        <p>
          Sorunlu cihazlarınızı güvenilir ve uzman ellere teslim etmek için Elton Teknik Servis'e başvurun. Tüm markaları kapsayan geniş hizmet yelpazemizle, sizlere en iyi tamir deneyimini sunmak için sabırsızlıkla bekliyoruz.
        </p>
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.info-text {
  margin-top: 2rem;
  width: 100%;
  max-width: 100%;
  padding: 0 2rem;
}

.info-text h2 {
  color: var(--secondary-color);
  font-size: 1.6rem;
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
  font-size: 1.6rem;
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
}
</style>    