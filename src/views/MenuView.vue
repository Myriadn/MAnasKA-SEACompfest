<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center mb-6">Our Meal Plans</h1>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Choose from our selection of carefully crafted meal plans designed to meet your nutritional
        needs and taste preferences.
      </p>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="loading loading-spinner loading-lg text-primary"></div>
        <span class="ml-4 text-lg">Loading meal plans...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="alert alert-error shadow-lg max-w-2xl mx-auto">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ error }}</span>
        </div>
      </div>

      <!-- Content -->
      <div v-else class="grid md:grid-cols-3 gap-8">
        <MealPlanCard
          v-for="(plan, index) in mealPlans"
          :key="plan.id || index"
          :plan="plan"
          @show-details="openModal(plan)"
        />
      </div>

      <!-- No meal plans found -->
      <div v-if="!loading && !error && mealPlans.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600">No meal plans found.</p>
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
import { MealPlanService } from '@/services/mealPlanService'

export default {
  name: 'MenuView',
  components: {
    AppHeader,
    AppFooter,
    MealPlanCard,
  },
  data() {
    return {
      mealPlans: [],
      loading: true,
      error: null,
      showModal: false,
      selectedPlan: null,
    }
  },
  async created() {
    try {
      this.loading = true
      this.mealPlans = await MealPlanService.getAllMealPlans()
      this.loading = false
    } catch (error) {
      this.error = 'Failed to load meal plans: ' + error.message
      this.loading = false
      console.error('Error loading meal plans:', error)
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
