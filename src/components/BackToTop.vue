<template>
  <button
    v-if="isVisible"
    class="back-to-top btn btn-gradient"
    @click="scrollToTop"
    aria-label="Back to Top"
  >
    <font-awesome-icon :icon="['fas', 'arrow-up']" />Top
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
  console.log('Scroll position:', window.scrollY, 'Button visible:', isVisible.value);
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
  padding: 10px 15px;
  border-radius: 50%;
  font-size: 1rem;
  background: linear-gradient(45deg, #28A745, #FFC107);
  border: none;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0.8;
}
.back-to-top:hover {
  opacity: 1;
  transform: translateY(-5px);
}
@media (max-width: 576px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    padding: 8px 12px;
  }
}
</style>