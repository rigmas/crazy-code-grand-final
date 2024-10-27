-- quests
CREATE TABLE quests (
    id SERIAL PRIMARY KEY,
    type VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    reward INT NOT NULL,
    is_party BOOLEAN DEFAULT false,
    description TEXT,
    objectives TEXT[],
    mind_file TEXT,
    lon_lat POINT,
    is_deleted BOOLEAN default false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- user_quests
CREATE TABLE user_quests (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  quest_id INT NOT NULL,
  done BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_quest FOREIGN KEY (quest_id) REFERENCES quests(id),
  UNIQUE (user_id, quest_id)
);