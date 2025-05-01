<template>
  <div class="card h-100">
    <img :src="news.image_url" class="card-img-top" :alt="news.title" />
    <div class="card-body">
      <h5 class="card-title">{{ news.title }}</h5>
      <p class="card-text">{{ news.description }}</p>
      <p class="card-text"><small class="text-muted">{{ news.categories }}</small></p>
      <router-link :to="`/news/${news.uuid}`" class="btn btn-primary">Read More</router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  news: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>