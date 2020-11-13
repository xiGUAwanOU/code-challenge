import Vue from 'vue';
import App from '@/App.vue';

import '@/config/Axios';
import router from '@/config/Router';
import vuetify from '@/config/Vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
