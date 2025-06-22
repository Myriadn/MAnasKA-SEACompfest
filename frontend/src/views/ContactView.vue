<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <ContactSection />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

export default {
  name: 'ContactView',
  components: {
    AppHeader,
    AppFooter,
    ContactSection,
  },
}
</script>
