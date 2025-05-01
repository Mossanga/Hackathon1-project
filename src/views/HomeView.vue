<template>
  <div class="container my-5 animate-section">
    <!-- BM24 Logo -->
    <div class="text-center mb-5">
      <img :src="bm24Logo" alt="BM24 Logo" class="bm24-logo" />
    </div>

    <!-- Carousel -->
    <div id="newsCarousel" class="carousel slide mb-5" data-bs-ride="carousel" data-bs-interval="5000">
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
    <div class="mb-5 search-bar-container">
      <form @submit.prevent="filterNews" class="d-flex">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control search-bar me-2"
          placeholder="Search bm24 news..."
          @keypress.enter="filterNews"
        />
        <button type="submit" class="btn btn-primary me-2">Search</button>
        <button type="button" class="btn btn-secondary" @click="clearSearch">Clear</button>
      </form>
    </div>

    <!-- Headline News -->
    <div v-if="headlineNews" class="mb-5 animate-section">
      <h2 class="section-title">Headline News</h2>
      <div class="card shadow-sm">
        <img :src="headlineNews.image_url" class="card-img-top" :alt="headlineNews.title" />
        <div class="card-body">
          <h3 class="card-title">{{ headlineNews.title }}</h3>
          <p class="card-text">{{ headlineNews.description }}</p>
          <router-link :to="`/news/${headlineNews.uuid}`" class="btn btn-primary">Read More</router-link>
        </div>
      </div>
    </div>

    <!-- All News -->
    <h2 class="section-title">All News</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row animate-section">
      <div v-for="news in filteredNews" :key="news.uuid" class="col-md-4 mb-4">
        <NewsCard :news="news" />
      </div>
      <div v-if="!filteredNews.length && !loading" class="col-12">
        <p class="text-muted">No news found. Try a different search term.</p>
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
const allNews = computed(() => {
  const news = store.getters.allNews || [];
  console.log('Computed allNews:', news); // Debug
  return news;
});
const headlineNews = computed(() => store.getters.headlineNews);

// Fallback placeholder news
const placeholderNews = [
  {
    uuid: '1',
    title: 'Sample News 1',
    description: 'This is a sample news article for testing.',
    image_url: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=Sample+News+1',
  },
  {
    uuid: '2',
    title: 'Sample News 2',
    description: 'Another sample news article for testing search.',
    image_url: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=Sample+News+2',
  },
  {
    uuid: '3',
    title: 'Sample News 3',
    description: 'Testing the search functionality with this article.',
    image_url: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=Sample+News+3',
  },
];

// Carousel slides
const carouselSlides = computed(() => {
  const slides = [];
  const newsSource = allNews.value && allNews.value.length > 0 ? allNews.value : placeholderNews;
  for (let i = 0; i < Math.min(3, newsSource.length); i++) {
    slides.push({
      image: newsSource[i].image_url || 'https://via.placeholder.com/800x400?text=News+Image',
      title: newsSource[i].title || 'News Title',
      uuid: newsSource[i].uuid,
    });
  }
  return slides;
});

// Filter news function
const filterNews = () => {
  try {
    console.log('Search triggered with query:', searchQuery.value); // Debug
    const query = searchQuery.value.trim().toLowerCase();
    const newsSource = allNews.value && allNews.value.length > 0 ? allNews.value : placeholderNews;
    if (!query) {
      filteredNews.value = newsSource;
      console.log('No query, showing all news:', filteredNews.value); // Debug
      return;
    }
    filteredNews.value = newsSource.filter((news) => {
      const title = news.title ? String(news.title).toLowerCase() : '';
      const description = news.description ? String(news.description).toLowerCase() : '';
      const matches = title.includes(query) || description.includes(query);
      console.log(`News "${title}" matches "${query}":`, matches); // Debug
      return matches;
    });
    console.log('Filtered news:', filteredNews.value); // Debug
  } catch (error) {
    console.error('Error filtering news:', error);
    filteredNews.value = [];
  }
};

// Clear search function
const clearSearch = () => {
  searchQuery.value = '';
  const newsSource = allNews.value && allNews.value.length > 0 ? allNews.value : placeholderNews;
  filteredNews.value = newsSource;
  console.log('Search cleared, showing all news:', filteredNews.value); // Debug
};

// Fetch data on mount
onMounted(async () => {
  loading.value = true;
  try {
    console.log('Fetching news...'); // Debug
    await Promise.all([
      store.dispatch('fetchAllNews'),
      store.dispatch('fetchHeadlineNews'),
    ]);
    filteredNews.value = allNews.value && allNews.value.length > 0 ? allNews.value : placeholderNews;
    console.log('Initial filteredNews:', filteredNews.value); // Debug
  } catch (error) {
    console.error('Error fetching news:', error);
    filteredNews.value = placeholderNews; // Fallback to placeholder
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Typography and Spacing */
.container {
  padding: 0 15px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #28A745;
  margin-bottom: 1.5rem;
}

/* Circular Logo */
.bm24-logo {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.bm24-logo:hover {
  transform: scale(1.1);
}

/* Carousel */
.carousel-img {
  height: 400px;
  object-fit: cover;
  filter: brightness(80%);
  transition: filter 0.3s ease;
}
.carousel-item:hover .carousel-img {
  filter: brightness(100%);
}
.carousel-caption {
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
  bottom: 20px;
}
.carousel-caption h5 {
  font-size: 1.5rem;
  font-weight: 600;
}
.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  background: rgba(0, 0, 0, 0.3);
}

/* Search Bar */
.search-bar-container {
  max-width: 600px;
  margin: 0 auto;
}
.search-bar {
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.search-bar:focus {
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  outline: none;
}

/* News Cards */
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}
.card-text {
  color: #555;
}

/* Animations */
.animate-section {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>