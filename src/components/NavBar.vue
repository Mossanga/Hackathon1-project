
 <template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
    <div class="container-fluid px-3">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/image/BM24.jpg" alt="BM24 Logo" class="navbar-logo" />
        BM24
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <font-awesome-icon :icon="['fas', 'home']" class="me-1 nav-icon" /> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
              <font-awesome-icon :icon="['fas', 'info-circle']" class="me-1 nav-icon" /> About Us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">
              <font-awesome-icon :icon="['fas', 'envelope']" class="me-1 nav-icon" /> Contact Us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/category/business">
              <font-awesome-icon :icon="['fas', 'briefcase']" class="me-1 nav-icon" /> Business
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/category/technology">
              <font-awesome-icon :icon="['fas', 'laptop-code']" class="me-1 nav-icon" /> Technology
            </router-link>
          </li>
        </ul>
        <form @submit.prevent="filterNews" class="d-flex align-items-center search-form">
          <div class="input-group">
            <span class="input-group-text bg-white border-0">
              <font-awesome-icon :icon="['fas', 'search']" />
            </span>
            <input
              v-model="searchQuery"
              type="text"
              class="form-control search-bar"
              placeholder="Search news..."
              @keypress.enter="filterNews"
            />
          </div>
          <button type="button" class="btn btn-secondary btn-gradient ms-2" @click="clearSearch">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import bm24Logo from '@/assets/image/BM24.jpg';

// Vuex store and router
const store = useStore();
const router = useRouter();

// Reactive state
const searchQuery = ref('');

// Computed properties
const allNews = computed(() => store.getters.allNews || []);

// Placeholder news for fallback
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

// Filter news function
const filterNews = () => {
  try {
    console.log('Search triggered with query:', searchQuery.value); // Debug
    const query = searchQuery.value.trim().toLowerCase();
    const newsSource = allNews.value && allNews.value.length > 0 ? allNews.value : placeholderNews;
    let filtered = newsSource;
    if (query) {
      filtered = newsSource.filter((news) => {
        const title = news.title ? String(news.title).toLowerCase() : '';
        const description = news.description ? String(news.description).toLowerCase() : '';
        const matches = title.includes(query) || description.includes(query);
        console.log(`News "${title}" matches "${query}":`, matches); // Debug
        return matches;
      });
    }
    console.log('Filtered news:', filtered); // Debug
    store.commit('SET_FILTERED_NEWS', filtered);
    // Redirect to home if not already there
    if (router.currentRoute.value.path !== '/') {
      router.push('/');
    }
  } catch (error) {
    console.error('Error filtering news:', error);
    store.commit('SET_FILTERED_NEWS', []);
  }
};

// Clear search function
const clearSearch = () => {
  searchQuery.value = '';
  const newsSource = allNews.value && allNews.value.length > 0 ? allNews.value : placeholderNews;
  store.commit('SET_FILTERED_NEWS', newsSource);
  console.log('Search cleared, showing all news:', newsSource); // Debug
};
</script>

<style scoped>
.navbar-custom {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.navbar-logo {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-right: 10px;
  transition: transform 0.3s ease;
}
.navbar-logo:hover {
  transform: scale(1.1);
}
.nav-link {
  color: #fff !important;
  font-weight: 500;
  padding: 8px 12px;
  font-size: 0.9rem;
  transition: color 0.3s ease, transform 0.3s ease;
}
.nav-link:hover {
  color: #FFC107 !important;
  transform: translateY(-2px);
}
.nav-icon {
  color: #28A745;
  transition: color 0.3s ease, transform 0.3s ease;
}
.nav-link:hover .nav-icon {
  color: #FFC107;
  transform: scale(1.2);
}
.search-form {
  max-width: 300px;
}
.input-group-text {
  background: #fff;
  border-radius: 25px 0 0 25px;
  color: #28A745;
}
.search-bar {
  border: none;
  border-radius: 0 25px 25px 0;
  padding: 6px 12px;
  font-size: 0.85rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.search-bar:focus {
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  border-color: #28A745;
}
.btn-gradient {
  background: linear-gradient(45deg, #28A745, #FFC107);
  border: none;
  padding: 6px 10px;
  font-size: 0.85rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}
@media (max-width: 992px) {
  .search-form {
    max-width: 250px;
  }
  .search-bar {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
  .btn-gradient {
    padding: 5px 8px;
  }
}
@media (max-width: 768px) {
  .navbar-logo {
    height: 35px;
    width: 35px;
  }
  .nav-link {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
  .search-form {
    margin-top: 10px;
    max-width: 100%;
  }
}
@media (max-width: 576px) {
  .container-fluid {
    padding-left: 10px;
    padding-right: 10px;
  }
  .navbar-logo {
    height: 30px;
    width: 30px;
  }
  .search-bar {
    font-size: 0.75rem;
  }
}
</style>