const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error("Database query error: ", err);
    throw err;
  } finally {
    client.release();
  }
}

async function closePool() {
  return pool
    .end()
    .then(() => console.log("Database pool closed"))
    .catch((err) => {
      console.error("Error closing database pool", err)
      process.exit(1);
    });
}

module.exports = {
  query,
  closePool,
};
