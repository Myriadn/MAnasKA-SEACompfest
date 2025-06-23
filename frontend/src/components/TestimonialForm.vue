<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-bold mb-6 text-center">Share Your Experience</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
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
      </div>
      <button type="submit" class="btn btn-primary w-full">Submit Review</button>
    </form>
  </div>
</template>

<script>
import { sanitize } from 'dompurify'

export default {
  name: 'TestimonialForm',
  data() {
    return {
      form: {
        name: '',
        review: '',
        rating: 0,
      },
    }
  },
  methods: {
    submitForm() {
      // Sanitasi input sebelum diproses
      const sanitizedData = {
        name: sanitize(this.form.name),
        review: sanitize(this.form.review),
        rating: this.form.rating,
      }
      this.$emit('submit-testimonial', sanitizedData)

      this.$emit('submit-testimonial', { ...this.form })
      this.form = {
        name: '',
        review: '',
        rating: 0,
      }
      alert('Thank you for your review!')
    },
  },
}
</script>
