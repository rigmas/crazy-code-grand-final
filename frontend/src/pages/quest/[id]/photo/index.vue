<script setup lang="ts">
import { get } from "radash"

enum QuestType {
  Question = "question",
  Photo = "photo",
}

interface Quest {
  id: number
  type: QuestType
  title: string
  description: string
  location: [number, number]
  reward: string
}

const route = useRoute()
const router = useRouter()
const selectedId = get<number>(route.params, "id", 1)
const selectedQuest = ref<Quest>({
  id: 1,
  type: QuestType.Photo,
  title: "Finding life",
  description: "In this labyrinth of endless life, thou shalt uncover the true meaning of existence, guided by the art of living itself",
  location: [0, 0],
  reward: "True meaning of life",
})
</script>

<template>
  <VanNavBar
    title="Quest Information"
    left-text="Back"
    left-arrow
    class="h-[50px]"
  />

  <div class="h-[calc(100% - 50px)] box-border w-full flex justify-center overflow-y-scroll pt-8" style="height: calc(100% - 50px);">
    <div class="box-border h-full px-4 container md:px-0">
      <div class="mb-5 flex justify-center text-2xl font-bold">
        {{ selectedQuest.title }}
      </div>

      <div class="mb-2 italic">
        The Task
      </div>
      <div class="mb-8 h-[180px] w-full flex justify-center text-center">
        {{ selectedQuest.description }}
      </div>

      <div class="mb-2 italic">
        The Reward
      </div>
      <div class="mb-8 h-[50px] flex justify-center text-xl">
        {{ selectedQuest.reward }}
      </div>

      <div class="mt-8 w-full flex">
        <van-button
          type="primary" size="large" @click="() => {
            router.push(`/quest/${selectedId}/photo/map`)
          }"
        >
          Take
        </van-button>
        <div
          class="van-haptics-feedback w-[100px] flex items-center justify-center" @click="() => {
            router.push('/quest')
          }"
        >
          Back
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
