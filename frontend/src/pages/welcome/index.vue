<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store"

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div class=" h-full flex justify-center p-6 flex-col text-center gap-5 items-center"
    style="background-color: var(--van-primary-color)">
    <div class="text-2xl font-semibold text-white">You're all set!</div>
    <div class="text-4xl mb-2 font-semibold text-white"> Welcome to Lyf, {{ user?.name }}!</div>
    <img src="/boy-toss.png" alt="welcomeIMG" class="h-[380px] w-[380px] " />
    <div class="text-2xl text-white">Explore, play, and collect amazing gifts!</div>
    <img class="mt-5 h-[34px] w-[35px]" src="/lyf-logo.png">
  </div>
</template>
