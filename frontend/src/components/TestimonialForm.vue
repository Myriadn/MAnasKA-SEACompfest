<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-bold mb-6 text-center">Share Your Experience</h3>
    <div v-if="success" class="alert alert-success mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Thank you for your review! Your feedback helps us improve.</span>
    </div>
    <div v-if="error" class="alert alert-error mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
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

    <!-- Show login prompt if user is not authenticated -->
    <div v-if="!user" class="text-center py-4">
      <p class="mb-4 text-lg">Please login to share your experience with us.</p>
      <div class="flex justify-center space-x-4">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/register" class="btn btn-outline">Register</router-link>
      </div>
    </div>

    <!-- Show form only if user is authenticated -->
    <form v-else @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="label">
          <span class="label-text">Your Name</span>
        </label>
        <input type="text" class="input input-bordered w-full" v-model="form.name" required />
      </div>
      <div>
        <label class="label">
          <span class="label-text">Your Review</span>
        </label>
        <textarea
          class="textarea textarea-bordered w-full h-32"
          v-model="form.review"
          required
        ></textarea>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Rating</span>
        </label>
        <div class="rating">
          <input
            v-for="i in 5"
            :key="i"
            type="radio"
            name="rating"
            class="mask mask-star-2 bg-orange-400"
            :value="i"
            v-model="form.rating"
          />
        </div>
        <div v-if="!form.rating" class="text-xs text-error mt-1">
          Please select a rating from 1 to 5
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-full" :disabled="submitting || !form.rating">
        <span v-if="submitting" class="loading loading-spinner loading-xs mr-2"></span>
        {{ submitting ? 'Submitting...' : 'Submit Review' }}
      </button>
    </form>
  </div>
</template>

<script>
import DOMPurify from 'dompurify'
import { supabase } from '@/supabase/client'
import { useRouter } from 'vue-router'

export default {
  name: 'TestimonialForm',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      form: {
        name: '',
        review: '',
        rating: 0,
      },
      submitting: false,
      success: false,
      error: null,
      user: null,
    }
  },
  async created() {
    // Get current user if logged in
    const { data } = await supabase.auth.getUser()
    this.user = data.user

    // Pre-fill name if user is logged in and has user metadata
    if (this.user && this.user.user_metadata && this.user.user_metadata.full_name) {
      this.form.name = this.user.user_metadata.full_name
    }
  },
  methods: {
    async submitForm() {
      try {
        // Validate rating
        if (!this.form.rating || this.form.rating < 1 || this.form.rating > 5) {
          this.error = 'Please select a rating from 1 to 5'
          return
        }

        this.submitting = true
        this.error = null
        this.success = false

        // Sanitasi input sebelum diproses
        const sanitizedData = {
          name: DOMPurify.sanitize(this.form.name),
          review: DOMPurify.sanitize(this.form.review),
          rating: this.form.rating,
          user_id: this.user ? this.user.id : null, // Include user ID if logged in
        }

        // Emit event dengan data yang sudah disanitasi
        this.$emit('submit-testimonial', sanitizedData)

        // Reset form
        this.form = {
          name: this.user && this.user.user_metadata ? this.user.user_metadata.full_name : '',
          review: '',
          rating: 0,
        }

        this.success = true
        setTimeout(() => (this.success = false), 5000) // Hide success message after 5 seconds
      } catch (err) {
        this.error = 'Error submitting review: ' + err.message
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>
