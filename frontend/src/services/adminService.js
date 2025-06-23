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
 * Fetch dashboard summary data
 * @returns {Promise<Object>} Dashboard summary statistics
 */
export const fetchSummary = async () => {
  // Verify admin status before proceeding
  const isAdmin = await verifyAdminStatus()

  if (!isAdmin) {
    throw new Error('Unauthorized access. Admin privileges required.')
  }

  // In a real application, this would fetch actual data from the database
  // For now, using static data for example
  return {
    totalSubscriptions: 125,
    activeUsers: 89,
    monthlyRevenue: 12500000,
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
