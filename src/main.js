import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import axios from 'axios'
import moment from 'moment'
import '../variables/animate.scss'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  axios,
  moment,
  render: h => h(App)
}).$mount('#app')

Vue.directive('black', (el, binding, vnode) => (el.style.color = '#5d5d5d'))
