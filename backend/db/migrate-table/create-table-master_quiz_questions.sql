CREATE TABLE master_quiz_questions (
  id SERIAL PRIMARY KEY,
  question TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
