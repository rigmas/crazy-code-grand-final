const db = require(".");

exports.getUserLeaderboard = async () => {
  try {
    const res = await db.query(
      `
      SELECT
      u.id AS user_id,
      u.name,
      u.email,
      u.room_number,
      u.check_in_date,
      u.check_out_date,
      u.personality,
      COALESCE(SUM(q.reward), 0) AS total_xp
      FROM users u
      LEFT JOIN user_quests uq ON u.id = uq.user_id
      LEFT JOIN quests q ON uq.quest_id = q.id
      GROUP BY u.id, u.name, u.email, u.room_number, u.check_in_date, u.check_out_date, u.personality
      ORDER BY total_xp DESC
      `
    );
    return res.rows;
  } catch (err) {
    throw err;
  }
}

exports.getUserByEmail = async (email) => {
  try {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.updatePersonalityByEmail = async (personality, userId) => {
  try {
    const res = await db.query(
      `
      UPDATE users SET personality = $1
      WHERE id = $2 RETURNING *
      `,
      [personality, userId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.insertUser = async (name, email, roomNumber, checkInDate, checkoutDate) => {
  try {
    const res = await db.query(
      `
      INSERT INTO users (name, email, room_number, check_in_date, check_out_date)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [name, email, roomNumber, checkInDate, checkoutDate]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

exports.completeUserQuest = async (userId, questId, isDone) => {
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