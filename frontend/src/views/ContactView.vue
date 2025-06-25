<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <ContactSection />
    <FeedbackCard />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import FeedbackCard from '@/components/FeedbackCard.vue'

export default {
  name: 'ContactView',
  components: {
    AppHeader,
    AppFooter,
    ContactSection,
    FeedbackCard,
  },
}
</script>
