import { defineStore } from "pinia"
import type { QuestDetail } from "~/schemas/quest"

export const useQuestStore = defineStore("QuestStore", () => {
  const quests = ref<QuestDetail[]>([])
  const activeQuestIndex = ref<number>()
  const activeQuest = computed(() => {
    if (activeQuestIndex.value === null || quests.value.length === 0) {
      return
    }

    return quests.value[activeQuestIndex.value!]
  })

  return {
    quests,
    activeQuest,
    activeQuestIndex,
  }
})
