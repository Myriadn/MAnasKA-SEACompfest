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
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
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
