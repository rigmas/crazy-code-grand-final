CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  room_number VARCHAR(50),
  user_personality_id INT
  check_in_date BIGINT,
  check_out_date BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
