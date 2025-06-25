<template>
  <section class="py-20 bg-base-100 bg-gradient-to-b from-green-50 to-base-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div class="badge badge-outline badge-primary mb-4 p-3 font-medium">Testimonials</div>
        <h2 class="text-5xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover why our customers love our meal plans and service. Read their stories and
          experiences below.
        </p>
      </div>

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
      <div v-else class="max-w-4xl mx-auto mt-12 relative flex justify-center">
        <div v-if="testimonials.length === 0" class="text-center py-8">
          <p class="text-lg text-gray-600">
            No testimonials yet. Be the first to share your experience!
          </p>
        </div>
        <div v-else class="relative w-full flex justify-center">
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
          <div class="carousel w-full rounded-xl flex justify-center items-center">
            <div
              v-for="(testimonial, index) in testimonials"
              :id="`testimonial-${index}`"
              :key="testimonial.id"
              :class="['carousel-item w-full', { hidden: activeTestimonial !== index }]"
            >
              <div
                class="card bg-white border border-gray-100 testimonial-card h-96 mx-auto max-w-xl"
              >
                <div class="card-body h-full flex justify-center items-center p-8">
                  <div class="quote-icon text-primary/20 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="mx-auto"
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                      />
                    </svg>
                  </div>

                  <div
                    class="testimonial-content flex-grow flex items-center justify-center mb-4 w-full"
                  >
                    <div class="max-w-md mx-auto">
                      <p class="text-gray-600 italic text-lg text-center">
                        "{{ stripHtmlTags(testimonial.review) }}"
                      </p>
                    </div>
                  </div>

                  <div class="testimonial-footer mt-auto text-center w-full">
                    <div class="rating mb-3">
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

                    <h3 class="font-bold text-xl">{{ testimonial.name }}</h3>
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
      </div>
    </div>
  </section>
</template>

<script>
import DOMPurify from 'dompurify'
import { TestimonialService } from '@/services/testimonialService'

export default {
  name: 'TestimonialsSection',
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

.testimonial-card {
  height: 24rem; /* h-96 equivalent */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.testimonial-card:hover {
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
</style>
