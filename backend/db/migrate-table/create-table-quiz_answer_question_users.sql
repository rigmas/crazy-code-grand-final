CREATE TABLE quiz_answer_question_users (
  id SERIAL PRIMARY KEY,
  user_id INT,
  quiz_question_id INT,
  quiz_answer_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
