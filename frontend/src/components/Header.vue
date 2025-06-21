<template>
  <header class="bg-base-100 shadow-md sticky top-0 z-50">
    <div class="navbar container mx-auto">
      <div class="flex-1">
        <div class="flex items-center">
          <div class="avatar">
            <div class="w-16 rounded-full bg-success-content p-2">
              <span class="text-success text-2xl font-bold">SEA</span>
            </div>
          </div>
          <div class="ml-4">
            <h1 class="text-2xl font-bold text-primary">SEA Catering</h1>
            <p class="text-secondary text-sm">Healthy Meals, Anytime, Anywhere</p>
          </div>
        </div>
      </div>
      <div class="flex-none hidden md:block">
        <ul class="menu menu-horizontal px-1 space-x-2">
          <li><a class="text-lg font-medium hover:text-primary">Home</a></li>
          <li><a class="text-lg font-medium hover:text-primary">Menu</a></li>
          <li><a class="text-lg font-medium hover:text-primary">Contact</a></li>
          <li>
            <button class="btn btn-primary text-white">
              Order Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div class="flex-none md:hidden">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
}
</style>
