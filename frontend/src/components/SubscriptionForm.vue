<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-8 text-center">Subscribe to a Meal Plan</h2>

    <form @submit.prevent="submitForm">
      <input type="hidden" name="csrf_token" :value="csrfToken" />
      <!-- Name -->
      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Full Name *</label>
        <input
          type="text"
          v-model="form.name"
          class="input input-bordered w-full"
          required
          pattern="[A-Za-z .'-]+"
          title="Name should only contain letters, spaces, and characters like ., ', -"
        />
      </div>

      <!-- Phone -->
      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Phone Number *</label>
        <input
          type="tel"
          v-model="form.phone"
          class="input input-bordered w-full"
          required
          pattern="[0-9]{10,15}"
          title="Phone number should be 10-15 digits"
        />
      </div>

      <!-- Plan Selection -->
      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Select a Plan *</label>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label
            v-for="(plan, index) in plans"
            :key="index"
            class="card bg-base-100 border-2 cursor-pointer"
            :class="{ 'border-primary': form.plan === plan.name }"
          >
            <div class="card-body">
              <input
                type="radio"
                v-model="form.plan"
                :value="plan.name"
                class="radio radio-primary absolute top-4 right-4"
                required
              />
              <h3 class="card-title">{{ plan.name }}</h3>
              <p class="text-xl font-bold text-secondary">{{ plan.price }}</p>
              <p>{{ plan.description }}</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Meal Types -->
      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Meal Types *</label>
        <div class="flex flex-wrap gap-4">
          <label
            v-for="(meal, index) in mealTypes"
            :key="index"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              v-model="form.mealTypes"
              :value="meal.value"
              class="checkbox checkbox-primary"
            />
            <span>{{ meal.label }}</span>
          </label>
        </div>
        <p v-if="form.mealTypes.length === 0 && formSubmitted" class="text-error text-sm mt-1">
          Please select at least one meal type
        </p>
      </div>

      <!-- Delivery Days -->
      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Delivery Days *</label>
        <div class="flex flex-wrap gap-4">
          <label
            v-for="(day, index) in days"
            :key="index"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              v-model="form.days"
              :value="day.value"
              class="checkbox checkbox-primary"
            />
            <span>{{ day.label }}</span>
          </label>
        </div>
        <p v-if="form.days.length === 0 && formSubmitted" class="text-error text-sm mt-1">
          Please select at least one delivery day
        </p>
      </div>

      <!-- Allergies -->
      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Allergies / Dietary Restrictions</label>
        <textarea
          v-model="form.allergies"
          class="textarea textarea-bordered w-full"
          placeholder="List any allergies or dietary restrictions..."
        ></textarea>
      </div>

      <!-- Price Calculation -->
      <div class="bg-base-200 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-bold mb-4">Order Summary</h3>
        <div class="flex justify-between items-center">
          <span>Total:</span>
          <span class="text-2xl font-bold text-primary">{{ formatPrice(calculatedPrice) }}</span>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-error mb-4">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary btn-lg w-full" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="loading loading-spinner"></span>
        {{ isSubmitting ? 'Processing...' : 'Subscribe Now' }}
      </button>
    </form>
  </div>
</template>

<script>
import { SubscriptionService } from '@/services/subscriptionService'
import { generateCsrfToken, getCsrfToken } from '@/middleware/csrf'
import { validateInput } from '@/middleware/inputValidation'

export default {
  name: 'SubscriptionForm',
  data() {
    return {
      csrfToken: '',
      form: {
        name: '',
        phone: '',
        plan: '',
        mealTypes: [],
        days: [],
        allergies: '',
      },
      isSubmitting: false,
      errorMessage: '',
      formSubmitted: false,
      plans: [
        { name: 'Diet Plan', price: 'Rp30.000 / meal', description: 'Low calorie meals' },
        { name: 'Protein Plan', price: 'Rp40.000 / meal', description: 'High protein meals' },
        { name: 'Royal Plan', price: 'Rp60.000 / meal', description: 'Premium gourmet meals' },
      ],
      mealTypes: [
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' },
      ],
      days: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
      ],
    }
  },
  created() {
    // Generate CSRF token on component creation
    this.csrfToken = generateCsrfToken()
  },
  computed: {
    calculatedPrice() {
      // Only calculate if all required fields are filled
      if (!this.form.plan || this.form.mealTypes.length === 0 || this.form.days.length === 0) {
        return 0
      }

      const planPrices = {
        'Diet Plan': 30000,
        'Protein Plan': 40000,
        'Royal Plan': 60000,
      }

      const basePrice = planPrices[this.form.plan]
      const mealCount = this.form.mealTypes.length
      const dayCount = this.form.days.length

      return basePrice * mealCount * dayCount * 4.3
    },
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(price)
    },

    async submitForm() {
      this.formSubmitted = true
      this.errorMessage = ''

      // Form validation
      if (this.form.mealTypes.length === 0 || this.form.days.length === 0) {
        this.errorMessage = 'Please fill in all required fields'
        return
      }

      this.isSubmitting = true

      try {
        // Sanitize all inputs
        const sanitizedForm = {
          name: validateInput(this.form.name, 'name'),
          phone: validateInput(this.form.phone, 'phone'),
          plan: this.form.plan,
          mealTypes: this.form.mealTypes,
          days: this.form.days,
          allergies: validateInput(this.form.allergies, 'optional'),
          totalPrice: this.calculatedPrice,
          csrf_token: getCsrfToken(),
        }

        await SubscriptionService.createSubscription(sanitizedForm)

        // Show success message and reset form
        alert('Subscription created successfully!')
        this.resetForm()
      } catch (error) {
        console.error('Submission error:', error)
        this.errorMessage = error.message || 'An error occurred while creating your subscription'
      } finally {
        this.isSubmitting = false
      }
    },

    resetForm() {
      this.form = {
        name: '',
        phone: '',
        plan: '',
        mealTypes: [],
        days: [],
        allergies: '',
      }
      this.formSubmitted = false
      // Generate new CSRF token
      this.csrfToken = generateCsrfToken()
    },
  },
}
</script>
