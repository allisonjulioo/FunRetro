import Vue from 'vue'
import Router from 'vue-router'
import MinhasRetros from '../views/MinhasRetros.vue'
import CreateBoard from '../views/CreateRetro.vue'
import Login from '../views/Login.vue'
import Axios from 'axios'

Vue.prototype.$http = Axios
const accessToken = localStorage.getItem('access_token')
Vue.use(Router)

const routes = [
  {
    path: '/minhas_retros',
    name: 'minhas_retros',
    component: MinhasRetros
  },
  {
    path: '/board/:idBoard',
    name: 'board/:idBoard',
    component: CreateBoard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '**',
    component: MinhasRetros
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  apiUrl: 'http://localhost:8000',
  linkExactActiveClass: 'is-active',
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('uitoken')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
