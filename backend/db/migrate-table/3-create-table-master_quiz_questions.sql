CREATE TABLE master_quiz_questions (
  id SERIAL PRIMARY KEY,
  question TEXT,
  types VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
