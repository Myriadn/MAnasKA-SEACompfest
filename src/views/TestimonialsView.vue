<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center mb-2">Customer Testimonials</h1>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        See what our customers have to say about our meal plans and service.
      </p>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="loading loading-spinner loading-lg text-primary"></div>
        <span class="ml-4 text-lg">Loading testimonials...</span>
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
      <div v-else>
        <!-- Add your own testimonial -->
        <div class="mb-16">
          <TestimonialForm @submit-testimonial="addTestimonial" />
        </div>

        <!-- All testimonials -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
          <div v-if="testimonials.length === 0" class="text-center py-8">
            <p class="text-lg text-gray-600">
              No testimonials yet. Be the first to share your experience!
            </p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              class="card bg-base-100 shadow-xl"
            >
              <div class="card-body">
                <div class="rating mb-4">
                  <input
                    v-for="i in 5"
                    :key="i"
                    type="radio"
                    :name="`rating-${testimonial.id}`"
                    class="mask mask-star-2 bg-orange-400"
                    :checked="i <= testimonial.rating"
                    disabled
                  />
                </div>
                <p class="text-gray-600 italic mb-6">"{{ stripHtmlTags(testimonial.review) }}"</p>
                <div class="flex items-center mt-auto">
                  <div class="avatar">
                    <div class="w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="text-gray-700 font-bold">{{ testimonial.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="font-bold text-lg">{{ testimonial.name }}</h4>
                    <p class="text-sm text-gray-500">{{ formatDate(testimonial.created_at) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import TestimonialForm from '@/components/TestimonialForm.vue'
import { TestimonialService } from '@/services/testimonialService'
import { stripHtmlTags } from '@/utils/htmlSanitizer'

export default {
  name: 'TestimonialsView',
  components: {
    AppHeader,
    AppFooter,
    TestimonialForm,
  },
  data() {
    return {
      testimonials: [],
      loading: true,
      error: null,
    }
  },
  async created() {
    try {
      this.loading = true
      this.testimonials = await TestimonialService.getAllTestimonials()
      this.loading = false
    } catch (err) {
      this.error = 'Failed to load testimonials: ' + err.message
      this.loading = false
    }
  },
  methods: {
    // Method for HTML sanitization and tag stripping
    safeHtml(html) {
      return stripHtmlTags(html)
    },

    // Method to strip HTML tags completely using our utility
    // Use the imported utility function directly
    stripHtmlTags,

    // Format date to readable format
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    },

    // Add new testimonial
    async addTestimonial(testimonial) {
      try {
        const newTestimonial = await TestimonialService.addTestimonial(testimonial)
        this.testimonials.unshift(newTestimonial)
      } catch (err) {
        this.error = 'Failed to add testimonial: ' + err.message
      }
    },
  },
}
</script>

<style scoped>
.avatar {
  display: flex !important;
}

.avatar > div {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar > div > span {
  line-height: 1;
}
</style>
