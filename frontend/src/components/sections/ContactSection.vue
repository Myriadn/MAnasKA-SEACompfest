<template>
  <section class="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="badge badge-primary badge-lg text-white mb-4">Contact Us</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-6">We're Here to Help</h2>
      </div>

      <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div class="flex items-center mb-8">
          <div class="bg-primary p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-white"
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
            <h3 class="text-xl font-semibold">Manager</h3>
            <p class="text-lg">Brian</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="bg-primary p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-white"
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
            <h3 class="text-xl font-semibold">Phone Number</h3>
            <p class="text-lg text-primary">0812-3456-789</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
}
</script>
