<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

function navigate() {
  router.push("/home")
}
</script>

<template>
  <div class=" h-full flex justify-center p-5 flex-col text-center gap-5 items-center"
    style="background-color: var(--van-primary-color)">
    <div class="text-2xl font-semibold text-white">Thanks for answering!</div>
    <div class="text-4xl mb-2 font-semibold text-white"> Let’s get started with your adventure.</div>
    <img src="/boy-toss.png" alt="welcomeIMG" class="h-[380px] w-[380px] " />
    <div class="text-2xl text-white">Congratulations! You’ve earned 500 XP!</div>
    <van-button size="large" @click="navigate">
      Go to Profile
    </van-button>
    <img class="mt-5 h-[34px] w-[35px]" src="/lyf-logo.png">
  </div>
</template>
