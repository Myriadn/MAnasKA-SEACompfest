<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
    <div class="card-body items-center text-center p-8">
      <div class="text-5xl mb-4">{{ icon }}</div>
      <h3 class="card-title text-2xl text-primary mb-3">{{ title }}</h3>
      <p class="text-gray-600">{{ description }}</p>
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
