import Vue from 'vue';
import App from '@/App.vue';

import '@/config/Axios';
import router from '@/config/Router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
