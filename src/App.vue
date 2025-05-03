<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer />
    <BackToTop />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import BackToTop from './components/BackToTop.vue';
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
router-view {
  flex: 1;
}
</style>