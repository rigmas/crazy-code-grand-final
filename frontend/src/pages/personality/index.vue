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
  <div class="flex justify-center p-8 flex-col text-center gap-5 items-center">
    <div class="w-full h-4 bg-gray-200 rounded-full mt-3 mb-3">
      <div class="h-full bg-primary rounded-full" :style="progressBarStyle"></div>
    </div>
    <div class="text-2xl text-primary font-bold">Let's Get to Know You!</div>
    <div class="text-lg mb-1 text-gray-500">
      Answer these fun questions so we can customize your experience. Don't worry, there are no wrong answers!
    </div>
    <div class="text-xl mb-2">
      {{ quizQuestions[currentQuestionIndex]?.question }}
    </div>

    <div v-for="answer in quizQuestions[currentQuestionIndex]?.answers" :key="answer.id">
      <van-button size="large" @click="submitAnswer(answer.id)" class="text-button-answer">
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
