CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  room_number VARCHAR(50),
  user_personality_id INT NULL,
  check_in_date TIMESTAMP,
  check_out_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_personality FOREIGN KEY (user_personality_id) REFERENCES master_personalities(id)
);
