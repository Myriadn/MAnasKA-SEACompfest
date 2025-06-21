<template>
  <div
    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full"
  >
    <div class="card-body items-center text-center p-8">
      <div class="text-5xl mb-4">{{ icon }}</div>
      <h3 class="card-title text-2xl text-primary mb-3">{{ title }}</h3>
      <p class="text-gray-600">{{ description }}</p>
      <div class="card-actions mt-4">
        <button class="btn btn-ghost btn-sm text-primary">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '✅',
    },
  },
}
</script>
