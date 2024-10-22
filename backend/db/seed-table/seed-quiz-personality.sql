-- SEED QUESTIONS

INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (1, 'What kind of adventure would excite you the most?', 'personality', CURRENT_TIMESTAMP);

INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (2, 'If you were planning a day with your pack, what role would you take?', 'personality', CURRENT_TIMESTAMP);

INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (3, 'You’re invited to a party. What’s your natural instinct?', 'personality', CURRENT_TIMESTAMP);

INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (4, 'What’s your favorite way to relax after a long day?', 'personality', CURRENT_TIMESTAMP);

INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (5, 'If you were an animal, what would your perfect hangout spot be?', 'personality', CURRENT_TIMESTAMP);



-- SEED ANSWERS QUESTION 1

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Soaring like an eagle over breathtaking landscapes', 'A', 1, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Working together like bees to build something extraordinary', 'B', 1, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Quietly observing like a wise owl, taking in all the details', 'C', 1, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Frolicking like playful dolphins in a social sea of friends', 'D', 1, CURRENT_TIMESTAMP);


-- SEED ANSWERS QUESTION 2

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Leading like a lion, setting the pace for a wild adventure', 'A', 2, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Organizing like a diligent ant, making sure everything runs smoothly', 'B', 2, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Offering wisdom like a thoughtful tortoise, guiding with insight', 'C', 2, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Spreading joy like a monkey, keeping everyone laughing and engaged', 'D', 2, CURRENT_TIMESTAMP);


-- SEED ANSWERS QUESTION 3

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Scout the scene like a curious fox, always looking for hidden gems', 'A', 3, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Gather your crew like a wolf, because fun is better with a team', 'B', 3, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Perch quietly like a cat, observing before making a move', 'C', 3, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Bounce around like a kangaroo, meeting as many people as possible', 'D', 3, CURRENT_TIMESTAMP);


-- SEED ANSWERS QUESTION 4

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Stretching out in the sun like a panther, basking in the quiet', 'A', 4, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Building a cozy den like a beaver, working on a side project', 'B', 4, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Perched in a tree like an owl, reflecting on the day’s adventures', 'C', 4, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Swimming with friends like a dolphin, unwinding with good company', 'D', 4, CURRENT_TIMESTAMP);


-- SEED ANSWERS QUESTION 5

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('At the top of a mountain like a goat, taking in the view', 'A', 5, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('In a buzzing hive like a bee, collaborating on something creative', 'B', 5, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('High in the treetops like a sloth, chilling with a book', 'C', 5, CURRENT_TIMESTAMP);

INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('In the open savanna like a zebra, always surrounded by your herd', 'D', 5, CURRENT_TIMESTAMP);



-- 1. What kind of adventure would excite you the most?
-- A) Soaring like an eagle over breathtaking landscapes
-- B) Working together like bees to build something extraordinary
-- C) Quietly observing like a wise owl, taking in all the details
-- D) Frolicking like playful dolphins in a social sea of friends

-- 2. If you were planning a day with your pack, what role would you take?
-- A) Leading like a lion, setting the pace for a wild adventure
-- B) Organizing like a diligent ant, making sure everything runs smoothly
-- C) Offering wisdom like a thoughtful tortoise, guiding with insight
-- D) Spreading joy like a monkey, keeping everyone laughing and engaged

-- 3. You’re invited to a party. What’s your natural instinct?
-- A) Scout the scene like a curious fox, always looking for hidden gems
-- B) Gather your crew like a wolf, because fun is better with a team
-- C) Perch quietly like a cat, observing before making a move
-- D) Bounce around like a kangaroo, meeting as many people as possible

-- 4. What’s your favorite way to relax after a long day?
-- A) Stretching out in the sun like a panther, basking in the quiet
-- B) Building a cozy den like a beaver, working on a side project
-- C) Perched in a tree like an owl, reflecting on the day’s adventures
-- D) Swimming with friends like a dolphin, unwinding with good company

-- 5. If you were an animal, what would your perfect hangout spot be?
-- A) At the top of a mountain like a goat, taking in the view
-- B) In a buzzing hive like a bee, collaborating on something creative
-- C) High in the treetops like a sloth, chilling with a book
-- D) In the open savanna like a zebra, always surrounded by your herd


-- -- SEED QUESTIONS

-- INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (1, 'What kind of adventure would excite you the most?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (2, 'If you were planning a day with your pack, what role would you take?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (3, 'You’re invited to a party. What’s your natural instinct?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (4, 'What’s your favorite way to relax after a long day?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_questions (id, question, types, created_at) VALUES (5, 'If you were an animal, what would your perfect hangout spot be?', 'personality', CURRENT_TIMESTAMP);


-- -- SEED ANSWERS QUESTION 1
-- INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('Soaring like an eagle over breathtaking landscapes', 'A', 1, CURRENT_TIMESTAMP);
-- INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('testing', 'B', 1, CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('If you were planning a day with your pack, what role would you take?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('You’re invited to a party. What’s your natural instinct?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('What’s your favorite way to relax after a long day?', 'personality', CURRENT_TIMESTAMP);

-- INSERT INTO master_quiz_answers (answer, options, quiz_question_id, created_at) VALUES ('If you were an animal, what would your perfect hangout spot be?', 'personality', CURRENT_TIMESTAMP);


-- 1. What kind of adventure would excite you the most?
-- A) Soaring like an eagle over breathtaking landscapes
-- B) Working together like bees to build something extraordinary
-- C) Quietly observing like a wise owl, taking in all the details
-- D) Frolicking like playful dolphins in a social sea of friends

-- 2. If you were planning a day with your pack, what role would you take?
-- A) Leading like a lion, setting the pace for a wild adventure
-- B) Organizing like a diligent ant, making sure everything runs smoothly
-- C) Offering wisdom like a thoughtful tortoise, guiding with insight
-- D) Spreading joy like a monkey, keeping everyone laughing and engaged

-- 3. You’re invited to a party. What’s your natural instinct?
-- A) Scout the scene like a curious fox, always looking for hidden gems
-- B) Gather your crew like a wolf, because fun is better with a team
-- C) Perch quietly like a cat, observing before making a move
-- D) Bounce around like a kangaroo, meeting as many people as possible

-- 4. What’s your favorite way to relax after a long day?
-- A) Stretching out in the sun like a panther, basking in the quiet
-- B) Building a cozy den like a beaver, working on a side project
-- C) Perched in a tree like an owl, reflecting on the day’s adventures
-- D) Swimming with friends like a dolphin, unwinding with good company

-- 5. If you were an animal, what would your perfect hangout spot be?
-- A) At the top of a mountain like a goat, taking in the view
-- B) In a buzzing hive like a bee, collaborating on something creative
-- C) High in the treetops like a sloth, chilling with a book
-- D) In the open savanna like a zebra, always surrounded by your herd