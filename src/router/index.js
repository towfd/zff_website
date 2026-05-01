import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/product', name: 'Product', component: () => import('../views/ProductView.vue') },
  { path: '/application', name: 'Application', component: () => import('../views/AboutView.vue') },
  { path: '/news', name: 'News', component: () => import('../views/AboutView.vue') },
  { path: '/support', name: 'Support', component: () => import('../views/AboutView.vue') },
  { path: '/partnerships', name: 'Partnerships', component: () => import('../views/AboutView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
