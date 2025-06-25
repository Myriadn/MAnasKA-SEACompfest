<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="container mx-auto px-4 py-8">
      <BreadcrumbsDashboard />
      <h1 class="text-3xl font-bold mb-8">My Subscriptions Dashboard</h1>

      <div class="alert alert-info mb-6" v-if="subscriptions.length === 0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span
          >You don't have any active subscriptions.
          <router-link to="/subscription" class="underline">Subscribe now</router-link> to get
          started!</span
        >
      </div>

      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h2 class="card-title">Active Subscriptions</h2>
          <div class="overflow-x-auto" v-if="subscriptions.length > 0">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Start Date</th>
                  <th>Meal Types</th>
                  <th>Delivery Days</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subscription in subscriptions" :key="subscription.id">
                  <td>
                    <div>
                      <span class="plan-badge">{{ subscription.plan }}</span>
                    </div>
                  </td>
                  <td>{{ formatDate(subscription.created_at) }}</td>
                  <td>
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="meal in subscription.meal_types"
                        :key="meal"
                        class="badge badge-ghost"
                      >
                        {{ meal }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="day in subscription.days" :key="day" class="badge badge-accent">
                        {{ day.substring(0, 3) }}
                      </span>
                    </div>
                  </td>
                  <td class="font-bold">{{ formatPrice(subscription.total_price) }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'badge-success': subscription.status === 'active',
                        'badge-warning': subscription.status === 'paused',
                        'badge-error': subscription.status === 'cancelled',
                      }"
                    >
                      {{ subscription.status || 'active' }}
                    </span>
                  </td>
                  <td>
                    <div class="flex space-x-2">
                      <button @click="viewDetails(subscription)" class="btn btn-ghost btn-xs">
                        Details
                      </button>
                      <button
                        @click="pauseSubscription(subscription)"
                        class="btn btn-warning btn-xs"
                        v-if="
                          subscription.status !== 'paused' && subscription.status !== 'cancelled'
                        "
                      >
                        Pause
                      </button>
                      <button
                        @click="cancelSubscription(subscription)"
                        class="btn btn-error btn-xs"
                        v-if="subscription.status !== 'cancelled'"
                      >
                        Cancel
                      </button>
                      <button
                        @click="reactivateSubscription(subscription)"
                        class="btn btn-success btn-xs"
                        v-if="subscription.status === 'cancelled'"
                      >
                        Reactivate
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Subscription Details Modal -->
    <div class="modal" :class="{ 'modal-open': showDetailsModal }">
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
              <p>
                <strong>Plan:</strong>
                <span class="plan-badge">{{ selectedSubscription.plan }}</span>
              </p>
              <p>
                <strong>Total Price:</strong> {{ formatPrice(selectedSubscription.total_price) }}
              </p>
              <p><strong>Start Date:</strong> {{ formatDate(selectedSubscription.created_at) }}</p>
              <p>
                <strong>Status:</strong>
                <span
                  class="badge"
                  :class="{
                    'badge-success': selectedSubscription.status === 'active',
                    'badge-warning': selectedSubscription.status === 'paused',
                    'badge-error': selectedSubscription.status === 'cancelled',
                  }"
                >
                  {{ selectedSubscription.status || 'active' }}
                </span>
              </p>
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

          <div
            v-if="selectedSubscription.pause_start && selectedSubscription.pause_end"
            class="mt-4"
          >
            <h4 class="font-bold text-lg mb-2">Pause Information</h4>
            <p><strong>Paused From:</strong> {{ formatDate(selectedSubscription.pause_start) }}</p>
            <p><strong>Paused Until:</strong> {{ formatDate(selectedSubscription.pause_end) }}</p>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn" @click="closeDetailsModal">Close</button>
        </div>
      </div>
    </div>

    <!-- Pause Subscription Modal -->
    <div class="modal" :class="{ 'modal-open': showPauseModal }">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Pause Subscription</h3>
        <p class="mb-4">Select the period when you want to pause your meal delivery:</p>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Pause from</span>
          </label>
          <input
            type="date"
            class="input input-bordered w-full"
            v-model="pauseDates.start"
            :min="today"
          />
        </div>

        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text">Pause until</span>
          </label>
          <input
            type="date"
            class="input input-bordered w-full"
            v-model="pauseDates.end"
            :min="pauseDates.start || today"
          />
        </div>

        <div class="alert alert-info mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>While paused, no charges will be applied and deliveries will be suspended.</span>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="closePauseModal">Cancel</button>
          <button class="btn btn-warning" @click="confirmPause" :disabled="!isPauseValid">
            Pause Subscription
          </button>
        </div>
      </div>
    </div>
    <!-- Cancel Subscription Modal -->
    <div class="modal" :class="{ 'modal-open': showCancelModal }">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Cancel Subscription</h3>
        <p class="mb-4">Are you sure you want to cancel your subscription?</p>

        <div class="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>This action cannot be undone. Your meal delivery will stop immediately.</span>
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Please tell us why you're cancelling (optional)</span>
          </label>
          <textarea class="textarea textarea-bordered h-24" v-model="cancellationReason"></textarea>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="closeCancelModal">Go Back</button>
          <button class="btn btn-error" @click="confirmCancel">Confirm Cancellation</button>
        </div>
      </div>
    </div>

    <!-- Reactivate Subscription Modal -->
    <div class="modal" :class="{ 'modal-open': showReactivateModal }">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Reactivate Subscription</h3>
        <p class="mb-4">Would you like to reactivate your cancelled subscription?</p>

        <div class="alert alert-success mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your meal delivery service will resume immediately upon reactivation.</span>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="closeReactivateModal">Cancel</button>
          <button class="btn btn-success" @click="confirmReactivate">Confirm Reactivation</button>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BreadcrumbsDashboard from '@/components/BreadcrumbsDashboard.vue'
import { SubscriptionService } from '@/services/subscriptionService'
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'UserDashboardView',
  components: {
    AppHeader,
    AppFooter,
    BreadcrumbsDashboard,
  },
  setup() {
    const subscriptions = ref([])
    const isLoading = ref(false)
    const selectedSubscription = ref(null)
    const showDetailsModal = ref(false)
    const showPauseModal = ref(false)
    const showCancelModal = ref(false)
    const showReactivateModal = ref(false)
    const pauseDates = ref({
      start: null,
      end: null,
    })
    const cancellationReason = ref('')

    const today = new Date().toISOString().substring(0, 10)

    const isPauseValid = computed(() => {
      return (
        pauseDates.value.start &&
        pauseDates.value.end &&
        pauseDates.value.start <= pauseDates.value.end
      )
    })

    const loadSubscriptions = async () => {
      isLoading.value = true
      try {
        const data = await SubscriptionService.getSubscriptions()
        subscriptions.value = data
      } catch (error) {
        console.error('Error loading subscriptions:', error)
      } finally {
        isLoading.value = false
      }
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(price)
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }

    const viewDetails = (subscription) => {
      selectedSubscription.value = subscription
      showDetailsModal.value = true
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
      selectedSubscription.value = null
    }

    const pauseSubscription = (subscription) => {
      selectedSubscription.value = subscription
      pauseDates.value = {
        start: today,
        end: null,
      }
      showPauseModal.value = true
    }

    const closePauseModal = () => {
      showPauseModal.value = false
      pauseDates.value = { start: null, end: null }
    }

    const confirmPause = async () => {
      if (!isPauseValid.value) return

      try {
        await SubscriptionService.pauseSubscription(
          selectedSubscription.value.id,
          pauseDates.value.start,
          pauseDates.value.end,
        )
        await loadSubscriptions()
        closePauseModal()
      } catch (error) {
        console.error('Error pausing subscription:', error)
      }
    }

    const cancelSubscription = (subscription) => {
      selectedSubscription.value = subscription
      cancellationReason.value = ''
      showCancelModal.value = true
    }

    const closeCancelModal = () => {
      showCancelModal.value = false
      cancellationReason.value = ''
    }

    const confirmCancel = async () => {
      try {
        await SubscriptionService.cancelSubscription(
          selectedSubscription.value.id,
          cancellationReason.value,
        )
        await loadSubscriptions()
        closeCancelModal()
      } catch (error) {
        console.error('Error cancelling subscription:', error)
      }
    }

    const reactivateSubscription = (subscription) => {
      selectedSubscription.value = subscription
      showReactivateModal.value = true
    }

    const closeReactivateModal = () => {
      showReactivateModal.value = false
    }

    const confirmReactivate = async () => {
      try {
        await SubscriptionService.reactivateSubscription(selectedSubscription.value.id)
        await loadSubscriptions()
        closeReactivateModal()
      } catch (error) {
        console.error('Error reactivating subscription:', error)
      }
    }

    onMounted(() => {
      loadSubscriptions()
    })

    return {
      subscriptions,
      isLoading,
      selectedSubscription,
      showDetailsModal,
      showPauseModal,
      showCancelModal,
      showReactivateModal,
      pauseDates,
      cancellationReason,
      today,
      isPauseValid,
      formatPrice,
      formatDate,
      viewDetails,
      closeDetailsModal,
      pauseSubscription,
      closePauseModal,
      confirmPause,
      cancelSubscription,
      closeCancelModal,
      confirmCancel,
      reactivateSubscription,
      closeReactivateModal,
      confirmReactivate,
    }
  },
}
</script>
