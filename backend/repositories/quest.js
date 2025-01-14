const db = require(".");

exports.getQuests = async () => {
  try {
    const res = await db.query("SELECT * FROM quests ORDER BY id ASC");
    return res.rows;
  } catch (err) {
    throw err;
  }
};

exports.insertQuest = async (
  type,
  title,
  reward,
  isParty,
  description,
  objectives,
  mindFile,
  lonLat
) => {
  try {
    const res = await db.query(
      `
      INSERT INTO quests (type, title, reward, is_party, description, objectives, mind_file, lon_lat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        type, title, reward, isParty, description, 
        objectives, mindFile, lonLat ? `(${lonLat[0]}, ${lonLat[1]})` : null
      ]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.updateMindFile = async (questId, mindFilePath) => {
  try {
    const res = await db.query(
      `
      UPDATE quests
      SET mind_file = $1
      WHERE id = $2
      RETURNING *
      `,
      [mindFilePath, questId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

exports.getQuestMindFilePath = async (questId) => {
  try {
    const res = await db.query(
      `
      SELECT mind_file
      FROM quests
      WHERE id = $1
      `,
      [questId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}