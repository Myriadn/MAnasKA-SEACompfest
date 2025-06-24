<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <!-- Admin-only notice -->
      <div class="alert alert-info mb-6">
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
        <span>This dashboard is restricted to administrators only</span>
      </div>

      <!-- Date range selector -->
      <div class="card bg-base-100 shadow-lg mb-6">
        <div class="card-body">
          <h2 class="card-title">Filter Data by Date Range</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Start Date</span>
              </label>
              <input
                type="date"
                v-model="dateRange.start"
                class="input input-bordered"
                @change="loadDashboardData"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">End Date</span>
              </label>
              <input
                type="date"
                v-model="dateRange.end"
                class="input input-bordered"
                @change="loadDashboardData"
                :min="dateRange.start"
              />
            </div>

            <div class="form-control items-end justify-end">
              <label class="label">
                <span class="label-text invisible">Apply</span>
              </label>
              <button class="btn btn-primary" @click="loadDashboardData">Apply Filter</button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stats bg-primary text-primary-content shadow">
          <div class="stat">
            <div class="stat-title">Active Subscriptions</div>
            <div class="stat-value">{{ summary.activeSubscriptions }}</div>
            <div class="stat-desc">Total active subscriptions</div>
          </div>
        </div>

        <div class="stats bg-secondary text-secondary-content shadow">
          <div class="stat">
            <div class="stat-title">New Subscriptions</div>
            <div class="stat-value">{{ summary.newSubscriptions }}</div>
            <div class="stat-desc">Within selected period</div>
          </div>
        </div>

        <div class="stats bg-accent text-accent-content shadow">
          <div class="stat">
            <div class="stat-title">Monthly Recurring Revenue</div>
            <div class="stat-value">{{ formatPrice(summary.monthlyRevenue) }}</div>
            <div class="stat-desc">MRR for selected period</div>
          </div>
        </div>

        <div class="stats bg-success text-success-content shadow">
          <div class="stat">
            <div class="stat-title">Reactivations</div>
            <div class="stat-value">{{ summary.reactivations }}</div>
            <div class="stat-desc">Cancelled → Active</div>
          </div>
        </div>
      </div>

      <!-- Growth Chart -->
      <div class="card bg-base-100 shadow-lg mb-8">
        <div class="card-body">
          <h2 class="card-title">Subscription Growth</h2>
          <div class="h-60 w-full">
            <LineChart
              v-if="chartData && !isLoading"
              :chartData="chartData"
              :options="chartOptions"
            />
            <div v-else class="bg-base-200 h-full w-full flex items-center justify-center">
              <p class="text-lg opacity-70">Loading chart data...</p>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionTable />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SubscriptionTable from '@/components/admin/SubscriptionTable.vue'
import LineChart from '@/components/admin/LineChart.vue'
import { fetchSummary } from '@/services/adminService'
import { supabase } from '@/supabase/client'

const router = useRouter()
const isAdmin = ref(false)
const isLoading = ref(false)
const summary = ref({
  activeSubscriptions: 0,
  newSubscriptions: 0,
  monthlyRevenue: 0,
  reactivations: 0,
  subscriptionGrowth: 0,
})

// Chart data
const chartData = ref(null)
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Subscription Growth Trend',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Subscriptions',
      },
    },
  },
})

// Get default date range (last 30 days)
const getDefaultDateRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 30)

  return {
    start: start.toISOString().substring(0, 10),
    end: end.toISOString().substring(0, 10),
  }
}

const dateRange = ref(getDefaultDateRange())

const checkAdminStatus = async () => {
  try {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      isAdmin.value = false
      return false
    }

    // Check if user is admin in profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userData.user.id)
      .single()

    if (profileError || !profileData) {
      isAdmin.value = false
      return false
    }

    isAdmin.value = profileData.is_admin === true
    return profileData.is_admin === true
  } catch (error) {
    console.error('Error checking admin status:', error)
    isAdmin.value = false
    return false
  }
}

const loadGrowthData = async () => {
  try {
    // Fetch subscription growth data by day within the date range
    const { data, error } = await supabase
      .from('subscriptions')
      .select('created_at')
      .gte('created_at', `${dateRange.value.start}T00:00:00`)
      .lte('created_at', `${dateRange.value.end}T23:59:59`)
      .order('created_at')

    if (error) throw error

    // Process data to group by days
    const groupedData = {}
    const labels = []
    const dataPoints = []

    // Create an array of all dates in the range
    const start = new Date(dateRange.value.start)
    const end = new Date(dateRange.value.end)
    const dateArray = []

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      const dateString = dt.toISOString().split('T')[0]
      dateArray.push(dateString)
      groupedData[dateString] = 0
    }

    // Count subscriptions by date
    data.forEach((subscription) => {
      const dateOnly = subscription.created_at.split('T')[0]
      groupedData[dateOnly] = (groupedData[dateOnly] || 0) + 1
    })

    // Convert to arrays for Chart.js
    Object.keys(groupedData)
      .sort()
      .forEach((date) => {
        labels.push(date)
        dataPoints.push(groupedData[date])
      })

    // Calculate cumulative growth
    const cumulativeData = []
    let runningTotal = 0
    dataPoints.forEach((count) => {
      runningTotal += count
      cumulativeData.push(runningTotal)
    })

    // Update chart data
    chartData.value = {
      labels,
      datasets: [
        {
          label: 'New Subscriptions',
          backgroundColor: 'rgba(71, 85, 105, 0.2)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 2,
          data: dataPoints,
          tension: 0.4,
        },
        {
          label: 'Cumulative Growth',
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          borderColor: 'rgba(14, 165, 233, 1)',
          borderWidth: 2,
          data: cumulativeData,
          tension: 0.4,
        },
      ],
    }
  } catch (error) {
    console.error('Error loading growth data:', error)
  }
}

const loadDashboardData = async () => {
  isLoading.value = true
  try {
    summary.value = await fetchSummary(dateRange.value.start, dateRange.value.end)
    await loadGrowthData()
  } catch (error) {
    console.error('Error loading dashboard data:', error)
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

onMounted(async () => {
  // Verify admin status
  const isUserAdmin = await checkAdminStatus()

  if (!isUserAdmin) {
    // Redirect non-admin users
    router.push('/')
    return
  }

  // Load dashboard data
  await loadDashboardData()
})
</script>
