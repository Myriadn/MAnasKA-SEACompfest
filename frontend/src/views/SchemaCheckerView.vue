<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Database Schema Checker</h1>

      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h2 class="card-title">Check Supabase Schema</h2>
          <p>Use this utility to identify issues with your database schema.</p>
          <div class="card-actions justify-end mt-4">
            <button @click="checkSchema" class="btn btn-primary">Check Schema</button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center my-8">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <div v-if="error" class="alert alert-error mb-6">
        <span>{{ error }}</span>
      </div>

      <div v-if="results.length > 0" class="space-y-6">
        <div v-for="(result, index) in results" :key="index" class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">{{ result.title }}</h3>
            <pre class="bg-base-300 p-4 rounded overflow-x-auto">{{
              JSON.stringify(result.data, null, 2)
            }}</pre>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl mt-8">
        <div class="card-body">
          <h2 class="card-title">Create/Update Schema</h2>
          <p>
            If you're missing the user_id column in the subscriptions table, run this SQL in
            Supabase SQL Editor:
          </p>
          <pre class="bg-base-300 p-4 rounded overflow-x-auto">
-- Add user_id column if it doesn't exist
ALTER TABLE IF EXISTS "public"."subscriptions"
ADD COLUMN IF NOT EXISTS "user_id" UUID REFERENCES auth.users(id);

-- If you already have a different column for user ID, you can rename it:
-- ALTER TABLE IF EXISTS "public"."subscriptions"
-- RENAME COLUMN "your_existing_column" TO "user_id";
          </pre>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { checkSupabaseTables } from '@/utils/schemaChecker'
import { supabase } from '@/supabase/client'

export default {
  name: 'SchemaCheckerView',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      loading: false,
      error: null,
      results: [],
    }
  },
  methods: {
    async checkSchema() {
      this.loading = true
      this.error = null
      this.results = []

      try {
        // Check if user is authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          this.error = 'You must be logged in to check the schema'
          this.loading = false
          return
        }

        // Get subscription table columns
        const { data: subscriptions, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .limit(1)

        if (subError) {
          this.results.push({
            title: 'Error Fetching Subscriptions',
            data: subError,
          })
        } else if (subscriptions && subscriptions.length > 0) {
          this.results.push({
            title: 'Subscription Table Columns',
            data: Object.keys(subscriptions[0]),
          })
        } else {
          // If no records exist, try to describe the table
          this.results.push({
            title: 'No Subscription Records Found',
            data: 'Creating a new record to check the schema...',
          })

          // Attempt to create a test record to get the schema
          const testData = {
            name: 'Test User',
            phone: '1234567890',
            plan: 'Diet Plan',
            meal_types: ['breakfast'],
            days: ['monday'],
            allergies: 'None',
            total_price: 100,
            created_at: new Date().toISOString(),
          }

          // Try with each possible user ID column
          const possibleColumns = ['user_id', 'created_by', 'userId', 'user', 'customer_id']

          for (const col of possibleColumns) {
            const testPayload = { ...testData }
            testPayload[col] = user.id

            try {
              const { error: insertError } = await supabase
                .from('subscriptions')
                .insert([testPayload])

              if (!insertError) {
                this.results.push({
                  title: 'Success With Column',
                  data: col,
                })
                break
              } else {
                this.results.push({
                  title: `Error with column: ${col}`,
                  data: insertError,
                })
              }
            } catch (e) {
              console.error(`Error testing column ${col}:`, e)
            }
          }
        }

        // Get user info
        this.results.push({
          title: 'Current User',
          data: {
            id: user.id,
            email: user.email,
            metadata: user.user_metadata,
          },
        })
      } catch (error) {
        this.error = error.message || 'An error occurred while checking the schema'
        console.error('Schema check error:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
