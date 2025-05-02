<template>
  <div class="container my-5">
    <h2 class="fw-bold text-success">Contact Us</h2>
    <p class="fst-italic fw-bold">Have questions or want to advertise with us? Fill out the form below, and we'll get back to you!</p>
    <form action="https://formspree.io/f/xgvkaopy" method="POST" class="row g-3">
      <input type="hidden" name="_subject" value="New Contact Form Submission - NewsApp" />
      <input type="hidden" name="_next" value="http://localhost:5173/contact" />
      <input type="hidden" name="_url" value="http://localhost:5173/contact" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_autoresponse" value="Thank you for contacting NewsApp! We have received your message and will get back to you soon." />
      <div class="col-md-6">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" name="name" required />
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email" required />
      </div>
      <div class="col-12">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Send Message</button>
      </div>
    </form>
  </div>
</template>

<script setup>
// No script logic needed
</script>