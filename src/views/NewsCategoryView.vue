<template>
  <div class="container my-5">
    <h2>{{ capitalize(route.params.category) }} News</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div v-for="news in categorizedNews" :key="news.uuid" class="col-md-4 mb-4">
        <NewsCard :news="news" />
      </div>
      <div v-if="!categorizedNews.length" class="col-12">
        <p>No news found for this category.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import NewsCard from '../components/NewsCard.vue';

// Vuex store and route
const store = useStore();
const route = useRoute();

// Reactive state
const loading = ref(false);

// Computed properties
const categorizedNews = computed(() => store.getters.categorizedNews);

// Fetch data on mount
onMounted(async () => {
  loading.value = true;
  await store.dispatch('fetchNewsByCategory', route.params.category);
  loading.value = false;
});

// Capitalize function
const capitalize = (value) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};
</script>