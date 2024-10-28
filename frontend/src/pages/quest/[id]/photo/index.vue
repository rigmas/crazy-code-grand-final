<script setup lang="ts">
import { storeToRefs } from "pinia"
import { get } from "radash"
import { QuestDummyList } from "~/schemas/quest"
import { getQuests } from "~/services/quest"
import { useQuestStore } from "~/stores/quest.store"

const route = useRoute()
const router = useRouter()
const selectedId = get<number>(route.params, "id", 1)
// const selectedQuest = ref(QuestDummyList[selectedId - 1])
const { quests, activeQuestIndex, activeQuest } = storeToRefs(useQuestStore())
activeQuestIndex.value = selectedId - 1
onBeforeMount(async () => {
  const res = await getQuests()
  quests.value = [
    ...res.data,
    ...QuestDummyList,
  ]
  activeQuestIndex.value = selectedId - 1
})
</script>

<template>
  <div class="relative box-border h-full w-full flex flex-col px-4 md:px-0">
    <div class="my-6 w-full flex justify-center">
      <img src="/boy-take-picture.png" width="200">
    </div>

    <div v-if="activeQuest != null" class="relative box-border w-full flex justify-center overflow-y-auto"
      style="height: calc(100% - 350px);">
      <div class="box-border h-full px-4 container md:px-0">
        <div class="text-primary mb-5 flex justify-center text-2xl font-bold">
          {{ activeQuest.title }}
        </div>

        <div class="mb-8 min-h-[100px] w-full flex justify-center text-justify font-400">
          {{ activeQuest.description }}
        </div>

        <div class="text-primary mb-2 font-medium">
          Objectives
        </div>
        <div class="mb-16 h-[50px] pl-6">
          <ol class="list-decimal">
            <template v-for="(o, i) in activeQuest.objectives" :key="i">
              <li>{{ o }}</li>
            </template>
          </ol>
        </div>

        <div class="text-primary mb-2 font-normal">
          Rewards
        </div>
        <div class="mb-8">
          {{ activeQuest.reward }} XP
        </div>
      </div>
    </div>

    <div class="bottom-bar w-full bg-[#fafafa]">
      <div class="w-full flex items-center justify-center text-gray" @click="() => {
        router.push(`/quest`)
      }">
        Back
      </div>

      <van-button type="primary" class="!rounded-2xl" @click="() => {
        router.push(`/quest/${selectedId}/photo/map`)
      }">
        Start Quest Now
      </van-button>
    </div>
  </div>
</template>

<style scoped></style>
