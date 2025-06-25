<template>
  <div>
    <BreadcrumbsDashboard title="Security Testing" />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Security Testing Dashboard</h1>

      <div class="alert alert-warning mb-8">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span
          >This dashboard is for administrators only. It allows testing and validating security
          measures in the application.</span
        >
      </div>

      <SecurityTestingDashboard />
    </div>
  </div>
</template>

<script>
import BreadcrumbsDashboard from '@/components/BreadcrumbsDashboard.vue'
import SecurityTestingDashboard from '@/components/admin/SecurityTestingDashboard.vue'

export default {
  name: 'SecurityTestingView',
  components: {
    BreadcrumbsDashboard,
    SecurityTestingDashboard,
  },
  async created() {
    // Check if user is admin
    const { supabase } = await import('@/supabase/client')
    const { data } = await supabase.auth.getUser()
    const user = data?.user

    if (!user || !user.user_metadata || user.user_metadata.role !== 'admin') {
      this.$router.push('/login')
    }
  },
}
</script>
