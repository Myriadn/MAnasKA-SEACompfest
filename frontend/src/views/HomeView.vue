<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section class="hero min-h-[70vh] bg-gradient-to-br from-primary/10 to-secondary/10">
      <div class="hero-content text-center py-20">
        <div class="max-w-4xl">
          <div class="badge badge-primary badge-lg text-white mb-6 px-6 py-3">
            Nationwide Delivery
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Healthy Eating Made
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
              >Simple</span
            >
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-10">
            Customizable healthy meals delivered to your doorstep across Indonesia
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn btn-primary btn-lg text-white px-8">
              Explore Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button class="btn btn-outline btn-primary btn-lg px-8">How It Works</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12 items-center">
          <div class="flex-1">
            <div class="text-left">
              <div class="badge badge-outline badge-primary mb-4">About Us</div>
              <h2 class="text-4xl font-bold text-gray-800 mb-6">
                Transforming Healthy Eating in Indonesia
              </h2>
              <p class="text-lg text-gray-600 mb-6">
                SEA Catering started as a small kitchen in Jakarta and has quickly become
                Indonesia's favorite healthy meal delivery service. Our mission is to make
                nutritious eating accessible and convenient for everyone.
              </p>

              <div class="stats stats-vertical lg:stats-horizontal shadow w-full mb-8">
                <div class="stat">
                  <div class="stat-title">Cities Served</div>
                  <div class="stat-value text-primary">25+</div>
                  <div class="stat-desc">Across Indonesia</div>
                </div>

                <div class="stat">
                  <div class="stat-title">Happy Customers</div>
                  <div class="stat-value text-secondary">10K+</div>
                  <div class="stat-desc">Since 2022</div>
                </div>

                <div class="stat">
                  <div class="stat-title">Meal Options</div>
                  <div class="stat-value text-accent">50+</div>
                  <div class="stat-desc">Weekly Rotation</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="card card-compact image-full before:opacity-60">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Healthy Meal"
                  class="w-full h-96 object-cover"
                />
              </figure>
              <div class="card-body justify-end p-8">
                <div class="text-right">
                  <h3 class="card-title text-3xl text-white mb-2">Premium Ingredients</h3>
                  <p class="text-white text-xl">Locally sourced, sustainably grown</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gradient-to-br from-base-100 to-primary/5">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div class="badge badge-primary badge-lg text-white mb-4 px-6 py-3">Why Choose Us</div>
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Commitment to Your Health</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We go the extra mile to ensure every meal meets the highest standards of nutrition and
            taste
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Customizable Meals"
            description="Tailor every meal to your dietary preferences and nutritional needs"
            icon="🍽️"
          />
          <FeatureCard
            title="Nutritionist Approved"
            description="All meals designed by certified nutrition experts"
            icon="📊"
          />
          <FeatureCard
            title="Fresh Ingredients"
            description="Locally sourced produce delivered within 24 hours"
            icon="🥬"
          />
          <FeatureCard
            title="Flexible Delivery"
            description="Choose your delivery days and times"
            icon="🚚"
          />
          <FeatureCard
            title="Allergy Friendly"
            description="Special meals for gluten-free, dairy-free, and other needs"
            icon="🚫"
          />
          <FeatureCard
            title="Eco Packaging"
            description="100% biodegradable and recyclable packaging"
            icon="♻️"
          />
        </div>
      </div>
    </section>

    <!-- Testimonial Preview -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div class="badge badge-outline badge-primary mb-4">Customer Love</div>
          <h2 class="text-4xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="rating rating-md mb-4">
                <input
                  type="radio"
                  name="rating-1"
                  class="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  class="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  class="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  class="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  class="mask mask-star-2 bg-orange-400"
                  checked
                />
              </div>
              <p class="text-gray-600 italic mb-6">
                "SEA Catering has transformed my eating habits! The meals are delicious and I've
                never felt better."
              </p>
              <div class="flex items-center">
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=32" />
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="font-bold text-lg">Sarah T.</h4>
                  <p class="text-gray-500">Jakarta, 6 months subscriber</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Repeat for other testimonials -->
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12 items-center">
          <div class="flex-1">
            <div class="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Contact"
                  class="w-full h-72 object-cover"
                />
              </figure>
            </div>
          </div>
          <div class="flex-1">
            <div class="text-left">
              <div class="badge badge-primary badge-lg text-white mb-4">Get in Touch</div>
              <h2 class="text-4xl font-bold text-gray-800 mb-6">We're Here to Help</h2>

              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="bg-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-xl font-semibold">Call Us</h3>
                    <p class="text-lg text-primary">0812-3456-789</p>
                    <p class="text-gray-500">8 AM - 8 PM, Monday to Saturday</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-xl font-semibold">Email Us</h3>
                    <p class="text-lg text-primary">hello@seacatering.id</p>
                    <p class="text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-xl font-semibold">Visit Us</h3>
                    <p class="text-lg">Jl. Sudirman No. 123</p>
                    <p class="text-gray-500">Jakarta Selatan, Indonesia 12920</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Start Your Healthy Journey?</h2>
        <p class="text-xl mb-10 max-w-3xl mx-auto">
          Join thousands of satisfied customers who have transformed their eating habits with SEA
          Catering
        </p>
        <button class="btn btn-secondary btn-lg text-white px-10 animate-bounce">
          Get Started Today
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer p-10 bg-neutral text-neutral-content">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <div class="avatar">
                <div class="w-12 rounded-full bg-success-content p-2">
                  <span class="text-success text-xl font-bold">SEA</span>
                </div>
              </div>
              <span class="text-xl font-bold ml-3">SEA Catering</span>
            </div>
            <p>
              Healthy meals delivered across Indonesia<br />Making nutrition accessible to everyone
            </p>
          </div>

          <div>
            <span class="footer-title">Services</span>
            <a class="link link-hover">Meal Plans</a>
            <a class="link link-hover">Corporate Catering</a>
            <a class="link link-hover">Special Diets</a>
            <a class="link link-hover">Nutrition Consulting</a>
          </div>

          <div>
            <span class="footer-title">Company</span>
            <a class="link link-hover">About us</a>
            <a class="link link-hover">Contact</a>
            <a class="link link-hover">Careers</a>
            <a class="link link-hover">Press kit</a>
          </div>

          <div>
            <span class="footer-title">Legal</span>
            <a class="link link-hover">Terms of use</a>
            <a class="link link-hover">Privacy policy</a>
            <a class="link link-hover">Cookie policy</a>
          </div>
        </div>

        <div class="divider mt-10"></div>

        <div class="flex flex-col md:flex-row justify-between items-center mt-6">
          <p>© 2023 SEA Catering. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                ></path></svg
            ></a>
            <a
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
              >
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                ></path></svg
            ></a>
            <a
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
              >
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                ></path></svg
            ></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import FeatureCard from '@/components/FeatureCard.vue'

export default {
  name: 'HomeView',
  components: {
    FeatureCard,
  },
}
</script>

<style>
.hero {
  background-image: url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
}
</style>
