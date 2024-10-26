export interface Question {
  id: number
  question: string
  types: string
  created_at: string
  answers: Answer[]
}

export interface Answer {
  id: number
  answer: string
  options: string
  quiz_question_id: number
}

export interface QuizAnswer {
  user_id: number | undefined
  quiz_question_id: number
  quiz_answer_id: number
}
