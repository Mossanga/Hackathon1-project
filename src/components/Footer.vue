
<template>
  <footer class="footer-custom py-4 animate-section">
    <div class="container">
      <div class="gradient-divider mb-4"></div>
      <div class="row">
        <div class="col-12 col-md-4 mb-3">
          <h3 class="mb-3">BM24</h3>
          <p>Your trusted source for breaking news and updates.</p>
          <img :src="bm24Logo" alt="BM24 Logo" class="footer-logo" />
        </div>
        <div class="col-12 col-md-4 mb-3">
          <h5 class="mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li>
              <router-link to="/" class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'home']" class="me-1" /> Home
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="me-1" /> About Us
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'envelope']" class="me-1" /> Contact Us
              </router-link>
            </li>
            <li>
              <router-link to="/category/business" class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'briefcase']" class="me-1" /> Business
              </router-link>
            </li>
            <li>
              <router-link to="/category/technology" class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'laptop-code']" class="me-1" /> Technology
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-4 mb-3">
          <h5 class="mb-3">Stay Connected</h5>
          <form class="d-flex mb-3 flex-column flex-md-row">
            <input type="email" class="form-control me-md-2 mb-2 mb-md-0" placeholder="Enter your email" />
            <button type="submit" class="btn btn-primary btn-gradient">Subscribe</button>
          </form>
          <div class="social-links">
            <a href="https://x.com/moses_onyi8290?t=3PhY-BwQPoPsZczv99F0jw&s=09" class="text-white me-3 social-icon">
              <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100083101250443" class="text-white me-3 social-icon">
              <font-awesome-icon :icon="['fab', 'facebook-f']" size="lg" />
            </a>
            <a href="https://www.instagram.com/mossanga_02?igsh=YzljYTK1ODg3Zg==" class="text-white social-icon">
              <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
            </a>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        <p class="mb-0">© 2025 BM24. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import bm24Logo from '@/assets/image/BM24.jpg';
</script>

<style scoped>
.footer-custom {
  background: #1a1a1a;
  color: #fff;
}
.gradient-divider {
  height: 4px;
  background: linear-gradient(90deg, #28A745, #FFC107);
  border-radius: 2px;
}
.footer-logo {
  height: 45px;
  width: auto;
  transition: transform 0.3s ease;
}
.footer-logo:hover {
  transform: scale(1.1);
}
h3 {
  font-size: 1.5rem;
}
h5 {
  font-size: 1.1rem;
}
p, a {
  font-size: 0.9rem;
}
.text-white:hover {
  color: #FFC107 !important;
}
.social-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}
.social-icon:hover {
  color: #FFC107 !important;
  transform: scale(1.3);
}
.form-control {
  border-radius: 25px;
  padding: 8px 12px;
  font-size: 0.9rem;
}
.btn-gradient {
  background: linear-gradient(45deg, #28A745, #FFC107);
  border: none;
  padding: 8px 15px;
  font-size: 0.9rem;
}
.btn-gradient:hover {
  background: linear-gradient(45deg, #218838, #e0a800);
}
.animate-section {
  animation: fadeIn 1.2s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 768px) {
  .footer-logo {
    height: 40px;
  }
  h3 {
    font-size: 1.3rem;
  }
  h5 {
    font-size: 1rem;
  }
}
</style>