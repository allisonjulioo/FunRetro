import Vue from 'vue'
import Router from 'vue-router'
import MinhasRetros from '../views/MinhasRetros.vue'
import CreateBoard from '../views/CreateRetro.vue'
import LoginComponent from '../views/Login.vue'
import Axios from 'axios'

Vue.prototype.$http = Axios
const accessToken = localStorage.getItem('access_token')
Vue.use(Router)

const authGuard = (to, from, next) => {
  const loggedIn = localStorage.getItem('uitoken')

  if (!loggedIn) {
    return next('/login')
  }

  next()
}

const routes = [
  {
    path: '/minhas_retros',
    name: 'minhas_retros',
    component: MinhasRetros,
     beforeEnter: authGuard
  },
  {
    path: '/board/:idBoard',
    name: 'board/:idBoard',
    component: CreateBoard,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  apiUrl: 'http://localhost:8000',
  linkExactActiveClass: 'is-active',
  routes
})

export default router
