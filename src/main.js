import axios from 'axios';
import moment from 'moment';
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import '../variables/animate.scss';
import App from './App.vue';
import i18n from './i18n';
import router from './router';
import conf from './services/config';

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
});

Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: conf.apiUrl,
    vuex: {
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }),
);
new Vue({
  router,
  i18n,
  axios,
  moment,
  render: h => h(App),
}).$mount('#app');

Vue.directive('black', (el, binding, vnode) => (el.style.color = '#5d5d5d'));
