<template>
  <!-- Menggunakan komponen AppHeader untuk konsistensi navigasi -->
  <AppHeader />

  <div class="container mx-auto py-8">
    <BreadcrumbsProfile />

    <div class="flex items-center mb-4">
      <h1 class="text-3xl font-bold">User Profile</h1>
    </div>

    <div class="bg-base-100 p-6 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row items-center sm:items-start mb-6">
        <div class="avatar mr-4 mb-4 sm:mb-0" style="display: flex">
          <div
            class="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-4xl"
          >
            <span>{{ userInitials }}</span>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-center sm:text-left">
            {{ user.profile?.full_name || user.full_name || 'Nama Pengguna' }}
          </h2>
          <p class="text-gray-600 text-center sm:text-left">{{ user.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h3 class="card-title flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-person-vcard"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"
                />
                <path
                  d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Z"
                />
              </svg>
              Account Information
            </h3>
            <div class="divide-y divide-base-300">
              <div class="py-2 flex flex-wrap">
                <span class="font-semibold w-full sm:w-1/3">Email:</span>
                <span class="w-full sm:w-2/3">{{ user.email }}</span>
              </div>
              <div class="py-2 flex flex-wrap">
                <span class="font-semibold w-full sm:w-1/3">Phone:</span>
                <span class="w-full sm:w-2/3"
                  >{{ user.phone || 'Not set' }}
                  <span v-if="!user.phone" class="text-xs text-primary cursor-pointer"
                    >(Add phone number)</span
                  >
                </span>
              </div>
              <div class="py-2 flex flex-wrap">
                <span class="font-semibold w-full sm:w-1/3">Member since:</span>
                <span class="w-full sm:w-2/3">{{ formatDate(user.created_at) }}</span>
              </div>
              <div v-if="user.address" class="py-2 flex flex-wrap">
                <span class="font-semibold w-full sm:w-1/3">Address:</span>
                <span class="w-full sm:w-2/3">{{ user.address || 'Not set' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h3 class="card-title">Actions</h3>
            <div class="space-y-3">
              <button
                class="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                  />
                </svg>
                Edit Profile
              </button>
              <button
                class="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-key"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                  />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                Change Password
              </button>
              <button
                @click="handleLogout"
                class="btn btn-error w-full flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Menggunakan AppFooter untuk konsistensi layout -->
  <AppFooter />
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase/client'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BreadcrumbsProfile from '@/components/BreadcrumbsProfile.vue'

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

<style scoped>
.avatar {
  display: flex !important;
}

.avatar > div {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar > div > span {
  line-height: 1;
}
</style>
