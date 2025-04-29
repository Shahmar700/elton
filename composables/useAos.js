import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const useAos = () => {
  onMounted(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
  })
} 