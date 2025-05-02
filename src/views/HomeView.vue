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
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row animate-section">
      <div v-for="news in filteredNews" :key="news.uuid" class="col-12 col-md-6 col-lg-4 mb-4">
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

// Computed properties (getters)
const allNews = computed(() => store.getters.allNews || []);
const filteredNews = computed(() => store.getters.filteredNews || []);
const headlineNews = computed(() => store.getters.headlineNews);
const error = computed(() => store.getters.error);

// Carousel slides
const carouselSlides = computed(() => {
  const slides = [];
  const newsSource = allNews.value && allNews.value.length > 0 ? allNews.value : [
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
  for (let i = 0; i < Math.min(3, newsSource.length); i++) {
    slides.push({
      image: newsSource[i].image_url || 'https://via.placeholder.com/800x400?text=News+Image',
      title: newsSource[i].title || 'News Title',
      uuid: newsSource[i].uuid,
    });
  }
  return slides;
});

// Fetch data on mount
onMounted(async () => {
  loading.value = true;
  try {
    console.log('Fetching news...'); // Debug
    await Promise.all([
      store.dispatch('fetchAllNews'),
      store.dispatch('fetchHeadlineNews'),
    ]);
    console.log('Initial filteredNews:', filteredNews.value); // Debug
  } catch (error) {
    console.error('Error fetching news:', error);
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
  padding: 0 15px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Circular Logo */
.bm24-logo {
  height: 100px;
  width: 100px;
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
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.carousel-item:hover .carousel-img {
  transform: scale(1.05);
}
.carousel-caption {
  background: rgba(0, 0, 0, 0.75);
  padding: 15px;
  border-radius: 10px;
  bottom: 20px;
}
.carousel-caption h5 {
  font-size: 1.5rem;
  font-weight: 700;
}
.carousel-control-prev,
.carousel-control-next {
  width: 10%;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
  background: rgba(0, 0, 0, 0.6);
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
  height: 200px;
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
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  z-index: 1;
}
.card-text {
  color: #ddd;
  position: relative;
  z-index: 1;
  font-size: 0.9rem;
}

/* Buttons */
.btn-gradient {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
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
@media (max-width: 992px) {
  .carousel-img {
    height: 350px;
  }
  .section-title {
    font-size: 1.8rem;
  }
}
@media (max-width: 768px) {
  .bm24-logo {
    height: 80px;
    width: 80px;
  }
  .carousel-img {
    height: 300px;
  }
  .carousel-caption h5 {
    font-size: 1.2rem;
  }
  .card-img-top {
    height: 180px;
  }
  .card-title {
    font-size: 1.1rem;
  }
  .card-text {
    font-size: 0.85rem;
  }
}
@media (max-width: 576px) {
  .container {
    padding: 0 10px;
  }
  .bm24-logo {
    height: 60px;
    width: 60px;
  }
  .carousel-img {
    height: 250px;
  }
  .section-title {
    font-size: 1.5rem;
  }
}
</style>