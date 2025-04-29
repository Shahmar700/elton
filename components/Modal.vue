<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-button" @click="closeModal">×</button>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="navigation-buttons">
            <button class="nav-button prev" 
                    @click.stop="prevImage" 
                    v-if="showNavigation"
                    :disabled="isFirstImage"
                    :class="{ 'disabled': isFirstImage }">
              <Icon name="ph:caret-left" class="nav-icon" />
            </button>
            <button class="nav-button next" 
                    @click.stop="nextImage" 
                    v-if="showNavigation"
                    :disabled="isLastImage"
                    :class="{ 'disabled': isLastImage }">
              <Icon name="ph:caret-right" class="nav-icon" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'ImageModal'
})

const props = defineProps({
  isOpen: Boolean,
  showNavigation: Boolean,
  isFirstImage: Boolean,
  isLastImage: Boolean
})

const emit = defineEmits(['update:isOpen', 'prev', 'next'])

const closeModal = () => {
  emit('update:isOpen', false)
}

const prevImage = () => {
  if (!props.isFirstImage) {
    emit('prev')
  }
}

const nextImage = () => {
  if (!props.isLastImage) {
    emit('next')
  }
}

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  width: 800px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #333;
  padding: 5px 10px;
  transition: color 0.3s ease;
  z-index: 2;
}

.close-button:hover {
  color: #666;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.navigation-buttons {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 20px;
}

.nav-button {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
}

.nav-button:not(.disabled):hover {
  background: rgba(0, 0, 0, 0.8);
}

.nav-button.disabled {
  background: rgba(0, 0, 0, 0.2);
  cursor: not-allowed;
  opacity: 0.5;
}

.nav-icon {
  color: white;
  width: 24px;
  height: 24px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95vw;
    padding: 15px;
  }
  
  .nav-button {
    width: 35px;
    height: 35px;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .modal-content {
    width: 90vw;
  }
}

@media (min-width: 1025px) {
  .modal-content {
    width: 800px;
  }
}
</style> 