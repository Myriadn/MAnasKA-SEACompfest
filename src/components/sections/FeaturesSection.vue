<template>
  <section class="py-16 bg-gradient-to-br from-base-100 to-primary/5">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div class="badge badge-primary badge-lg text-white mb-4 px-6 py-3">Our Services</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-6">Why Choose SEA Catering</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the key features that make our service stand out
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Meal Customization"
          description="Create meals tailored to your dietary preferences and needs"
          icon="🍽️"
        />
        <FeatureCard
          title="Nationwide Delivery"
          description="Delivered to all major cities across Indonesia"
          icon="🚚"
        />
        <FeatureCard
          title="Nutritional Transparency"
          description="Detailed nutritional information for every meal"
          icon="📊"
        />
      </div>
    </div>
  </section>
</template>

<script>
import FeatureCard from '@/components/FeatureCard.vue'

export default {
  name: 'FeaturesSection',
  components: {
    FeatureCard,
  },
}
</script>
