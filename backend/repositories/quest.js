const db = require(".");

exports.getQuests = async () => {
  try {
    const res = await db.query("SELECT * FROM quests");
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};
