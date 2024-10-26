const questRepo = require("../repositories/quest");

exports.getAllQuests = async () => {
  try {
    const quests = await questRepo.getQuests();
    return { message: "List quests", data: quests };
  } catch (err) {
    console.error("quest::getAllQuests - err: ", err);
    throw err;
  }
};

exports.addQuest = async (req) => {
  // INSERT INTO quests (id, type, title, reward, is_party, description, objectives, mind_file, lon_lat) VALUES (1, 'photo', 'test quest photo A', 1000, FALSE, 'description testing', ARRAY['objective 1', 'objective 2'], NULL, '(41.8781, -87.6298)');
  const {
    type,
    title,
    reward,
    is_party,
    description,
    objectives,
    mind_file,
    lon_lat,
  } = req.body;
  try {
    const quest = await questRepo.insertQuest(
      type, title, reward, is_party, description,
      objectives, mind_file, lon_lat
    );
    return { message: "Quest added successfully", data: quest };
  } catch (err) {
    console.error("quest::addQuest - err: ", err);
    throw err;
  }
};
