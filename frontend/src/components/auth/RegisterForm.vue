<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

    <form @submit.prevent="submitForm">
      <!-- Full Name -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Full Name *</label>
        <input type="text" v-model="form.fullName" class="input input-bordered w-full" required />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Email *</label>
        <input
          title="Masukkan email valid (contoh: user@example.com)"
          type="email"
          v-model="form.email"
          class="input input-bordered w-full"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        />
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Password *</label>
        <input
          type="password"
          v-model="form.password"
          class="input input-bordered w-full"
          required
          minlength="8"
        />
        <p class="text-xs text-gray-500 mt-1">
          Must contain uppercase, lowercase, number, and special character
        </p>
      </div>

      <!-- Password Confirmation -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Confirm Password *</label>
        <input
          type="password"
          v-model="form.confirmPassword"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Error Message Display -->
      <div v-if="errorMessage" class="alert alert-error mb-4 text-sm">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="loading loading-spinner"></span>
        {{ isSubmitting ? 'Creating Account...' : 'Sign Up' }}
      </button>

      <div class="mt-4 text-center">
        <p>
          Already have an account?
          <router-link to="/login" class="text-primary hover:underline">Sign In</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { AuthService } from '@/services/authService'
import { validateInput } from '@/utils/validation'

export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isSubmitting: false,
      errorMessage: '',
    }
  },
  methods: {
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      return regex.test(password)
    },

    async submitForm() {
      // Reset error message
      this.errorMessage = ''

      // Validasi
      if (this.form.password !== this.form.confirmPassword) {
        this.errorMessage = 'Passwords do not match'
        return
      }

      if (!this.validatePassword(this.form.password)) {
        this.errorMessage =
          'Password must contain uppercase, lowercase, number, and special character'
        return
      }

      this.isSubmitting = true

      try {
        // Sanitize inputs to prevent XSS
        const sanitizedFullName = validateInput(this.form.fullName, 'text')
        const sanitizedEmail = validateInput(this.form.email, 'email')
        const sanitizedPassword = this.form.password // No need to sanitize, already validated by regex

        await AuthService.signUp(sanitizedEmail, sanitizedPassword, sanitizedFullName)

        alert('Account created successfully! Please check your email to verify your account.')
        this.$router.push('/login')
      } catch (error) {
        console.error('Registration error:', error)
        this.errorMessage = error.message || 'Failed to create account'
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
