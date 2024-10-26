const db = require(".");

exports.getQuests = async () => {
  try {
    const res = await db.query("SELECT * FROM quests");
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.insertUserQuest = async (userId, questId, isDone) => {
  try {
    const res = await db.query(
      `
      INSERT INTO user_quests (user_id, quest_id, done)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [userId, questId, isDone]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.completeUserQuest = async (userId, questId, isDone) => {
  try {
    const res = await db.query(
      `
      UPDATE user_quests SET done = $1
      WHERE user_id = $2 AND quest_id = $3
      RETURNING *
      `,
      [isDone, userId, questId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getTotalXpUserQuests = async (userId) => {
  try {
    const res = await db.query(
      `
      SELECT 
      u.id AS user_id,
      u.name,
      u.email,
      COALESCE(SUM(CASE WHEN uq.done THEN CAST(q.reward AS INT) ELSE 0 END), 0) AS xp
      FROM 
        users u
      JOIN 
        user_quests uq ON u.id = uq.user_id
      JOIN 
        quests q ON uq.quest_id = q.id
      WHERE 
        u.id = $1
      GROUP BY 
        u.id;
      `,
      [userId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}