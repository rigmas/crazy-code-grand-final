import { ofetch } from "ofetch"
import type { Question, QuizAnswer } from "~/schemas/personality"

export async function getQuizQuestions() {
  return await ofetch<{ data: Question[] }>(
    `${import.meta.env.VITE_PUBLIC_API_URL}/api/quiz/questions?types=personality`,
  )
}

export async function submitQuizAnswer(body: QuizAnswer) {
  return await ofetch(`${import.meta.env.VITE_PUBLIC_API_URL}/api/quiz/answers`, {
    method: "POST",
    body,
  })
}
