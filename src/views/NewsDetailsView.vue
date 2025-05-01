<template>
  <div class="container my-5">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="selectedNews">
      <img :src="selectedNews.image_url" class="img-fluid mb-3" :alt="selectedNews.title" />
      <h1>{{ selectedNews.title }}</h1>
      <p><strong>Published:</strong> {{ selectedNews.published_at }}</p>
      <p><strong>Source:</strong> {{ selectedNews.source }}</p>
      <p>{{ selectedNews.description }}</p>
      <a :href="selectedNews.url" target="_blank" class="btn btn-primary">Read Full Article</a>
    </div>
    <div v-else>
      <p>News not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

// Vuex store and route
const store = useStore();
const route = useRoute();

// Reactive state
const loading = ref(false);

// Computed properties
const selectedNews = computed(() => store.getters.selectedNews);

// Fetch data on mount
onMounted(async () => {
  loading.value = true;
  await store.dispatch('fetchNewsByUuid', route.params.uuid);
  loading.value = false;
});
</script>

<style scoped>
.img-fluid {
  max-height: 500px;
  object-fit: cover;
}
</style>