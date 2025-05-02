import { createStore } from 'vuex';
import axios from 'axios';


const API_BASE_URL = 'https://alvahtek.com/projects/ota/api/news-api/';

export default createStore({
  state: {
    allNews: [],
    headlineNews: null,
    selectedNews: null,
    categorizedNews: [],
    filteredNews: [],
    error: null,
  },
  mutations: {
    SET_ALL_NEWS(state, news) {
      state.allNews = news;
      // Initialize filteredNews with all news
      state.filteredNews = news;
    },
    SET_HEADLINE_NEWS(state, news) {
      state.headlineNews = news;
    },
    SET_SELECTED_NEWS(state, news) {
      state.selectedNews = news;
    },
    SET_CATEGORIZED_NEWS(state, news) {
      state.categorizedNews = news;
    },
    SET_FILTERED_NEWS(state, news) {
      state.filteredNews = news;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchAllNews({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php`);
        commit('SET_ALL_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching all news:', error);
      }
    },
    async fetchHeadlineNews({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php?type=headline`);
        commit('SET_HEADLINE_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching headline news:', error);
      }
    },
    async fetchNewsByUuid({ commit }, uuid) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php?uuid=${uuid}`);
        commit('SET_SELECTED_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching news by UUID:', error);
      }
    },
    async fetchNewsByCategory({ commit }, category) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php?category=${category}`);
        commit('SET_CATEGORIZED_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching news by category:', error);
      }
    },
  },
  getters: {
    allNews: (state) => state.allNews,
    headlineNews: (state) => state.headlineNews,
    selectedNews: (state) => state.selectedNews,
    categorizedNews: (state) => state.categorizedNews,
    filteredNews: (state) => state.filteredNews,
    error: (state) => state.error,
  },
});