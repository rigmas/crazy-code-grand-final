<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center bg-[#fafafa] px-8">
    <div class="mb-4 text-xl font-medium">
      Welcome Home, User
    </div>

    <div class="relative mb-8 h-[15rem] w-[15rem] flex items-center justify-center rounded-xl bg-[#f8f8f8] shadow-2xl">
      <div class="absolute left-4 top-2 rounded-lg bg-white p-2">
        <div class="i-solar:qr-code-linear text-primary text-xl" />
      </div>
      avatar
    </div>

    <div class="mb-6 box-border w-full rounded-xl bg-white px-4 py-2">
      <div class="mb-2 w-full flex items-center justify-between">
        <div class="text-primary">
          Lv 1
        </div>

        <div>
          500/1000 XP
        </div>
      </div>
      <div class="mb-2 h-[0.8rem] w-full flex overflow-hidden rounded-2xl">
        <div class="bg-[#db5a24]" style="width: calc(50%)" />
        <div class="bg-[#f8d2bd]" style="width: calc(50%)" />
      </div>
    </div>

    <div class="text-primary mb-6">
      Explore, play and collect amazing gifts!
    </div>

    <div
      class="menu-button van-haptics-feedback" @click="() => {
        router.push('/quest')
      }"
    >
      <div>
        Quest
      </div>
      <img class="absolute right-5" src="/boy-take-picture.png" width="90">
    </div>

    <div class="menu-button van-haptics-feedback">
      Friends
      <img class="absolute right-5" src="/friends.png" width="90">
    </div>

    <div class="menu-button van-haptics-feedback">
      Party
      <img class="absolute right-5" src="/boy-toss.png" width="90">
    </div>

    <div class="menu-button van-haptics-feedback">
      Leaderboards
      <!--      <img class="absolute right-5" src="/boy-take-picture.png" width="90"> -->
    </div>
  </div>
</template>X

<style scoped>
.menu-button {
  --at-apply: flex items-center justify-start px-6 py-4 mb-4 rounded-xl font-bold box-border overflow-hidden relative;
  color: var(--van-primary-color);
  background-color: white;
  width: 100%;
}
</style>
