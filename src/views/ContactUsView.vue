
<template>
  <div class="container my-5">
    <h1><font-awesome-icon :icon="['fas', 'envelope']" class="me-2" />Contact Us</h1>
    <form :action="formAction" method="POST" class="contact-form">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          placeholder="Your Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Your Email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea
          class="form-control"
          id="message"
          name="message"
          rows="5"
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      <input type="hidden" name="_subject" value="New Contact Form Submission" />
      <input
        type="hidden"
        name="_next"
        value="https://hackathon1-project-git-main-moses-onyilos-projects.vercel.app/thanks"
      />
      <input type="text" name="_gotcha" style="display: none;" />
      <button type="submit" class="btn btn-primary btn-gradient">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const formAction = computed(() => 'https://formspree.io/f/xgvkaopy');
</script>

<style scoped>
h1 {
  color: #28A745;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}
.form-control {
  border-radius: 10px;
  padding: 10px;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.form-control:focus {
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  border-color: #28A745;
}
.form-label {
  font-weight: 500;
  color: #333;
}
.btn-gradient {
  background: linear-gradient(45deg, #28A745, #FFC107);
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
}
@media (max-width: 576px) {
  .container {
    padding: 0 10px;
  }
  h1 {
    font-size: 1.5rem;
  }
  .form-control {
    font-size: 0.85rem;
  }
}
</style>