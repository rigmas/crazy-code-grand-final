<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import TextButton from "~/components/Common/TextButton.vue"
import { QuestDummyList, QuestType } from "~/schemas/quest"
import { getQuests } from "~/services/quest"
import { useQuestStore } from "~/stores/quest.store"

const router = useRouter()
// const quests = ref(QuestDummyList)

const { quests, activeQuestIndex } = storeToRefs(useQuestStore())

function navigate() {
  router.push("/quest/special-quest")
}

onMounted(async () => {
  const res = await getQuests()
  quests.value = [
    ...res.data,
    ...QuestDummyList,
  ]
})
</script>

<template>
  <div class="box-border h-full w-full px-8 md:px-0">
    <div class="h-full w-full flex flex-col">
      <div class="mb-8 mt-16 text-center text-lg font-bold line-height-tight">
        Complete fun quests to level up and earn rewards! Choose a solo quest or team up for a party quest.
      </div>

      <div class="w-full mb-6">
        <VanButton type="primary" size="large" class="font-bold !rounded-xl !text-lg" @click="navigate">
          Find Hidden Quest
        </VanButton>
      </div>

      <div class="grid grid-cols-2 mb-12 box-border w-full gap-x-8">
        <VanButton size="large" class="font-bold !rounded-xl !text-lg">
          Solo Quest
        </VanButton>

        <TextButton class="w-full flex items-center justify-center">
          Party Quest
        </TextButton>
      </div>

      <div class="h-33vh w-full overflow-y-auto">
        <div class="grid grid-cols-1 w-full gap-y-4 text-sm">
          <template v-for="(q, index) in quests.filter(q => q.type !== QuestType.Special)" :key="q.title">
            <div class="bg-primary van-haptics-feedback box-border w-full rounded-3xl px-4 py-4"
              :class="{ 'bg-gray-400': q.id === 1 }">
              <div class="w-full flex justify-between" @click="() => {
                if (q.type === QuestType.Question) {
                  router.push(`/quest/${q.id}/question`)
                }
                else {
                  router.push(`/quest/${q.id}/photo`)
                }

                activeQuestIndex = index
              }">
                <div class="flex text-white font-bold" :class="{ 'text-white': q.done, 'text-gray-500': q.id === 1 }">
                  <div v-if="q.done" class="i-solar:check-circle-bold text-white mr-1" />
                  <template v-else>
                    <div v-if="q.type === QuestType.Question" class="i-solar:question-circle-bold text-white mr-1" />
                    <div v-else class="i-solar:camera-bold text-white mr-1" />
                  </template>

                  {{ q.title }}
                </div>
                <div v-if="q.id === 1" class="i-solar:check-circle-bold text-white"></div>
                <div v-else class="text-white">{{ q.reward }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="flex justify-center">
        <img src="/boy-take-picture.png" alt="Boy Taking Picture" class="mb-12" width="220">
      </div>

      <div class="absolute bottom-5 left-0 w-full">
        <div class="w-full flex justify-center">
          <TextButton @click="() => {
            router.push('/home')
          }">
            Back
          </TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
