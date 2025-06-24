import { supabase } from '@/supabase/client'

/**
 * Check if current user is an admin
 * @returns {Promise<boolean>} True if user is admin
 */
const verifyAdminStatus = async () => {
  try {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      return false
    }

    // Check if user is admin
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userData.user.id)
      .single()

    if (profileError || !profileData || !profileData.is_admin) {
      return false
    }

    return true
  } catch (error) {
    console.error('Admin verification error:', error)
    return false
  }
}

/**
 * Fetch dashboard summary data with date filtering
 * @param {string} startDate - ISO date string for start of period
 * @param {string} endDate - ISO date string for end of period
 * @returns {Promise<Object>} Dashboard summary statistics
 */
export const fetchSummary = async (startDate = null, endDate = null) => {
  // Verify admin status before proceeding
  const isAdmin = await verifyAdminStatus()

  if (!isAdmin) {
    throw new Error('Unauthorized access. Admin privileges required.')
  }

  // Set default dates if not provided
  if (!startDate) {
    const start = new Date()
    start.setMonth(start.getMonth() - 1) // Default to 1 month ago
    startDate = start.toISOString().split('T')[0]
  }

  if (!endDate) {
    endDate = new Date().toISOString().split('T')[0] // Default to today
  }

  try {
    // Fetch active subscriptions (status = 'active' or null)
    const { data: activeData, error: activeError } = await supabase
      .from('subscriptions')
      .select('*')
      .or(`status.eq.active,status.is.null`)

    if (activeError) throw activeError

    // Fetch new subscriptions within the date range
    const { data: newData, error: newError } = await supabase
      .from('subscriptions')
      .select('*')
      .gte('created_at', `${startDate}T00:00:00`)
      .lte('created_at', `${endDate}T23:59:59`)

    if (newError) throw newError

    // Fetch reactivations within the date range
    const { data: reactivatedData, error: reactivatedError } = await supabase
      .from('subscriptions')
      .select('*')
      .not('reactivated_at', 'is', null)
      .gte('reactivated_at', `${startDate}T00:00:00`)
      .lte('reactivated_at', `${endDate}T23:59:59`)

    if (reactivatedError) throw reactivatedError

    // Calculate Monthly Recurring Revenue
    // Sum of total_price for all active subscriptions
    let monthlyRevenue = 0
    if (activeData) {
      monthlyRevenue = activeData.reduce((sum, sub) => sum + (sub.total_price || 0), 0)
    }

    return {
      activeSubscriptions: activeData ? activeData.length : 0,
      newSubscriptions: newData ? newData.length : 0,
      reactivations: reactivatedData ? reactivatedData.length : 0,
      monthlyRevenue,
      // In a real app, we would calculate this from historical data
      subscriptionGrowth: newData
        ? newData.length - (reactivatedData ? reactivatedData.length : 0)
        : 0,
    }
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    // Return fallback data in case of error
    return {
      activeSubscriptions: 0,
      newSubscriptions: 0,
      reactivations: 0,
      monthlyRevenue: 0,
      subscriptionGrowth: 0,
    }
  }
}

/**
 * Fetch all subscriptions for admin view
 * @returns {Promise<Array>} List of subscriptions
 */
export const fetchSubscriptions = async () => {
  // Verify admin status before proceeding
  const isAdmin = await verifyAdminStatus()

  if (!isAdmin) {
    throw new Error('Unauthorized access. Admin privileges required.')
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100) // Get the latest 100 records

  if (error) {
    console.error('Error fetching subscriptions:', error)
    throw error
  }

  return data
}

/**
 * Get user details by user ID (admin only)
 * @param {string} userId - The user ID to fetch
 * @returns {Promise<Object>} User profile data
 */
export const getUserDetails = async (userId) => {
  // Verify admin status before proceeding
  const isAdmin = await verifyAdminStatus()

  if (!isAdmin) {
    throw new Error('Unauthorized access. Admin privileges required.')
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

  if (error) {
    console.error('Error fetching user details:', error)
    throw error
  }

  return data
}
