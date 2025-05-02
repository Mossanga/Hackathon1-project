<template>
  <div class="container my-5 animate-section">
    <!-- BM24 Logo -->
    <div class="text-center mb-5">
      <img :src="bm24Logo" alt="BM24 Logo" class="bm24-logo" />
    </div>

    <!-- Carousel -->
    <div id="newsCarousel" class="carousel slide mb-5 carousel-custom" data-bs-ride="carousel" data-bs-interval="5000">
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
              class="btn btn-primary btn-gradient"
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
      <form @submit.prevent="filterNews" class="d-flex align-items-center">
        <div class="input-group">
          <span class="input-group-text bg-white border-0">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control search-bar"
            placeholder="Search bm24 news..."
            @keypress.enter="filterNews"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-gradient ms-2">Search</button>
        <button type="button" class="btn btn-secondary btn-gradient ms-2" @click="clearSearch">Clear</button>
      </form>
    </div>

    <!-- Headline News -->
    <div v-if="headlineNews" class="mb-5 animate-section">
      <h2 class="section-title">Headline News</h2>
      <div class="card shadow-sm card-custom">
        <div class="card-img-overlay gradient-overlay"></div>
        <img :src="headlineNews.image_url" class="card-img-top" :alt="headlineNews.title" />
        <div class="card-body">
          <h3 class="card-title">{{ headlineNews.title }}</h3>
          <p class="card-text">{{ headlineNews.description }}</p>
          <router-link :to="`/news/${headlineNews.uuid}`" class="btn btn-primary btn-gradient">Read More</router-link>
        </div>
      </div>
    </div>

    <!-- All News -->
    <h2 class="section-title">All News</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row animate-section">
      <div v-for="news in filteredNews" :key="news.uuid" class="col-md-4 mb-4">
        <div class="card shadow-sm card-custom">
          <div class="card-img-overlay gradient-overlay"></div>
          <img :src="news.image_url" class="card-img-top" :alt="news.title" />
          <div class="card-body">
            <h5 class="card-title">{{ news.title }}</h5>
            <p class="card-text">{{ news.description }}</p>
            <router-link :to="`/news/${news.uuid}`" class="btn btn-primary btn-gradient">Read More</router-link>
          </div>
        </div>
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
:root {
  --primary-color: #28A745;
  --secondary-color: #FFC107;
}

/* Typography and Spacing */
.container {
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Circular Logo */
.bm24-logo {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.bm24-logo:hover {
  transform: scale(1.15);
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
}

/* Carousel */
.carousel-custom {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}
.carousel-img {
  height: 450px;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.carousel-item:hover .carousel-img {
  transform: scale(1.05);
}
.carousel-caption {
  background: rgba(0, 0, 0, 0.75);
  padding: 20px;
  border-radius: 10px;
  bottom: 30px;
}
.carousel-caption h5 {
  font-size: 1.8rem;
  font-weight: 700;
}
.carousel-control-prev,
.carousel-control-next {
  width: 8%;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
  background: rgba(0, 0, 0, 0.6);
}

/* Search Bar */
.search-bar-container {
  max-width: 700px;
  margin: 0 auto;
}
.input-group-text {
  background: #fff;
  border-radius: 25px 0 0 25px;
  color: var(--primary-color);
}
.search-bar {
  border: none;
  border-radius: 0 25px 25px 0;
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.search-bar:focus {
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
  border-color: var(--primary-color);
}
.btn-gradient {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 10px 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
}

/* News Cards */
.card-custom {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.card-custom:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}
.card-img-top {
  height: 220px;
  object-fit: cover;
}
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
  pointer-events: none;
}
.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  z-index: 1;
}
.card-text {
  color: #ddd;
  position: relative;
  z-index: 1;
}

/* Animations */
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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .bm24-logo {
    height: 80px;
    width: 80px;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .carousel-img {
    height: 300px;
  }
  .search-bar {
    padding: 12px;
  }
  .card-img-top {
    height: 180px;
  }
}
</style>