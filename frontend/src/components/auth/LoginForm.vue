<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Sign In to Your Account</h2>

    <form @submit.prevent="submitForm">
      <!-- Email -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Email *</label>
        <input
          type="email"
          v-model="form.email"
          class="input input-bordered w-full"
          required
          placeholder="your@email.com"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="Masukkan email valid (contoh: user@example.com)"
        />
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Password *</label>
        <input
          type="password"
          v-model="form.password"
          class="input input-bordered w-full"
          required
          placeholder="••••••••"
        />
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 text-error text-sm">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="loading loading-spinner"></span>
        {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
      </button>

      <div class="mt-4 text-center">
        <p>
          Don't have an account?
          <router-link to="/register" class="text-primary hover:underline">Sign Up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { AuthService } from '@/services/authService'
import { useUserStore } from '@/stores/user'

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isSubmitting: false,
      errorMessage: '',
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      this.errorMessage = ''

      try {
        await AuthService.signIn(this.form.email, this.form.password)

        // Update user store
        const userStore = useUserStore()
        await userStore.loadUser()

        // Redirect to home page after successful login
        this.$router.push('/')
      } catch (error) {
        console.error('Login error:', error)
        this.errorMessage = error.message || 'Failed to login. Please check your credentials.'
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
