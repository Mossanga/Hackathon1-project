
<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/image/BM24.jpg" alt="BM24 Logo" class="navbar-logo" />
        BM24
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <font-awesome-icon :icon="['fas', 'home']" class="me-1 nav-icon" /> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
              <font-awesome-icon :icon="['fas', 'info-circle']" class="me-1 nav-icon" /> About Us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">
              <font-awesome-icon :icon="['fas', 'envelope']" class="me-1 nav-icon" /> Contact Us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/category/business">
              <font-awesome-icon :icon="['fas', 'briefcase']" class="me-1 nav-icon" /> Business
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/category/technology">
              <font-awesome-icon :icon="['fas', 'laptop-code']" class="me-1 nav-icon" /> Technology
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import bm24Logo from '@/assets/image/BM24.jpg';
</script>

<style scoped>
.navbar-custom {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.navbar-logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 12px;
  transition: transform 0.3s ease;
}
.navbar-logo:hover {
  transform: scale(1.1);
}
.nav-link {
  color: #fff !important;
  font-weight: 500;
  padding: 10px 15px;
  transition: color 0.3s ease, transform 0.3s ease;
}
.nav-link:hover {
  color: #FFC107 !important;
  transform: translateY(-2px);
}
.nav-icon {
  color: #28A745;
  transition: color 0.3s ease, transform 0.3s ease;
}
.nav-link:hover .nav-icon {
  color: #FFC107;
  transform: scale(1.2);
}
@media (max-width: 768px) {
  .navbar-logo {
    height: 40px;
    width: 40px;
  }
  .nav-link {
    padding: 8px 10px;
  }
}
</style>