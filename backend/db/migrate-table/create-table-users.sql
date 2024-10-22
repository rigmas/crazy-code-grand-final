CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  room_number VARCHAR(50),
  personality VARCHAR(32) NULL,
  check_in_date TIMESTAMP,
  check_out_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
