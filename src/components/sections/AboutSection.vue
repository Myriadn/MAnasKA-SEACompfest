<template>
  <section class="py-16 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center text-center">
        <div class="badge badge-outline badge-primary mb-4">About Us</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-6">
          Transforming Healthy Eating in Indonesia
        </h2>
        <p class="text-lg text-gray-600 mb-6 max-w-3xl">
          SEA Catering started as a small kitchen in Jakarta and has quickly become Indonesia's
          favorite healthy meal delivery service. Our mission is to make nutritious eating
          accessible and convenient for everyone.
        </p>

        <div class="stats stats-vertical md:stats-horizontal shadow w-full max-w-2xl">
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
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
}
</script>
