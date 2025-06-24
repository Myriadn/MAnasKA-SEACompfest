<template>
  <header class="bg-base-100 shadow-md sticky top-0 z-50">
    <div class="navbar container mx-auto">
      <div class="flex-1">
        <router-link to="/" class="flex items-center">
          <div class="avatar">
            <div class="w-16 rounded-full bg-success-content p-2">
              <span class="text-success text-2xl font-bold">SEA</span>
            </div>
          </div>
          <div class="ml-4">
            <h1 class="text-2xl font-bold text-primary">SEA Catering</h1>
            <p class="text-secondary text-sm">Healthy Meals, Anytime, Anywhere</p>
          </div>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="flex-none hidden md:block">
        <ul class="menu menu-horizontal px-1 space-x-2">
          <li v-for="(item, index) in navItems" :key="index">
            <router-link
              :to="item.path"
              :class="{ 'text-primary font-bold': $route.path === item.path }"
              class="text-lg hover:text-primary transition-colors"
            >
              {{ item.label }}
            </router-link>
          </li>

          <!-- Profile Dropdown untuk user login -->
          <div v-if="user" class="dropdown dropdown-end ml-4">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div
                class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center"
              >
                <span>{{ userInitials }}</span>
              </div>
            </div>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <router-link to="/profile" class="justify-between"> Profile </router-link>
              </li>
              <li>
                <router-link to="/dashboard" class="justify-between">
                  My Subscriptions
                  <span class="badge badge-primary">New</span>
                </router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin" class="justify-between"> Admin Dashboard </router-link>
              </li>
              <li><a @click="handleLogout">Logout</a></li>
            </ul>
          </div>

          <!-- Auth buttons untuk user belum login -->
          <div v-else class="flex items-center space-x-4 ml-4">
            <router-link to="/login" class="btn btn-outline btn-primary btn-sm">Login</router-link>
            <router-link to="/register" class="btn btn-primary btn-sm">Register</router-link>
          </div>
        </ul>
      </div>

      <!-- Mobile Navigation -->
      <div class="flex-none md:hidden">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-for="(item, index) in navItems" :key="index">
              <router-link
                :to="item.path"
                :class="{ 'text-primary font-bold': $route.path === item.path }"
              >
                {{ item.label }}
              </router-link>
            </li>

            <!-- Auth section untuk mobile -->
            <li v-if="user">
              <router-link to="/profile">Profile</router-link>
            </li>
            <li v-if="user">
              <router-link to="/dashboard">My Subscriptions</router-link>
            </li>
            <li v-if="user && isAdmin">
              <router-link to="/admin">Admin Dashboard</router-link>
            </li>
            <li v-if="user">
              <a @click="handleLogout">Logout</a>
            </li>
            <template v-if="!user">
              <li>
                <router-link to="/login">Login</router-link>
              </li>
              <li>
                <router-link to="/register">Register</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase/client'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const isAdmin = ref(false)

    // Check if current user is an admin
    const checkAdminStatus = async () => {
      if (!userStore.user) return false

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userStore.user.id)
          .single()

        if (error || !data) return false

        isAdmin.value = data.is_admin === true
        return data.is_admin === true
      } catch (error) {
        console.error('Error checking admin status:', error)
        return false
      }
    }

    // Load user on component mount
    onMounted(async () => {
      await userStore.loadUser()
      if (userStore.user) {
        await checkAdminStatus()
      }
    })

    // Handle logout
    const handleLogout = async () => {
      await supabase.auth.signOut()
      userStore.setUser(null)
      router.push('/login')
    }

    // Get user initials for avatar
    const userInitials = computed(() => {
      if (!userStore.user?.user_metadata?.full_name) return 'U'
      const names = userStore.user.user_metadata.full_name.split(' ')
      return names
        .slice(0, 2)
        .map((name) => name[0])
        .join('')
        .toUpperCase()
    })

    return {
      user: computed(() => userStore.user),
      isAdmin,
      userInitials,
      handleLogout,
    }
  },
  data() {
    return {
      navItems: [
        { path: '/', label: 'Home' },
        { path: '/menu', label: 'Meal Plans' },
        { path: '/subscription', label: 'Subscription' },
        { path: '/contact', label: 'Contact Us' },
      ],
    }
  },
}
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary);
  font-weight: bold;
}
</style>
