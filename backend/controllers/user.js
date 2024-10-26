const userRepo = require("../repositories/user");

exports.completeUserQuest = async (req) => {
  const { quest_id, user_id } = req.params
  try {
    const userQuest = await userRepo.completeUserQuest(user_id, quest_id, true);
    return { message: "Complete user quest", data: userQuest };
  } catch (err) {
    console.error("quest::completeUserQuest - err: ", err);
    throw err;
  }
}

exports.getUserQuestXp = async (req) => {
  const { user_id } = req.params
  try {
    const userQuest = await userRepo.getTotalXpUserQuests(user_id);
    return { message: "Get total xp user quests", data: userQuest ?? null };
  } catch (err) {
    console.error("quest::getUserQuestXp - err: ", err);
    throw err;
  }
}

exports.addNewUser = async (req) => {
  const { name, email, room_number, check_in_date, check_out_date } = req.body;
  try {
    const user = await userRepo.insertUser(
      name,
      email,
      room_number,
      check_in_date,
      check_out_date
    );
    return { message: "Add new user", data: user };
  } catch (err) {
    console.error("user::addNewUser - err: ", err);
    res.status(500).json({ error: "Failed to add new user" });
  }
};

exports.getUserLeaderboard = async () => {
  try {
    const user = await userRepo.getUserLeaderboard();
    return { message: "Get user leaderboard", data: user };
  } catch (err) {
    console.error("user::getUserLeaderboard - err: ", err);
    throw err;
  }
}
