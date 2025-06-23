<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">User Profile</h1>
    <div class="bg-base-100 p-6 rounded-lg shadow-md">
      <div class="flex items-center mb-6">
        <div class="avatar mr-4">
          <div
            class="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-4xl"
          >
            {{ userInitials }}
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold">{{ user.full_name }}</h2>
          <p class="text-gray-600">{{ user.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h3 class="card-title">Account Information</h3>
            <div class="space-y-2">
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Phone:</strong> {{ user.phone || 'Not set' }}</p>
              <p><strong>Member since:</strong> {{ formatDate(user.created_at) }}</p>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h3 class="card-title">Actions</h3>
            <div class="space-y-3">
              <button class="btn btn-outline btn-primary w-full">Edit Profile</button>
              <button class="btn btn-outline btn-secondary w-full">Change Password</button>
              <button @click="handleLogout" class="btn btn-error w-full">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase/client'

const userStore = useUserStore()
const router = useRouter()

const user = computed(() => userStore.user)

const userInitials = computed(() => {
  if (!user.value?.full_name) return 'U'
  const names = user.value.full_name.split(' ')
  return names
    .slice(0, 2)
    .map((name) => name[0])
    .join('')
    .toUpperCase()
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  userStore.setUser(null)
  router.push('/login')
}
</script>
