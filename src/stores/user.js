import { defineStore } from 'pinia'
import { supabase } from '@/supabase/client'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
  }),
  actions: {
    setUser(userData) {
      this.user = userData
    },

    async loadUser() {
      this.isLoading = true

      try {
        // First check if we have a valid session
        const { data: sessionData } = await supabase.auth.getSession()

        if (sessionData?.session) {
          // We have a session, now get the user
          const { data } = await supabase.auth.getUser()

          if (data?.user) {
            // Set user in store
            this.setUser(data.user)
            return data.user
          }
        }

        // No session or user, clear the store
        this.setUser(null)
        return null
      } catch (error) {
        console.error('Error loading user:', error)
        this.setUser(null)
        return null
      } finally {
        this.isLoading = false
      }
    },
  },
  persist: true, // For persisting state after refresh
})
