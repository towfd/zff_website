import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/product', name: 'Product', component: () => import('../views/ProductView.vue') },
  { path: '/product/:id', name: 'ProductDetail', component: () => import('../views/ProductDetailView.vue') },
  { path: '/application', name: 'Application', component: () => import('../views/ApplicationView.vue') },
  { path: '/news', name: 'News', component: () => import('../views/NewsView.vue') },
  { path: '/support', name: 'Support', component: () => import('../views/SupportView.vue') },
  { path: '/partnerships', name: 'Partnerships', component: () => import('../views/PartnershipsView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 90 }
    return { top: 0 }
  },
})
