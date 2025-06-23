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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="stats bg-primary text-primary-content">
          <div class="stat">
            <div class="stat-title">Total Subscriptions</div>
            <div class="stat-value">{{ summary.totalSubscriptions }}</div>
          </div>
        </div>

        <div class="stats bg-secondary text-secondary-content">
          <div class="stat">
            <div class="stat-title">Active Users</div>
            <div class="stat-value">{{ summary.activeUsers }}</div>
          </div>
        </div>

        <div class="stats bg-accent text-accent-content">
          <div class="stat">
            <div class="stat-title">Monthly Revenue</div>
            <div class="stat-value">{{ formatPrice(summary.monthlyRevenue) }}</div>
          </div>
        </div>
      </div>

      <SubscriptionTable />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SubscriptionTable from '@/components/admin/SubscriptionTable.vue'
import { fetchSummary } from '@/services/adminService'
import { supabase } from '@/supabase/client'

export default {
  name: 'AdminDashboard',
  components: {
    AppHeader,
    AppFooter,
    SubscriptionTable,
  },
  data() {
    return {
      summary: {
        totalSubscriptions: 0,
        activeUsers: 0,
        monthlyRevenue: 0,
      },
      isAdmin: false,
    }
  },
  async created() {
    // Verify that the user is an admin before loading data
    await this.checkAdminStatus()

    if (!this.isAdmin) {
      // Redirect non-admin users
      this.$router.push('/')
      return
    }

    // Load dashboard data for admins
    this.summary = await fetchSummary()
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(price)
    },

    async checkAdminStatus() {
      try {
        // Get current user
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData?.user) {
          this.isAdmin = false
          return
        }

        // Check if user is admin in profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userData.user.id)
          .single()

        if (profileError || !profileData) {
          this.isAdmin = false
          return
        }

        this.isAdmin = profileData.is_admin === true
      } catch (error) {
        console.error('Error checking admin status:', error)
        this.isAdmin = false
      }
    },
  },
}
</script>
