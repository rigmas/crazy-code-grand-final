<script setup lang="ts">
import { get, sleep } from "radash"

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
const selectedQuest = ref<Quest>({
  id: 1,
  type: QuestType.Question,
  title: "What life ?",
  description: "Is life truly a wonder, or but a fleeting illusion for the wandering soul? What drives thee to seek joy in a world veiled in sorrow and shadow? Tell me, traveler, what do you hope to find in this endless dance of despair and desire?",
})
const answer = ref()

function speak() {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(selectedQuest.value.description)

  // Select a voice
  const voices = speechSynthesis.getVoices()
  console.log(voices)
  utterance.voice = voices[0] // Choose a specific voice

  // Speak the text
  speechSynthesis.speak(utterance)
}

onBeforeUnmount(() => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel()
  }
})
onMounted(async () => {
  await sleep(1000)
  // speak()
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
    <div class="h-full container">
      <div class="mb-5 flex justify-center text-2xl font-bold">
        {{ selectedQuest.title }}
      </div>

      <div class="mb-2 italic">
        The Question
      </div>
      <div class="mb-8 flex justify-center text-xl">
        {{ selectedQuest.description }}
      </div>

      <div class="mb-2 italic">
        Your Answer
      </div>

      <van-cell-group>
        <van-field
          v-model="answer"
          type="textarea"
          placeholder="Alas life is nothing but despair"
          rows="1"
          autosize
        />
      </van-cell-group>

      <div class="mt-8 w-full flex">
        <van-button type="primary" size="large">
          Answer
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
