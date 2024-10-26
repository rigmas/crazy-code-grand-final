const db = require(".");

exports.getQuests = async () => {
  try {
    const res = await db.query("SELECT * FROM quests");
    return res.rows;
  } catch (err) {
    throw err;
  }
};
