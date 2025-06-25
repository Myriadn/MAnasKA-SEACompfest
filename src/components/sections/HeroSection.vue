<template>
  <section class="hero min-h-[70vh] bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="hero-content text-center py-20">
      <div class="max-w-4xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-4">SEA Catering</h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-6">Healthy Meals, Anytime, Anywhere</p>
        <div class="badge badge-primary badge-lg text-white mb-6 px-6 py-3">
          Nationwide Delivery
        </div>
        <p class="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Customizable healthy meals delivered to your doorstep across Indonesia
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/menu" class="btn btn-primary btn-lg text-white px-8"
            >Explore Menu</router-link
          >
          <button class="btn btn-outline btn-primary btn-lg px-8">How It Works</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped>
.hero {
  background-image: url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
}
</style>
