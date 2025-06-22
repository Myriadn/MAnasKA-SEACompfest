<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold mb-6">Subscription Plans</h1>
      <p class="text-xl mb-12">Coming soon! We're working on our subscription system.</p>
      <div class="max-w-md mx-auto">
        <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64"></div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'SubscriptionView',
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>
