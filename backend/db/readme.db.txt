1. Use postgres
2. For creating table, please add on folder backend/db/migrate-table
eg.
create-table-users.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  room_number VARCHAR(50),
  check_in_date BIGINT,
  check_out_date BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

You can also add file for alter the table in this folder

3. For seeding data, please add on folder backend/db/seed-table
insert-users.sql
INSERT INTO users (name, email, room_number, check_in_date, check_out_date, created_at) VALUES ('Samuel', 'samuel@gmail.com', 'A-403', '1729436595018', '1729436658713', CURRENT_TIMESTAMP);