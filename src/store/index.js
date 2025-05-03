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
      state.filteredNews = news;
      console.log('SET_ALL_NEWS:', news);
    },
    SET_HEADLINE_NEWS(state, news) {
      state.headlineNews = news;
      console.log('SET_HEADLINE_NEWS:', news);
    },
    SET_SELECTED_NEWS(state, news) {
      state.selectedNews = news;
    },
    SET_CATEGORIZED_NEWS(state, news) {
      state.categorizedNews = news;
    },
    SET_FILTERED_NEWS(state, news) {
      state.filteredNews = news;
      console.log('SET_FILTERED_NEWS:', news);
    },
    SET_ERROR(state, error) {
      state.error = error;
      console.log('SET_ERROR:', error);
    },
  },
  actions: {
    async fetchAllNews({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php`);
        const news = Array.isArray(response.data) ? response.data : [];
        commit('SET_ALL_NEWS', news);
        console.log('API news fetched:', news);
      } catch (error) {
        console.error('Error fetching all news:', error);
        const fallbackNews = [
          { uuid: '1', title: 'Sample News 1', description: 'This is a sample news article for testing.', image_url: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=Sample+News+1' },
          { uuid: '2', title: 'Sample News 2', description: 'Another sample news article for testing search.', image_url: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=Sample+News+2' },
          { uuid: '3', title: 'Sample News 3', description: 'Testing the search functionality with this article.', image_url: 'https://via.placeholder.com/800x400/28A745/FFFFFF?text=Sample+News+3' },
        ];
        commit('SET_ALL_NEWS', fallbackNews);
        commit('SET_ERROR', 'Failed to fetch news, using fallback data.');
      }
    },
    async fetchHeadlineNews({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php?type=headline`);
        commit('SET_HEADLINE_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching headline news:', error);
        commit('SET_HEADLINE_NEWS', null);
        commit('SET_ERROR', 'Failed to fetch headline news.');
      }
    },
    async fetchNewsByUuid({ commit }, uuid) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php?uuid=${uuid}`);
        commit('SET_SELECTED_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching news by UUID:', error);
        commit('SET_ERROR', 'Failed to fetch news by UUID.');
      }
    },
    async fetchNewsByCategory({ commit }, category) {
      try {
        const response = await axios.get(`${API_BASE_URL}news.php?category=${category}`);
        commit('SET_CATEGORIZED_NEWS', response.data);
      } catch (error) {
        console.error('Error fetching news by category:', error);
        commit('SET_ERROR', 'Failed to fetch news by category.');
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