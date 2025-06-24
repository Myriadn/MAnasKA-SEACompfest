import { supabase } from '@/supabase/client'
import { verifyCsrfToken } from '@/middleware/csrf'
import { validateInput } from '@/middleware/inputValidation'

export const SubscriptionService = {
  // Get database schema info to identify correct user ID column
  async getTableInfo() {
    try {
      // First check if we can identify the columns in the subscriptions table
      const { data: columns, error } = await supabase.from('subscriptions').select('*').limit(1)

      if (error) {
        console.error('Error fetching table info:', error)
        return null
      }

      // Check if we got a record to analyze
      if (columns && columns.length > 0) {
        return Object.keys(columns[0])
      }

      // If no records, return null
      return null
    } catch (error) {
      console.error('Error checking table structure:', error)
      return null
    }
  },

  async createSubscription(data) {
    // Verify CSRF token first
    if (!data.csrf_token || !verifyCsrfToken(data.csrf_token)) {
      throw new Error('CSRF verification failed. Please refresh the page and try again.')
    }

    // Ensure user is authenticated before creating subscription
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      throw new Error('You must be logged in to create a subscription')
    }

    // Try to get table columns to determine the correct column name for user ID
    let userIdColumnName = 'user_id' // Default column name
    const columns = await this.getTableInfo()

    // If we found column info, determine the user ID column name
    if (columns) {
      const possibleColumnNames = ['user_id', 'created_by', 'userId', 'user', 'customer_id']
      for (const colName of possibleColumnNames) {
        if (columns.includes(colName)) {
          userIdColumnName = colName
          break
        }
      }
    }

    // Sanitize all inputs using the comprehensive validation middleware
    const sanitizedData = {
      name: validateInput(data.name, 'name'),
      phone: validateInput(data.phone, 'phone'),
      plan: data.plan, // Enum value, validated by the form
      meal_types: data.mealTypes, // Array of validated values
      days: data.days, // Array of validated values
      allergies: validateInput(data.allergies, 'optional'),
      total_price: data.totalPrice, // Number, calculated on frontend
      created_at: new Date().toISOString(),
      status: 'active', // Default status for new subscriptions
    }

    // Add user ID with the detected column name
    sanitizedData[userIdColumnName] = userData.user.id

    console.log(`Using column name: ${userIdColumnName} for user ID`, sanitizedData)

    // Using parameterized query via Supabase
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert([sanitizedData])
      .select()

    if (error) {
      console.error('Subscription creation error:', error)

      // Enhanced error handling with helpful messages
      if (error.code === 'PGRST204' && error.message.includes('user_id')) {
        throw new Error(
          'Database schema error: The user_id column is missing in the subscriptions table. ' +
            'Please check SUBSCRIPTION_ERROR_FIX.md for solutions.',
        )
      } else if (error.code === '23503') {
        // Foreign key violation
        throw new Error(
          'User reference error: Unable to link subscription to user account. ' +
            'Please ensure you are properly logged in.',
        )
      } else if (error.code === '42P01') {
        // Undefined table
        throw new Error(
          'Table not found: The subscriptions table does not exist in the database. ' +
            'Please run the database setup script.',
        )
      } else {
        throw new Error(error.message || 'Failed to create subscription')
      }
    }

    return subscription
  },

  async getSubscriptions() {
    // Get current user
    const { data: userData } = await supabase.auth.getUser()

    if (!userData?.user) {
      throw new Error('You must be logged in to view subscriptions')
    }

    // Regular users can only see their own subscriptions
    const isAdmin = await this.checkIfUserIsAdmin(userData.user.id)

    let query = supabase.from('subscriptions').select('*')

    // Filter by user_id if not admin
    if (!isAdmin) {
      query = query.eq('user_id', userData.user.id)
    }

    // Order by created_at
    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching subscriptions:', error)
      throw new Error(error.message || 'Failed to load subscriptions')
    }

    return data
  },

  // Helper method to check if user is admin
  async checkIfUserIsAdmin(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    if (error || !data) return false

    return data.is_admin === true
  },

  /**
   * Pause a subscription for a specified date range
   * @param {number} subscriptionId - The ID of the subscription to pause
   * @param {string} startDate - ISO date string for pause start
   * @param {string} endDate - ISO date string for pause end
   * @returns {Promise<Object>} Updated subscription
   */
  async pauseSubscription(subscriptionId, startDate, endDate) {
    // Verify user owns this subscription
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      throw new Error('You must be logged in to pause a subscription')
    }

    // First fetch the subscription to verify ownership
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single()

    if (fetchError) {
      console.error('Error fetching subscription:', fetchError)
      throw new Error('Unable to find subscription')
    }

    if (subscription.user_id !== userData.user.id) {
      // Only allow users to pause their own subscriptions (unless admin)
      const isAdmin = await this.checkIfUserIsAdmin(userData.user.id)
      if (!isAdmin) {
        throw new Error('You can only pause your own subscriptions')
      }
    }

    // Update the subscription with pause information
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: 'paused',
        pause_start: startDate,
        pause_end: endDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId)
      .select()

    if (updateError) {
      console.error('Error pausing subscription:', updateError)
      throw new Error(updateError.message || 'Failed to pause subscription')
    }

    return updatedSubscription
  },

  /**
   * Cancel a subscription permanently
   * @param {number} subscriptionId - The ID of the subscription to cancel
   * @param {string} reason - Optional reason for cancellation
   * @returns {Promise<Object>} Updated subscription
   */
  async cancelSubscription(subscriptionId, reason = '') {
    // Verify user owns this subscription
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      throw new Error('You must be logged in to cancel a subscription')
    }

    // First fetch the subscription to verify ownership
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single()

    if (fetchError) {
      console.error('Error fetching subscription:', fetchError)
      throw new Error('Unable to find subscription')
    }

    if (subscription.user_id !== userData.user.id) {
      // Only allow users to cancel their own subscriptions (unless admin)
      const isAdmin = await this.checkIfUserIsAdmin(userData.user.id)
      if (!isAdmin) {
        throw new Error('You can only cancel your own subscriptions')
      }
    }

    // Update the subscription
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        cancellation_reason: reason,
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId)
      .select()

    if (updateError) {
      console.error('Error cancelling subscription:', updateError)
      throw new Error(updateError.message || 'Failed to cancel subscription')
    }

    return updatedSubscription
  },

  /**
   * Reactivate a previously paused or cancelled subscription
   * @param {number} subscriptionId - The ID of the subscription to reactivate
   * @returns {Promise<Object>} Updated subscription
   */
  async reactivateSubscription(subscriptionId) {
    // Verify user owns this subscription
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      throw new Error('You must be logged in to reactivate a subscription')
    }

    // First fetch the subscription to verify ownership
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single()

    if (fetchError) {
      console.error('Error fetching subscription:', fetchError)
      throw new Error('Unable to find subscription')
    }

    if (subscription.user_id !== userData.user.id) {
      // Only allow users to reactivate their own subscriptions (unless admin)
      const isAdmin = await this.checkIfUserIsAdmin(userData.user.id)
      if (!isAdmin) {
        throw new Error('You can only reactivate your own subscriptions')
      }
    }

    // Update fields based on current status
    const updateData = {
      status: 'active',
      updated_at: new Date().toISOString(),
    }

    // Clear pause data if present
    if (subscription.status === 'paused') {
      updateData.pause_start = null
      updateData.pause_end = null
    }

    // Track reactivation if previously cancelled
    if (subscription.status === 'cancelled') {
      updateData.reactivated_at = new Date().toISOString()
    }

    // Update the subscription
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('subscriptions')
      .update(updateData)
      .eq('id', subscriptionId)
      .select()

    if (updateError) {
      console.error('Error reactivating subscription:', updateError)
      throw new Error(updateError.message || 'Failed to reactivate subscription')
    }

    return updatedSubscription
  },
}
