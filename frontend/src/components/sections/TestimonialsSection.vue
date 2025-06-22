<template>
  <section class="py-16 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="badge badge-outline badge-primary mb-4">Testimonials</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
      </div>

      <!-- Testimonial Form -->
      <TestimonialForm @submit-testimonial="addTestimonial" />

      <!-- Testimonial Carousel -->
      <div class="max-w-4xl mx-auto mt-12">
        <div class="carousel w-full">
          <div
            v-for="(testimonial, index) in testimonials"
            :id="`testimonial-${index}`"
            :key="index"
            class="carousel-item w-full"
          >
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body items-center text-center">
                <div class="rating mb-4">
                  <input
                    v-for="i in 5"
                    :key="i"
                    type="radio"
                    :name="`rating-${testimonial.id}`"
                    class="mask mask-star-2 bg-orange-400"
                    :checked="i <= testimonial.rating"
                  />
                </div>
                <p class="text-gray-600 italic mb-6">"{{ testimonial.review }}"</p>
                <div class="flex items-center">
                  <div class="avatar">
                    <div class="w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="text-gray-700 font-bold">{{ testimonial.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="font-bold text-lg">{{ testimonial.name }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full py-2 gap-2">
          <a
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :href="`#testimonial-${index}`"
            class="btn btn-xs"
          >
            {{ index + 1 }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TestimonialForm from '@/components/TestimonialForm.vue'

export default {
  name: 'TestimonialsSection',
  components: {
    TestimonialForm,
  },
  data() {
    return {
      testimonials: [
        {
          id: 1,
          name: 'Sarah T.',
          review:
            "SEA Catering has transformed my eating habits! The meals are delicious and I've never felt better.",
          rating: 5,
        },
        {
          id: 2,
          name: 'Michael R.',
          review:
            'The convenience of having healthy meals delivered to my door has been a game-changer for my busy schedule.',
          rating: 4,
        },
        {
          id: 3,
          name: 'Lisa M.',
          review:
            "I love the customization options. Being vegetarian, it's great to have meals tailored to my preferences.",
          rating: 5,
        },
      ],
    }
  },
  methods: {
    addTestimonial(testimonial) {
      this.testimonials.unshift({
        id: Date.now(),
        ...testimonial,
      })
    },
  },
}
</script>
