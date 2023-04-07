import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import CatalogView from '../views/CatalogView.vue'
// import CompleteRegister from '../views/Profile/CompleteRegister.vue'
// import Preferences from '../views/Profile/Preferences.vue'
// import ProfileProducts from '../views/Profile/Products.vue'
// import ProfileFavorites from '../views/Profile/Favorites.vue'
// import ResetPassword from '../views/Actions/ResetPassword.vue'
// import CreateProduct from '../views/Product/CreateProduct.vue'
// import EditProduct from '../views/Product/EditProduct.vue'
// import ProductView from '../views/ProductView.vue'
// import SearchView from '../views/SearchView.vue'
// import BlogView from '../views/BlogView.vue'
// import Article from '../views/Blog/Article.vue'
// import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    // component: HomeView
  },
  {
    path: '/catalog/:category?',
    name: 'catalog',
    component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogView.vue'),
    // component: CatalogView
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    redirect: '/profile/preferences',
    children: [
      {
        path: 'complete-register',
        component: () => import(/* webpackChunkName: "profile-complete-register" */ '../views/Profile/CompleteRegister.vue'),
        // component: CompleteRegister
      },
      {
        path: 'preferences',
        component: () => import(/* webpackChunkName: "profile-preferences" */ '../views/Profile/Preferences.vue'),
        // component: Preferences
      },
      {
        path: 'products/:status?',
        component: () => import(/* webpackChunkName: "profile-products" */ '../views/Profile/Products.vue'),
        // component: ProfileProducts
      },
      {
        path: 'favorites',
        component: () => import(/* webpackChunkName: "profile-favorites" */ '../views/Profile/Favorites.vue'),
        // component: ProfileFavorites
      },
    ]
  },
  {
    path: '/reset-password/:token?',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "reset-password" */ '../views/Actions/ResetPassword.vue'),
    // component: ResetPassword
  },
  {
    path: '/create-product',
    name: 'create-product',
    component: () => import(/* webpackChunkName: "create-product" */ '../views/Product/CreateProduct.vue'),
    // component: CreateProduct
  },
  {
    path: '/edit-product/:product_id',
    name: 'edit-product',
    component: () => import(/* webpackChunkName: "edit-product" */ '../views/Product/EditProduct.vue'),
    // component: EditProduct
  },
  {
    path: '/product/:product?',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductView.vue'),
    // component: ProductView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchView.vue'),
    // component: SearchView
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/BlogView.vue'),
    // component: BlogView
  },
  {
    path: '/blog/:article',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Blog/Article.vue'),
    // component: Article
  },
  {
    path: '/doc/:doc',
    name: 'doc',
    component: () => import(/* webpackChunkName: "doc" */ '../views/DocView.vue'),
    // component: Article
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // eslint-disable-next-line
    beforeEnter: (to, from, next) => {
      next(`/404`)
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFoundView.vue'),
    // component: NotFoundView
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
