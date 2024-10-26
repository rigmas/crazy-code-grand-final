<script setup lang="ts">
import { useRouter } from "vue-router"
import type { Question, QuizAnswer } from "~/schemas/personality"
import { getQuizQuestions, submitQuizAnswer } from "~/services/personality"
import { useAuthStore } from "~/stores/auth.store"

const authStore = useAuthStore()
const router = useRouter()
const user = computed(() => authStore.user)

const quizQuestions = ref<Question[]>([])
const currentQuestionIndex = ref(0)
const userId = user.value?.id

onMounted(async () => {
  const res = await getQuizQuestions()
  quizQuestions.value = res.data
})

async function submitAnswer(answerId: number) {
  const body: QuizAnswer = {
    user_id: userId,
    quiz_question_id: quizQuestions.value[currentQuestionIndex.value].id,
    quiz_answer_id: answerId,
  }

  await submitQuizAnswer(body)

  if (currentQuestionIndex.value === quizQuestions.value.length - 1) {
    await router.push("/personality/finish")
    return
  }
  currentQuestionIndex.value++
};

const progress = computed(() => {
  return ((currentQuestionIndex.value + 1) / quizQuestions.value.length) * 100
})

const progressBarStyle = computed(() => {
  return {
    width: `${progress.value}%`,
    backgroundColor: progress.value === 100 ? "var(--van-primary-color)" : "var(--van-primary-color)",
  }
})
</script>

<template>
  <div class="box-border flex flex-col items-center justify-center gap-5 text-center">
    <div class="mb-3 mt-3 h-4 w-full rounded-full bg-gray-200">
      <div class="bg-primary h-full rounded-full" :style="progressBarStyle" />
    </div>
    <div class="text-primary text-2xl font-bold">
      Let's Get to Know You!
    </div>
    <div class="mb-1 text-lg text-gray-500">
      Answer these fun questions so we can customize your experience. Don't worry, there are no wrong answers!
    </div>
    <div class="mb-2 text-xl">
      {{ quizQuestions[currentQuestionIndex]?.question }}
    </div>

    <div v-for="answer in quizQuestions[currentQuestionIndex]?.answers" :key="answer.id">
      <van-button size="large" class="text-button-answer" @click="submitAnswer(answer.id)">
        {{ answer.answer }}
      </van-button>
    </div>
    <img class="ml-8 mt-5 h-[400px] w-[330px]" src="/boy-work.png">
  </div>
</template>

<style scoped>
.text-button-answer {
  text-align: left;
  padding: 1rem;
}
</style>
