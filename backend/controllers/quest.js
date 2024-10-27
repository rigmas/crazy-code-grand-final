const questRepo = require("../repositories/quest");
const mindfileServices = require('../services/mindfile');

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

exports.updateQuestMindFile = async (req) => {
  const { quest_id } = req.params;
  const { mind_file } = req.body;
  try {
    const mindFilePath = mindfileServices.uploadFileBase64(`${quest_id}_mind_file`, mind_file, '.mind')
    const quest = await questRepo.updateMindFile(quest_id, mindFilePath);
    
    return { message: "Quest mindfile updated successfully", data: quest };
  } catch (err) {
    console.error("quest::updateQuestMindFile - err: ", err);
    throw err;
  }
};


exports.getQuestMindFile = async (req) => {
  const { quest_id } = req.params;
  try {
    const mindFilePath = await questRepo.getQuestMindFilePath(quest_id);
    if (!mindFilePath) return { message: "Quest mindfile not found", data: null };

    const mindFile = mindfileServices.readFileBinary(mindFilePath?.mind_file);
    
    return mindFile
  } catch (err) {
    console.error("quest::getQuestMindFile - err: ", err);
    throw err;
  }
}