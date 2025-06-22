<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center mb-12">Subscribe to Our Meal Plans</h1>
      <SubscriptionForm />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SubscriptionForm from '@/components/SubscriptionForm.vue'

export default {
  name: 'SubscriptionView',
  components: {
    AppHeader,
    AppFooter,
    SubscriptionForm,
  },
}
</script>
