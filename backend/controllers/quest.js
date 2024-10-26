const questRepo = require('../repositories/quest');

exports.getAllQuests = async () => {
  try {
    const quests = await questRepo.getQuests();
    return { message: "List quests", data: quests };
  } catch (err) {
    console.error("quest::getAllQuests - err: ", err);
    throw err;
  }
}

exports.addNewUserQuest = async (req) => {
  const { quest_id, user_id } = req.params
  try {
    const userQuest = await questRepo.insertUserQuest(user_id, quest_id, false);
    return { message: "Add new user quest", data: userQuest };
  } catch (err) {
    console.error("quest::addNewUserQuest - err: ", err);
    throw err;
  }
}

exports.completeUserQuest = async (req) => {
  const { quest_id, user_id } = req.params
  try {
    const userQuest = await questRepo.completeUserQuest(user_id, quest_id, true);
    return { message: "Complete user quest", data: userQuest };
  } catch (err) {
    console.error("quest::completeUserQuest - err: ", err);
    throw err;
  }
}

exports.getUserQuestXp = async (req) => {
  const { user_id } = req.params
  try {
    const userQuest = await questRepo.getTotalXpUserQuests(user_id);
    return { message: "Get total xp user quests", data: userQuest };
  } catch (err) {
    console.error("quest::getUserQuestXp - err: ", err);
    throw err;
  }
}