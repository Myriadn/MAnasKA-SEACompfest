<template>
  <section class="py-20 bg-gradient-to-br from-green-50 via-base-100 to-primary/5">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div class="badge badge-primary badge-outline mb-4">Contact Us</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-6">We're Here to Help</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Have questions about our meal plans or need assistance with your subscription? Our team is
          ready to help you.
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <!-- Contact Form -->
        <div
          class="lg:w-3/5 bg-white p-8 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all duration-300"
        >
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>

          <form class="space-y-6" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium">Your Name</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  class="input input-bordered focus:input-primary"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium">Your Email</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="johndoe@example.com"
                  class="input input-bordered focus:input-primary"
                  required
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Subject</span>
              </label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="How can we help you?"
                class="input input-bordered focus:input-primary"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Message</span>
              </label>
              <textarea
                v-model="form.message"
                class="textarea textarea-bordered h-32 focus:textarea-primary"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary w-full" :disabled="submitting">
              <span>Send Message</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <div v-if="success" class="text-green-600 text-center mt-4">
              Message sent successfully!
            </div>
            <div v-if="error" class="text-red-600 text-center mt-4">
              {{ error }}
            </div>
          </form>
        </div>

        <!-- Contact Info Cards -->
        <div class="lg:w-2/5 space-y-6">
          <div
            class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary"
          >
            <div class="flex items-center">
              <div class="bg-primary/10 p-4 rounded-full mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">Contact Person</h3>
                <p class="text-lg text-gray-600">Brian - Customer Support Manager</p>
              </div>
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary"
          >
            <div class="flex items-center">
              <div class="bg-primary/10 p-4 rounded-full mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-primary"
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
              <div>
                <h3 class="text-xl font-bold text-gray-800">Phone Number</h3>
                <p class="text-lg text-primary font-medium">0812-3456-789</p>
              </div>
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary"
          >
            <div class="flex items-center">
              <div class="bg-primary/10 p-4 rounded-full mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-primary"
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
              <div>
                <h3 class="text-xl font-bold text-gray-800">Email</h3>
                <p class="text-lg text-primary font-medium">manager@seacatering.id</p>
              </div>
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary"
          >
            <div class="flex items-center">
              <div class="bg-primary/10 p-4 rounded-full mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-primary"
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
              <div>
                <h3 class="text-xl font-bold text-gray-800">Office Location</h3>
                <p class="text-lg text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      submitting: false,
      success: false,
      error: null,
    }
  },
  methods: {
    async submitForm() {
      // To be implemented when backend integration is ready
      try {
        this.submitting = true
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.success = true
        this.form = { name: '', email: '', subject: '', message: '' }
      } catch (error) {
        this.error = 'Failed to send message. Please try again.'
        console.error('Contact form error:', error)
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>

<style scoped>
.input:focus,
.textarea:focus {
  border-color: hsl(var(--p));
  box-shadow: 0 0 0 2px rgba(var(--p-rgb), 0.1);
}

.form-control {
  transition: transform 0.2s ease;
}

.form-control:focus-within {
  transform: translateY(-2px);
}
</style>
