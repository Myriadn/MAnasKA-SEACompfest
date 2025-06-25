// This is a utility script to check your Supabase database schema
// Run this in your browser console when logged in to your application
import { supabase } from '@/supabase/client'

export async function checkSupabaseTables() {
  console.log('Checking Supabase database schema...')

  try {
    // Attempt to get a list of tables (may not work with public schema restrictions)
    const { data: tables, error: tablesError } = await supabase.rpc('get_schema_info')
    if (tablesError) {
      console.error('Error fetching schema info:', tablesError)
    } else {
      console.log('Database tables:', tables)
    }

    // Try to get subscription table columns by fetching a record
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .limit(1)

    if (subError) {
      console.error('Error fetching subscriptions:', subError)
    } else if (subscriptions && subscriptions.length > 0) {
      console.log('Subscription table columns:', Object.keys(subscriptions[0]))
    } else {
      console.log('No subscription records found to analyze columns')
    }

    // Check for user profiles table structure
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (profileError) {
      console.error('Error fetching profiles:', profileError)
    } else if (profiles && profiles.length > 0) {
      console.log('Profile table columns:', Object.keys(profiles[0]))
    } else {
      console.log('No profile records found to analyze columns')
    }

    // Get current user info
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error('Error fetching user:', userError)
    } else if (user) {
      console.log('Current user ID:', user.id)
      console.log('User metadata:', user.user_metadata)
    } else {
      console.log('No user is currently logged in')
    }
  } catch (error) {
    console.error('General error checking database schema:', error)
  }
}

// Don't auto-execute in the module
// To use this, import the function and call it manually
