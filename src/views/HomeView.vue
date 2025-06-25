<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <HeroSection />

    <!-- About Section -->
    <AboutSection />

    <!-- Features/Services Section -->
    <FeaturesSection />

    <!-- Testimonials Section -->
    <TestimonialsSectionHome />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import TestimonialsSectionHome from '@/components/sections/TestimonialsSectionHome.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    AppFooter,
    HeroSection,
    AboutSection,
    FeaturesSection,
    TestimonialsSectionHome,
    ContactSection,
  },
}
</script>
