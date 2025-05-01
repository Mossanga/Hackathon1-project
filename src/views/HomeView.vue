<template>
  <div class="container my-5">
    <!-- BM24 Logo -->
    <!-- <div class="text-center mb-4">
      <img :src="bm24Logo" alt="BM24 Logo" class="bm24-logo" />
    </div> -->

    <!-- Carousel -->
    <div id="newsCarousel" class="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="5000">
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in carouselSlides"
          :key="index"
          type="button"
          :data-bs-target="'#newsCarousel'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : 'false'"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in carouselSlides"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img :src="slide.image" class="d-block w-100 carousel-img" :alt="slide.title" />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ slide.title }}</h5>
            <router-link
              v-if="slide.uuid"
              :to="`/news/${slide.uuid}`"
              class="btn btn-primary"
            >Read More</router-link>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#newsCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#newsCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search bm24 news..."
        @input="filterNews"
      />
    </div>

    <!-- Headline News -->
    <div v-if="headlineNews" class="mb-5">
      <h2>Headline News</h2>
      <div class="card">
        <img :src="headlineNews.image_url" class="card-img-top" :alt="headlineNews.title" />
        <div class="card-body">
          <h3 class="card-title">{{ headlineNews.title }}</h3>
          <p class="card-text">{{ headlineNews.description }}</p>
          <router-link :to="`/news/${headlineNews.uuid}`" class="btn btn-primary">Read More</router-link>
        </div>
      </div>
    </div>

    <!-- All News -->
    <h2>All News</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div v-for="news in filteredNews" :key="news.uuid" class="col-md-4 mb-4">
        <NewsCard :news="news" />
      </div>
      <div v-if="!filteredNews.length" class="col-12">
        <p>No news found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import NewsCard from '../components/NewsCard.vue';
import bm24Logo from '@/assets/image/BM24.jpg';

// Vuex store
const store = useStore();

// Reactive state
const loading = ref(false);
const searchQuery = ref('');
const filteredNews = ref([]);

// Computed properties (getters)
const allNews = computed(() => store.getters.allNews);
const headlineNews = computed(() => store.getters.headlineNews);

// Carousel slides
const carouselSlides = computed(() => {
  const slides = [];
  if (allNews.value && allNews.value.length > 0) {
    // Use up to 3 news items
    for (let i = 0; i < Math.min(3, allNews.value.length); i++) {
      slides.push({
        image: allNews.value[i].image_url || 'https://via.placeholder.com/800x400?text=News+Image',
        title: allNews.value[i].title || 'News Title',
        uuid: allNews.value[i].uuid,
      });
    }
  } else {
    // Fallback placeholder slides
    slides.push(
      {
        image: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=BM24+News+1',
        title: 'Welcome to BM24',
      },
      {
        image: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=BM24+News+2',
        title: 'Stay Updated',
      },
      {
        image: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=BM24+News+3',
        title: 'Breaking News',
      }
    );
  }
  return slides;
});

// Methods
const filterNews = () => {
  const query = searchQuery.value.toLowerCase();
  filteredNews.value = allNews.value.filter(
    (news) =>
      news.title.toLowerCase().includes(query) ||
      news.description.toLowerCase().includes(query)
  );
};

// Fetch data on mount
onMounted(async () => {
  loading.value = true;
  await Promise.all([
    store.dispatch('fetchAllNews'),
    store.dispatch('fetchHeadlineNews'),
  ]);
  filteredNews.value = allNews.value; // Initialize filteredNews
  loading.value = false;
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
.bm24-logo {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.carousel-img {
  height: 400px; /* Adjust carousel image height */
  object-fit: cover; /* Ensure images fit well */
}
.carousel-caption {
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background for readability */
  padding: 10px;
  border-radius: 5px;
}
</style>