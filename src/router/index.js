import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import CompleteRegister from '../views/Profile/CompleteRegister.vue'
import Preferences from '../views/Profile/Preferences.vue'
import ResetPassword from '../views/Actions/ResetPassword.vue'
import CreateProduct from '../views/Product/CreateProduct.vue'
import ProductView from '../views/ProductView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
    children: [
      {
        path: 'complete-register',
        component: CompleteRegister
      },
      {
        path: 'preferences',
        component: Preferences
      },
    ]
  },
  {
    path: '/reset-password/:token?',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/catalog/:category?',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/create-product',
    name: 'create-product',
    component: CreateProduct
  },
  {
    path: '/product/:product?',
    name: 'product',
    component: ProductView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    beforeEnter: () => { window.location = `/404` }
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
