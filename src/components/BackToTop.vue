<template>
  <span
    v-if="isVisible"
    class="back-to-top"
    @click="scrollToTop"
    aria-label="Back to Top"
  >
    <font-awesome-icon :icon="['fas', 'arrow-up']" />
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
  console.log('Scroll position:', window.scrollY, 'Arrow visible:', isVisible.value);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log('Scrolling to top');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  font-size: 1.5rem;
  color: #28A745;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.7;
}
.back-to-top:hover {
  color: #FFC107;
  transform: translateY(-5px);
  opacity: 1;
}
@media (max-width: 576px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    font-size: 1.2rem;
  }
}
</style>