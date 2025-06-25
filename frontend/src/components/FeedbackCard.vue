<template>
  <div class="container mx-auto py-8">
    <!-- Feedback Section untuk UX yang lebih baik -->
    <div class="mt-8 bg-base-100 p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">How's your experience?</h2>
      <p class="mb-4 text-gray-600">We'd love to hear your feedback about our service!</p>
      <div class="flex flex-wrap gap-4">
        <router-link to="/testimonials" class="btn btn-outline btn-primary"
          >Give Feedback</router-link
        >
        <router-link to="/contact" class="btn btn-outline">Contact Support</router-link>
      </div>
    </div>
  </div>
</template>
