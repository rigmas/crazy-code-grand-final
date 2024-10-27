<script setup lang="ts">
import { storeToRefs } from "pinia"
import { get } from "radash"
import { QuestDummyList } from "~/schemas/quest"
import { finishQuest, getQuests } from "~/services/quest"
import { useAuthStore } from "~/stores/auth.store"
import { useQuestStore } from "~/stores/quest.store"

enum QuestType {
  Question = "question",
  Photo = "photo",
}

interface Quest {
  id: number
  type: QuestType
  title: string
  description: string
}

const route = useRoute()
const router = useRouter()

const selectedId = get<number>(route.params, "id", 1)
// const selectedQuest = ref(QuestDummyList[selectedId - 1])
const { quests, activeQuestIndex, activeQuest } = storeToRefs(useQuestStore())
const { user, userLevel } = storeToRefs(useAuthStore())
activeQuestIndex.value = selectedId - 1
onBeforeMount(async () => {
  const res = await getQuests()
  quests.value = [
    ...res.data,
    ...QuestDummyList,
  ]
  activeQuestIndex.value = selectedId - 1
})
const answer = ref()

onMounted(async () => {

})
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center bg-[#fafafa] px-8">
    <div class="mb-6 box-border w-full flex items-center justify-center pr-6">
      <img src="/boy-work.png" width="150">
    </div>

    <div v-if="activeQuest != null" class="relative box-border w-full flex justify-center overflow-y-auto" style="height: calc(100% - 350px);">
      <div class="box-border h-full px-4 container md:px-0">
        <div class="text-primary mb-5 flex justify-center text-2xl font-bold">
          {{ activeQuest.title }}
        </div>

        <div class="mb-6 min-h-[100px] w-full flex justify-center text-justify font-400">
          {{ activeQuest.description }}
        </div>

        <div class="text-primary mb-2 font-normal">
          Rewards
        </div>
        <div class="mb-8">
          {{ activeQuest.reward }} XP
        </div>

        <div class="text-primary mb-2 font-normal">
          Your Answer
        </div>
        <div class="mb-8">
          <van-cell-group>
            <van-field
              v-model="answer"
              type="textarea"
              placeholder="Write your best answer here"
              rows="4"
              autosize
            />
          </van-cell-group>
        </div>
      </div>
    </div>

    <div class="bottom-bar w-full bg-[#fafafa]">
      <div
        class="w-full flex items-center justify-center text-gray"
        @click="() => {
          router.push(`/quest`)
        }"
      >
        Back
      </div>

      <van-button
        type="primary"
        class="!rounded-2xl"
        @click="async () => {
          await finishQuest(selectedId, user?.id)
        }"
      >
        Send Answer
      </van-button>
    </div>
  </div>
</template>

<style scoped>

</style>
