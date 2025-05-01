<template>
  <div id="app">
    <!-- Navbar -->
    <NavBar />
    <!-- Page Content -->
    <router-view />
    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
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