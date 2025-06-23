<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div
      class="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12"
    >
      <div class="w-full max-w-md p-4">
        <RegisterForm />

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            By signing up, you agree to our
            <a href="#" class="text-primary hover:underline">Terms of Service</a> and
            <a href="#" class="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    AppHeader,
    AppFooter,
    RegisterForm,
  },
}
</script>
