<template>
  <span class="inline-block" style="font-family: 'Tomorrow', monospace;">
    <span
      v-for="(char, i) in displayText"
      :key="i"
      :style="{
        display: 'inline-block',
        width: '1ch',
        textAlign: 'center',
        transition: 'color 0.1s',
        color: scrambleColors[i] || '#23272f'
      }"
    >
      {{ char }}
    </span>
  </span>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  scramble: { type: Boolean, default: false }
});

const displayText = ref(props.text.split(''));
const scrambleProgress = ref(Array(props.text.length).fill(0));
const scrambleColors = ref(Array(props.text.length).fill('#23272f'));
let interval = null;
// HTTP status kodları
const statusCodes = ['301', '302', '400', '403', '404', '500', '502', '503'];
const statusColors = {
  '301': '#fbbf24', // sarı
  '302': '#fbbf24', // sarı
  '400': '#f87171', // açıq qırmızı
  '403': '#f59e42', // narıncı
  '404': '#ef4444', // qırmızı
  '500': '#a21caf', // bənövşəyi
  '502': '#6366f1', // mavi
  '503': '#0ea5e9', // göy
  '200': '#22c55e'  // yaşıl
};

function getStatusColor(code) {
  return statusColors[code] || '#7c3aed';
}

function scrambleText() {
  let iterations = 0;
  const maxIterations = 10;         // cəmi 5 iterasiya
  const scrambleInterval = 50;    // hər biri 500ms (cəmi 2.5s)

  clearInterval(interval);
  scrambleProgress.value = Array(props.text.length).fill(0);

  interval = setInterval(() => {
    const randomCode = statusCodes[Math.floor(Math.random() * statusCodes.length)];
    displayText.value = props.text.split('').map((char, idx) => {
      if (iterations < maxIterations) {
        scrambleProgress.value[idx] = 0;
        return randomCode[idx] || randomCode[0];
      } else {
        scrambleProgress.value[idx] = 1;
        return props.text[idx];
      }
    });
    // scrambleColors massivini də yenilə
    scrambleColors.value = props.text.split('').map((char, idx) => {
      if (iterations < maxIterations) {
        return getStatusColor(randomCode);
      } else {
        return getStatusColor('200');
      }
    });
    iterations += 1;
    if (iterations >= maxIterations) {
      clearInterval(interval);
      displayText.value = props.text.split('');
      scrambleProgress.value = Array(props.text.length).fill(1);
      scrambleColors.value = Array(props.text.length).fill(getStatusColor('200'));
    }
  }, scrambleInterval);
}
watch(
  () => props.scramble,
  (val) => {
    if (val) {
      scrambleText();
    } else {
      clearInterval(interval);
      displayText.value = props.text.split('');
      scrambleProgress.value = Array(props.text.length).fill(1);
      scrambleColors.value = Array(props.text.length).fill('#23272f'); // 200 qara
    }
  }
);

watch(
  () => props.text,
  (newVal) => {
    displayText.value = newVal.split('');
    scrambleProgress.value = Array(newVal.length).fill(1);
    scrambleColors.value = Array(newVal.length).fill('#23272f');
  }
);

onMounted(() => {
  displayText.value = props.text.split('');
  scrambleProgress.value = Array(props.text.length).fill(1);
  scrambleColors.value = Array(props.text.length).fill('#23272f'); // 200 qara
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>