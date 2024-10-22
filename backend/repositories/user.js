const db = require(".");

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
