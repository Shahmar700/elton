<template>
  <div>
    <section>
      <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
        <h2>Elton Teknik Servis İletişim Hattı:</h2>
      </div>
      <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
        <p>
          Elton Teknik Servis, müşterilerine sorunsuz iletişim imkanı sağlamak için geniş bir iletişim ağı sunmaktadır. İster mobil telefon, ister sabit hat üzerinden olsun, Elton Teknik Servis’e kolayca ulaşabilir ve cihazlarınızın tamir süreci hakkında detaylı bilgi alabilirsiniz.
        </p>
      </div>
      <!-- Mobile Phone  -->
      <div class="mobile-phone">
        <div class="phone-and-address">
          <div class="phone-numbers">
            <a href="tel:+905524318888" class="phone-link flex items-center gap-2">
              <p data-aos="fade-up" data-aos-duration="1000">Mobil Tel: 0552 431 8888</p>
            </a>
          </div>
        </div>
        <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
          <p>
            Elton Teknik Servis, mobil telefon üzerinden ulaşılabilirlik konusunda büyük bir önem vermektedir. Bu nedenle, müşterilerine hızlı ve etkili bir iletişim kanalı sunmaktadır. Mobil telefon hattımız üzerinden ulaşarak, cihazlarınızın tamiri, hizmetlerimiz hakkında bilgi alma veya sorularınızı yanıtlama konusunda bize ulaşabilirsiniz. Müşteri memnuniyeti odaklı yaklaşımımızla, en iyi hizmeti sunmak için sabırsızlıkla bekliyoruz.
          </p>
        </div>
      </div>
      <!-- Landline Phone  -->
      <div class="landline-phone">
        <div class="phone-and-address">
          <div class="phone-numbers">
            <a href="tel:+902124318888" class="phone-link">
              <p data-aos="fade-up" data-aos-duration="1000">Sabit Tel: 0212 431 8888</p>
            </a>
          </div>
        </div>
        <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
          <p>Elton Teknik Servis ayrıca sabit hat üzerinden de müşterilerine hizmet sunmaktadır. Sabit telefon hattımızı kullanarak, detaylı bilgi alabilir, randevu oluşturabilir veya teknik destek taleplerinizi iletebilirsiniz. Alanında uzmanlaşmış müşteri temsilcilerimiz, sizlere en iyi şekilde yardımcı olmak için hazır beklemektedir.
          </p>
        </div>
      </div>
      <!-- Adress  -->
      <div class="address">
        <div class="phone-and-address">
          <div class="address-link" @click="showMap = true">
            <p data-aos="fade-up" data-aos-duration="1000">Adres: Yenidogan Mah Demirkapı Cad Özaltın İş Merkezi Bodrum Kat No:10</p>
          </div>
        </div>
        <div class="info-text" data-aos="fade-up" data-aos-duration="1000">
            <p>Elton Teknik Servis, Yenidogan Mah Demirkapı Cad Özaltın İş Merkezi’nin Bodrum Katı’nda bulunmaktadır. Bu merkezi konum, müşterilerimize kolay erişim imkanı sağlamaktadır. Cihazlarınızın tamiri için bizi ziyaret etmek veya sorularınızı iletmek için adresimize bekliyoruz.
            </p>
        </div>
      </div>

      <div class="info-text">
        <p>
          Elton Teknik Servis, siz değerli müşterilerimize kolay ve güvenilir bir iletişim deneyimi sunmayı hedeflemektedir. İletişim kanallarımız üzerinden her türlü sorunuz için bizimle iletişime geçebilir, kaliteli ve profesyonel hizmetlerimizden yararlanabilirsiniz.
        </p>
      </div>

      <MapModal v-model:isOpen="showMap" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAos } from '../composables/useAos'
import ImageModal from '~/components/Modal.vue'

const showMap = ref(false)

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

.mobile-phone {
  margin-top: 25px;
}

.mobile-phone .info-text{
  margin-top: 0;
}
.mobile-phone p{
  margin-top: 10px;
}

.landline-phone {
  margin-top: 25px;
}
.landline-phone .info-text{
  margin-top: 0;
}
.landline-phone p{
  margin-top: 10px;
}
.address{
  margin-top: 25px;
}
.address .info-text{
  margin-top: 0;
}
.address p{
  margin-top: 10px;
}
</style>    