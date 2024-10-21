const db = require('.')

exports.getUserByEmail = async (email) => {
  try {
    const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}