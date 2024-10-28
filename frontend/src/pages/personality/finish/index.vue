<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

function navigate() {
  router.push("/home")
}
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center px-8"
    style="background-color: var(--van-primary-color)">
    <div class="text-xl font-semibold text-white mb-2">Thanks for answering!</div>
    <div class="text-2xl mb-3 font-semibold text-white text-center"> Let’s get started with your adventure.</div>
    <img src="/boy-toss.png" alt="welcomeIMG" class="h-[300px] w-[300px] " />
    <div class="text-xl text-white text-center mb-5">Congratulations! You’ve earned 500 XP!</div>
    <van-button size="large" @click="navigate">
      Go to Profile
    </van-button>
    <img class="mt-8 h-[32px] w-[32px]" src="/lyf-logo.png">
  </div>
</template>
