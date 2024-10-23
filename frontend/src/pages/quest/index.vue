<script setup lang="ts">
const router = useRouter()
enum QuestType {
  Question = "question",
  Photo = "photo",
}

interface QuestList {
  id: number
  type: QuestType
  title: string
  reward: string
}

const quests = ref<QuestList[]>([
  {
    id: 1,
    type: QuestType.Question,
    title: "Question 1",
    reward: "30 exp",
  },
  {
    id: 2,
    type: QuestType.Photo,
    title: "Photo 1",
    reward: "30 exp & voucher",
  },
])
</script>

<template>
  <VanNavBar
    title="Quest List"
    left-text="Back"
    left-arrow
    class="mb-8"
  />

  <div class="h-full w-full flex justify-center overflow-y-scroll">
    <div class="h-full container">
      <div class="grid grid-cols-1 w-full gap-y-4">
        <template v-for="q in quests" :key="q.title">
          <div class="bg-base van-haptics-feedback box-border w-full rounded-xl px-4 py-4">
            <div
              class="mb-2 w-full flex justify-between" @click="() => {
                if (q.type === QuestType.Question) {
                  router.push(`/quest/${q.id}/question`)
                }
                else {
                  router.push(`/quest/${q.id}/photo`)
                }

              }"
            >
              <div>{{ q.title }}</div>
              <div>{{ q.type }}</div>
            </div>

            <div class="italic">
              Reward: {{ q.reward }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
