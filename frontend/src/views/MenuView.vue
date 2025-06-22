<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center mb-12">Our Meal Plans</h1>

      <div class="grid md:grid-cols-3 gap-8">
        <MealPlanCard
          v-for="(plan, index) in mealPlans"
          :key="index"
          :plan="plan"
          @show-details="openModal(plan)"
        />
      </div>
    </div>
    <AppFooter />

    <!-- Modal for Meal Plan Details -->
    <div class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-2xl mb-4">{{ selectedPlan?.name }}</h3>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2">
            <img
              :src="selectedPlan?.image"
              alt="Meal Plan"
              class="rounded-lg w-full h-64 object-cover"
            />
          </div>
          <div class="md:w-1/2">
            <p class="text-lg mb-2"><strong>Price:</strong> {{ selectedPlan?.price }}</p>
            <p class="text-lg mb-4">{{ selectedPlan?.description }}</p>
            <div v-if="selectedPlan?.details">
              <h4 class="font-bold text-xl mb-2">What's Included:</h4>
              <ul class="list-disc pl-5">
                <li v-for="(detail, idx) in selectedPlan.details" :key="idx">{{ detail }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MealPlanCard from '@/components/MealPlanCard.vue'

export default {
  name: 'MenuView',
  components: {
    AppHeader,
    AppFooter,
    MealPlanCard,
  },
  data() {
    return {
      mealPlans: [
        {
          id: 1,
          name: 'Diet Plan',
          price: 'Rp30.000 / meal',
          description: 'Low calorie meals designed for weight loss',
          image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          details: [
            '1200-1500 calories per day',
            'Balanced macronutrients',
            'Vegetarian options available',
            'Weekly nutritionist consultation',
          ],
        },
        {
          id: 2,
          name: 'Protein Plan',
          price: 'Rp40.000 / meal',
          description: 'High protein meals for muscle building',
          image:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          details: [
            '30g+ protein per meal',
            'Lean meat and plant-based proteins',
            'Customizable protein sources',
            'Post-workout recovery options',
          ],
        },
        {
          id: 3,
          name: 'Royal Plan',
          price: 'Rp60.000 / meal',
          description: 'Premium gourmet meals with premium ingredients',
          image:
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          details: [
            'Chef-designed meals',
            'Organic and locally sourced ingredients',
            'Wide variety of international cuisines',
            'Priority delivery',
          ],
        },
      ],
      showModal: false,
      selectedPlan: null,
    }
  },
  methods: {
    openModal(plan) {
      this.selectedPlan = plan
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
}
</script>
