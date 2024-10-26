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
