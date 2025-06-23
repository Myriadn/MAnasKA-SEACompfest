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
}
