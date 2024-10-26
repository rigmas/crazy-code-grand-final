<script setup lang="ts">
import { storeToRefs } from "pinia"
import TextButton from "~/components/Common/TextButton.vue"
import { QuestDummyList, QuestType } from "~/schemas/quest"
import { getQuests } from "~/services/quest"
import { useQuestStore } from "~/stores/quest.store"

const router = useRouter()
// const quests = ref(QuestDummyList)

const { quests, activeQuestIndex } = storeToRefs(useQuestStore())

onMounted(async () => {
  const res = await getQuests()
  quests.value = [
    ...res.data,
    ...QuestDummyList,
  ]

  console.log(quests.value)
})
</script>

<template>
  <div class="box-border h-full w-full px-8 md:px-0">
    <div class="h-full w-full flex flex-col overflow-y-scroll">
      <div class="mb-8 mt-24 text-center text-lg font-bold line-height-tight">
        Complete fun quests to level up and earn rewards! Choose a solo quest or team up for a party quest.
      </div>

      <div class="grid grid-cols-2 mb-12 box-border w-full gap-x-8">
        <VanButton type="primary" size="large" class="font-bold !rounded-xl !text-lg">
          Solo Quest
        </VanButton>

        <TextButton class="w-full flex items-center justify-center">
          Party Quest
        </TextButton>
      </div>

      <div class="h-33vh w-full">
        <div class="grid grid-cols-1 w-full gap-y-4 text-sm">
          <template v-for="(q, index) in quests" :key="q.title">
            <div class="bg-base van-haptics-feedback box-border w-full rounded-3xl px-4 py-4">
              <div
                class="w-full flex justify-between" @click="() => {
                  if (q.type === QuestType.Question) {
                    router.push(`/quest/${q.id}/question`)
                  }
                  else {
                    router.push(`/quest/${q.id}/photo`)
                  }

                  activeQuestIndex = index
                }"
              >
                <div class="flex font-bold" :class="q.done ? 'text-primary' : ''">
                  <div v-if="q.done" class="i-solar:check-circle-bold text-primary mr-1" />
                  <template v-else>
                    <div v-if="q.type === QuestType.Question" class="i-solar:question-circle-bold text-primary mr-1" />
                    <div v-else class="i-solar:camera-bold text-primary mr-1" />
                  </template>

                  {{ q.title }}
                </div>
                <div>{{ q.reward }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="flex justify-center">
        <img src="/boy-take-picture.png" alt="Boy Taking Picture" class="mb-4" width="250">
      </div>

      <div class="absolute bottom-5 left-0 w-full">
        <div class="w-full flex justify-center">
          <TextButton>
            Back
          </TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
