import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import SubscriptionView from '@/views/SubscriptionView.vue'
import ContactView from '@/views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView,
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: SubscriptionView,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
