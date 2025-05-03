
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faBriefcase, faLaptopCode, faSearch, faTimes, faCheckCircle, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faHome, faInfoCircle, faEnvelope, faBriefcase, faLaptopCode, faSearch, faTimes, faCheckCircle, faArrowUp, faTwitter, faFacebookF, faInstagram);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');