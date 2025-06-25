<template>
  <section class="py-16 bg-base-100 bg-gradient-to-b from-green-50 to-base-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="badge badge-outline badge-primary mb-4">Testimonials</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Discover why our customers love our meal plans and service. Read their stories and
          experiences below.
        </p>
      </div>

      <!-- Testimonial Form -->
      <TestimonialForm @submit-testimonial="addTestimonial" />

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

      <!-- Enhanced Testimonial Carousel with arrows -->
      <div v-else class="max-w-4xl mx-auto mt-12 relative">
        <div v-if="testimonials.length === 0" class="text-center py-8">
          <p class="text-lg text-gray-600">
            No testimonials yet. Be the first to share your experience!
          </p>
        </div>
        <div v-else class="relative">
          <!-- Arrow Navigation - Left -->
          <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10">
            <button
              @click="prevTestimonial"
              class="btn btn-circle btn-primary shadow-lg hover:scale-110 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <!-- Carousel -->
          <div class="carousel w-full rounded-xl overflow-hidden shadow-2xl">
            <div
              v-for="(testimonial, index) in testimonials"
              :id="`testimonial-${index}`"
              :key="testimonial.id"
              :class="['carousel-item w-full', { hidden: activeTestimonial !== index }]"
            >
              <div class="card bg-base-100 border border-gray-100 h-96">
                <div class="card-body h-full flex flex-col p-8">
                  <div class="avatar mb-4 text-center">
                    <div
                      class="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center"
                    >
                      <span class="text-2xl font-bold">{{ testimonial.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <h3 class="font-bold text-xl mb-2 text-center">{{ testimonial.name }}</h3>
                  <div class="rating mb-4 flex justify-center">
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
                  <div class="testimonial-content flex-grow flex items-center justify-center">
                    <div class="max-w-md mx-auto">
                      <p class="text-gray-600 italic text-lg text-center">
                        "{{ stripHtmlTags(testimonial.review) }}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow Navigation - Right -->
          <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10">
            <button
              @click="nextTestimonial"
              class="btn btn-circle btn-primary shadow-lg hover:scale-110 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center w-full py-4 gap-2 mt-4">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id + '-indicator'"
            @click="setActiveTestimonial(index)"
            :class="[
              'btn btn-xs rounded-full',
              activeTestimonial === index ? 'btn-primary' : 'btn-outline',
            ]"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TestimonialForm from '@/components/TestimonialForm.vue'
import DOMPurify from 'dompurify'
import { TestimonialService } from '@/services/testimonialService'

export default {
  name: 'TestimonialsSection',
  components: {
    TestimonialForm,
  },
  data() {
    return {
      testimonials: [],
      loading: true,
      error: null,
      activeTestimonial: 0,
    }
  },
  async created() {
    try {
      this.loading = true
      this.testimonials = await TestimonialService.getLatestTestimonials(5)
      this.loading = false
    } catch (err) {
      this.error = 'Failed to load testimonials: ' + err.message
      this.loading = false
    }
  },
  methods: {
    // Method untuk sanitasi HTML dan menampilkan sebagai HTML
    safeHtml(html) {
      return DOMPurify.sanitize(html)
    },

    // Method untuk menghapus tag HTML sepenuhnya
    stripHtmlTags(html) {
      if (!html) return ''
      // Create a DOM element from the sanitized HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = DOMPurify.sanitize(html)
      // Return only the text content
      return tempDiv.textContent || tempDiv.innerText || ''
    },

    async addTestimonial(testimonial) {
      try {
        const newTestimonial = await TestimonialService.addTestimonial(testimonial)
        this.testimonials.unshift(newTestimonial)
        // Reset active testimonial to show the new one
        this.activeTestimonial = 0
      } catch (err) {
        this.error = 'Failed to add testimonial: ' + err.message
      }
    },

    // Navigation methods
    nextTestimonial() {
      if (this.testimonials.length <= 1) return
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length
    },

    prevTestimonial() {
      if (this.testimonials.length <= 1) return
      this.activeTestimonial =
        (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length
    },

    setActiveTestimonial(index) {
      this.activeTestimonial = index
    },
  },
}
</script>

<style scoped>
.carousel-item {
  transition: opacity 0.5s ease-in-out;
}

.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 24rem; /* h-96 equivalent */
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.05);
}

.testimonial-content {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 160px;
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 0 1rem;
}

.testimonial-content::-webkit-scrollbar {
  width: 4px;
}

.testimonial-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.avatar > div {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-circle {
  opacity: 0.9;
  transition: all 0.3s ease;
}

.btn-circle:hover {
  opacity: 1;
  transform: scale(1.1);
}

.rating input:disabled {
  pointer-events: none;
}
</style>
