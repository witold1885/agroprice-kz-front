import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CompleteRegister from '../views/Profile/CompleteRegister.vue'
import ResetPassword from '../views/Actions/ResetPassword.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    component: AboutView
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
    children: [
      {
        path: 'complete-register',
        component: CompleteRegister
      }
    ]
  },
  {
    path: '/reset-password/:token?',
    name: 'reset-password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    component: ResetPassword
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
