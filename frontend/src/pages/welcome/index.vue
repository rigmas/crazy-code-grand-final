<script setup lang="ts">
import { useRouter } from "vue-router"
import { useAuthStore } from "~/stores/auth.store"

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
function navigate() {
  router.push("/personality")
}
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center px-8"
    style="background-color: var(--van-primary-color)">
    <div class="text-xl font-semibold text-white mb-2">You're all set!</div>
    <div class="text-2xl mb-2 font-semibold text-white text-center"> Welcome to Lyf, {{ user?.name }}!</div>
    <img src="/boy-toss.png" alt="welcomeIMG" class="h-[300px] w-[300px] " />
    <div class="text-xl text-white text-center mb-6">Explore, play, and collect amazing gifts!</div>
    <van-button size="large" @click="navigate">
      Personality Quiz
    </van-button>
    <img class="mt-8 h-[34px] w-[35px]" src="/lyf-logo.png">
  </div>
</template>
