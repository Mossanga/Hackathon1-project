import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewsDetailsView from '../views/NewsDetailsView.vue';
import NewsCategoryView from '../views/NewsCategoryView.vue';
import AboutUsView from '../views/AboutUsView.vue';
import ContactUsView from '../views/ContactUsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/news/:uuid',
    name: 'NewsDetails',
    component: NewsDetailsView,
  },
  {
    path: '/category/:category',
    name: 'NewsCategory',
    component: NewsCategoryView,
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUsView,
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: ContactUsView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

export default router;