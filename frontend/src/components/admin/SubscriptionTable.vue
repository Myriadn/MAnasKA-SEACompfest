<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Subscriptions</h2>
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          class="input input-bordered"
          v-model="searchQuery"
        />
        <button class="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Plan</th>
          <th>Meals</th>
          <th>Days</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subscription in filteredSubscriptions" :key="subscription.id">
          <td>{{ subscription.id }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div
                  class="mask mask-squircle w-12 h-12 bg-primary text-white flex items-center justify-center"
                >
                  {{ subscription.name.charAt(0) }}
                </div>
              </div>
              <div>
                <div class="font-bold">{{ subscription.name }}</div>
                <div class="text-sm opacity-50">{{ subscription.phone }}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-outline badge-primary">{{ subscription.plan }}</span>
          </td>
          <td>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="(meal, index) in subscription.meal_types"
                :key="index"
                class="badge badge-ghost"
              >
                {{ meal }}
              </span>
            </div>
          </td>
          <td>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="(day, index) in subscription.days"
                :key="index"
                class="badge badge-accent"
              >
                {{ day.substring(0, 3) }}
              </span>
            </div>
          </td>
          <td class="font-bold">{{ formatPrice(subscription.total_price) }}</td>
          <td>{{ formatDate(subscription.created_at) }}</td>
          <td>
            <button class="btn btn-ghost btn-xs" @click="viewDetails(subscription)">Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center mt-8">
      <div class="join">
        <button class="join-item btn" :disabled="currentPage === 1" @click="prevPage">«</button>
        <button class="join-item btn">Page {{ currentPage }}</button>
        <button class="join-item btn" :disabled="currentPage === totalPages" @click="nextPage">
          »
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <div class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-2xl mb-4">Subscription Details</h3>

        <div v-if="selectedSubscription" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-bold text-lg">Customer Information</h4>
              <p><strong>Name:</strong> {{ selectedSubscription.name }}</p>
              <p><strong>Phone:</strong> {{ selectedSubscription.phone }}</p>
              <p v-if="selectedSubscription.allergies">
                <strong>Allergies:</strong> {{ selectedSubscription.allergies }}
              </p>
            </div>

            <div>
              <h4 class="font-bold text-lg">Plan Details</h4>
              <p><strong>Plan:</strong> {{ selectedSubscription.plan }}</p>
              <p>
                <strong>Total Price:</strong> {{ formatPrice(selectedSubscription.total_price) }}
              </p>
              <p><strong>Start Date:</strong> {{ formatDate(selectedSubscription.created_at) }}</p>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="font-bold text-lg mb-2">Delivery Schedule</h4>
            <div class="grid grid-cols-7 gap-2">
              <div
                v-for="day in [
                  'monday',
                  'tuesday',
                  'wednesday',
                  'thursday',
                  'friday',
                  'saturday',
                  'sunday',
                ]"
                :key="day"
                class="text-center p-2 rounded border"
                :class="{
                  'bg-primary text-white': selectedSubscription.days.includes(day),
                  'bg-base-200': !selectedSubscription.days.includes(day),
                }"
              >
                {{ day.substring(0, 3) }}
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="font-bold text-lg mb-2">Meal Types</h4>
            <div class="flex gap-2">
              <div
                v-for="meal in ['breakfast', 'lunch', 'dinner']"
                :key="meal"
                class="badge badge-lg"
                :class="{
                  'badge-primary': selectedSubscription.meal_types.includes(meal),
                  'badge-ghost': !selectedSubscription.meal_types.includes(meal),
                }"
              >
                {{ meal }}
              </div>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchSubscriptions } from '@/services/adminService'

export default {
  name: 'SubscriptionTable',
  data() {
    return {
      subscriptions: [],
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: '',
      showModal: false,
      selectedSubscription: null,
    }
  },
  computed: {
    filteredSubscriptions() {
      return this.subscriptions.filter((sub) => {
        const searchLower = this.searchQuery.toLowerCase()
        return (
          sub.name.toLowerCase().includes(searchLower) ||
          sub.phone.toLowerCase().includes(searchLower) ||
          sub.plan.toLowerCase().includes(searchLower)
        )
      })
    },
    totalPages() {
      return Math.ceil(this.filteredSubscriptions.length / this.itemsPerPage)
    },
    paginatedSubscriptions() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredSubscriptions.slice(start, end)
    },
  },
  async mounted() {
    this.subscriptions = await fetchSubscriptions()
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(price)
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    viewDetails(subscription) {
      this.selectedSubscription = subscription
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedSubscription = null
    },
  },
}
</script>
