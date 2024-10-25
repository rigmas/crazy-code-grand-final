CREATE TABLE master_quiz_answers (
  id SERIAL PRIMARY KEY,
  answer TEXT,
  options VARCHAR(6),
  quiz_question_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_master_quiz_question_master_quiz_answer FOREIGN KEY (quiz_question_id) REFERENCES master_quiz_questions(id)
);
