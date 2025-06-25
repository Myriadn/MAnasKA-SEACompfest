<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
    <figure>
      <img :src="plan.image" alt="Meal Plan" class="w-full h-48 object-cover" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-primary break-words">{{ plan.name }}</h2>
      <p class="text-xl font-bold text-secondary">{{ plan.price }}</p>
      <p class="line-clamp-3">{{ plan.description }}</p>
      <div class="card-actions mt-4">
        <button class="btn btn-primary text-white" @click="$emit('show-details')">
          See Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MealPlanCard',
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
}
</script>
