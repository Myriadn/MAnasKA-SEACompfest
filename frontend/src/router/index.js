import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/middleware/auth'
import AdminDashboard from '@/views/AdminDashboard.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import SubscriptionView from '@/views/SubscriptionView.vue'
import ContactView from '@/views/ContactView.vue'
import SchemaCheckerView from '@/views/SchemaCheckerView.vue'

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
    path: '/contact',
    name: 'Contact',
    component: ContactView,
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: SubscriptionView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/schema-checker',
    name: 'SchemaChecker',
    component: SchemaCheckerView,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: () => import('@/views/UserDashboardView.vue'),
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/schema-checker',
  //   name: 'SchemaChecker',
  //   component: SchemaCheckerView,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   },
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)

export default router
