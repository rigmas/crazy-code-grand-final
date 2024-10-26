-- INSERT INTO quests (id, type, title, reward, is_party, description, objectives, mind_file, lon_lat) VALUES (1, 'photo', 'test quest photo A', 1000, FALSE, 'description testing', ARRAY['objective 1', 'objective 2'], NULL, '(41.8781, -87.6298)');

INSERT INTO user_quests (id, user_id, quest_id) VALUES (1, 1, 1);