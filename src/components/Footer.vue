<template>
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <!-- Branding -->
        <div class="col-md-4 mb-4">
          <h3 class="mb-3">BM24</h3>
          <p>Your trusted source for breaking news and updates.</p>
          <img :src="bm24Logo" alt="BM24 Logo" class="footer-logo" />
        </div>
        <!-- Navigation -->
        <div class="col-md-4 mb-4">
          <h5 class="mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Home</router-link></li>
            <li><router-link to="/about" class="text-white text-decoration-none">About Us</router-link></li>
            <li><router-link to="/contact" class="text-white text-decoration-none">Contact Us</router-link></li>
            <li><router-link to="/category/business" class="text-white text-decoration-none">Business</router-link></li>
            <li><router-link to="/category/technology" class="text-white text-decoration-none">Technology</router-link></li>
          </ul>
        </div>
        <!-- Contact Info -->
        <div class="col-md-4 mb-4">
          <h5 class="mb-3">Get in Touch</h5>
          <p>Email: <a href="mailto:onyilomoses4god@gmail.com" class="text-white">onyilomoses4god@gmail.com</a></p>
          <div class="social-links">
            <a href="#" class="text-white me-3"><i class="bi bi-twitter"></i></a>
            <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <p class="mb-0">&copy; 2025 BM24. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import bm24Logo from '@/assets/image/BM24.jpg';
</script>

<style scoped>
.footer-logo {
  height: 40px;
  width: auto;
}
.social-links i {
  font-size: 1.5rem;
}
.social-links a:hover {
  color: #28A745 !important; /* Green hover effect */
}
</style>