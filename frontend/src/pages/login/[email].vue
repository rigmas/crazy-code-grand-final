<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { profileUsers } from "~/services/user"
import { useAuthStore } from "~/stores/auth.store"

interface RouteParams {
  email: string
}

const route = useRoute()
const router = useRouter()
const path = route.params as RouteParams
const { email } = storeToRefs(useAuthStore())
const authStore = useAuthStore()

function navigate() {
  router.push("/welcome")
}

onMounted(async () => {
  const res = await profileUsers(path.email)
  if (res?.data) {
    email.value = path.email
    authStore.setUser(res.data)
  }

  navigate()
})
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center px-8">
    <div class="text-2xl text-primary font-semibold mt-8">Welcome to Lyf!</div>
    <img src="/boy-toss.png" alt="welcomeIMG" class="h-[270px] w-[270px] " />
    <div class="text-lg mb-10 text-center"> Jump into a fun adventure! Make friends, grab cool gifts, and take on
      exciting
      quests as
      you
      explore all
      around you.
    </div>
    <VanButton size="large" type="primary" round @click="navigate">
      Let's Go!
    </VanButton>
    <img class="mt-15 h-[34px] w-[35px]" src="/lyf-logo-orange.png">
  </div>
</template>
