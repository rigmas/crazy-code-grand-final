<script setup lang="ts">
import TextButton from "~/components/Common/TextButton.vue"
import type { UserParsed } from "~/services/user"
import { getAllUser } from "~/services/user"

const router = useRouter()
const users = ref<UserParsed[]>([])
onMounted(async () => {
  users.value = await getAllUser()
})
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col justify-start bg-[#fafafa] px-8">
    <div class="mb-10 mt-14 w-full text-xl font-semibold">
      Leaderboard
    </div>

    <div class="h-[50vh] w-full overflow-y-auto">
      <div class="grid grid-cols-1 w-full gap-y-5">
        <template v-for="(user, i) in users" :key="user.id">
          <div class="box-border w-full flex items-center justify-between rounded-2xl bg-white px-4 py-3">
            <div class="flex items-center">
              <div class="mr-2 h-[3rem] w-[3rem] flex items-center justify-center rounded-lg bg-[#f1f3f4]">
                <div class="i-solar:user-bold text-primary" />
              </div>
              <div>
                <div class="font-semibold">
                  {{ user.name }}
                </div>
                <div class="text-sm text-gray">
                  Lv. {{ Math.ceil(user.total_xp / 1000) + 1 }} ({{ user.total_xp }} XP)
                </div>
              </div>
            </div>
            <div class="text-primary mr-2 font-bold">
              {{ i + 1 }}
            </div>
          </div>
        </template>
      </div>

      <div class="absolute bottom-7 left-0 w-full">
        <div class="w-full flex justify-center">
          <TextButton
            @click="() => {
              router.push('/home')
            }"
          >
            Back
          </TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
