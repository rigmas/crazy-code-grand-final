CREATE TABLE master_quiz_answers (
  id SERIAL PRIMARY KEY,
  answer TEXT,
  option varchar(6),
  quiz_question_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
