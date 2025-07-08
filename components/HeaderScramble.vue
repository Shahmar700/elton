<template>
  <span ref="textRef">{{ currentText }}</span>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  }
})

const textRef = ref(null)
const currentText = ref('')

class HeaderScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }

  setText(newText) {
    if (!newText) return Promise.resolve()
    
    const oldText = this.el.innerText || ''
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => (this.resolve = resolve))
    this.queue = []
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 60)
      const end = start + Math.floor(Math.random() * 80)
      this.queue.push({ from, to, start, end })
    }
    
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest)
    }
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    
    this.el.innerHTML = output
    
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

let fx = null

onMounted(async () => {
  await nextTick()
  if (textRef.value && props.text) {
    fx = new HeaderScramble(textRef.value)
    currentText.value = props.text
    fx.setText(props.text)
  }
})

watch(() => props.text, async (newText) => {
  if (newText && textRef.value) {
    await nextTick()
    if (!fx) {
      fx = new HeaderScramble(textRef.value)
    }
    currentText.value = newText
    fx.setText(newText)
  }
}, { immediate: false })
</script>

<style scoped>
.dud {
  color: #666;
}
</style>