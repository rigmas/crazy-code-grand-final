CREATE TABLE master_personalities (
  id SERIAL PRIMARY KEY,
  personality VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
