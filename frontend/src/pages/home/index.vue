<script setup lang="ts">
import { storeToRefs } from "pinia"
import { showNotify } from "vant"
import { getUserExp } from "~/services/user"
import { useAuthStore } from "~/stores/auth.store"
import ShakeDetector from "../../../utils/ShakeDetector"

const router = useRouter()

let shakeDetector!: ShakeDetector
onBeforeUnmount(() => {
  if (shakeDetector) {
    shakeDetector.stop()
  }
})

const { user, userExp, userLevel } = storeToRefs(useAuthStore())

function addFriend() {
  showNotify({
    message: "Friend have been added",
    type: "primary",
    duration: 2000,
  })
}

const showShaken = ref(false)
onMounted(() => {
  if (user.value != null) {
    getUserExp(user.value.id).then((res) => {
      if (res.data != null) {
        userExp.value = Number.parseFloat(res.data.xp)
      }
    })
  }

  shakeDetector = new ShakeDetector(() => {
    showShaken.value = true
  })
  shakeDetector.start()
})
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center bg-[#fafafa] px-8">
    <Teleport to="body">
      <VanDialog
        v-model:show="showShaken"
        title="Nearby friends found!"
        show-cancel-button cancel-button-text="Cancel"
        confirm-button-text="Add" :on-confirm="addFriend"
      >
        <div class="w-full flex items-center justify-center">
          <img src="/boy-toss.png" width="150">
        </div>

        <div class="box-border w-full px-4 py-4">
          <div class="box-border w-full rounded-xl bg-[#f8f1f1ff] px-4 py-2">
            <div class="w-full flex items-center">
              <div class="mr-3 w-[3rem] flex items-center justify-center rounded-lg bg-white">
                <img src="/avatar-2.png" width="48">
              </div>
              <div>
                <div class="font-bold">
                  Amanda
                </div>
                <div class="">
                  Lv 5. Treasure Hunter
                </div>
              </div>
            </div>
          </div>
        </div>
      </VanDialog>
    </Teleport>

    <div class="mb-4 text-xl font-medium">
      Welcome Home, {{ user?.name }}
    </div>

    <div class="relative mb-8 h-[15rem] w-[15rem] flex items-center justify-center rounded-xl bg-[#f8f8f8] shadow-2xl">
      <div class="absolute left-4 top-2 rounded-lg bg-white p-2">
        <div class="i-solar:qr-code-linear text-primary text-xl" />
      </div>
      <img src="/avatar-36.png" width="220">
    </div>

    <div class="mb-6 box-border w-full rounded-xl bg-white px-4 py-2">
      <div class="mb-2 w-full flex items-center justify-between">
        <div class="text-primary">
          Lv {{ userLevel }}
        </div>

        <div>
          {{ userExp }}/1000 XP
        </div>
      </div>
      <div class="mb-2 h-[0.8rem] w-full flex overflow-hidden rounded-2xl">
        <div
          class="bg-[#db5a24]" :style="{
            width: `calc(${100 * userExp / 1000}%)`,
          }"
        />
        <div
          class="bg-[#f8d2bd]" :style="{
            width: `calc(${100 - (100 * userExp / 1000)}%)`,
          }"
        />
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

    <div
      class="menu-button van-haptics-feedback" @click="() => {
        router.push('/home/leaderboard')
      }"
    >
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
