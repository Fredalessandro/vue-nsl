import { createApp } from 'vue';
import App from './App1.vue'
import router from '@/router/index.js';
import Mask from 'ionic-vue-input-mask';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import store from '@/store';
import fromPairs from 'lodash/fromPairs';

const globalObject = {
  diretor: null,
};

const app = createApp(App);
  app.provide('globalObject', globalObject);
  app.use(IonicVue);
  app.use(Mask);
  app.use(store);
  app.use(router);

router.isReady().then(() => {
  app.mount('#app');

});







