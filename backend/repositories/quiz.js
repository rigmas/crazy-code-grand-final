const db = require(".");

exports.getQuestionList = async (types) => {
  try {
    const res = await db.query(
      `
      SELECT 
        mqq.id,
        mqq.question,
        mqq.types,
        mqq.created_at,
        json_agg(json_build_object(
          'id', mqa.id,
          'answer', mqa.answer,
          'options', mqa.options,
          'quiz_question_id', mqa.quiz_question_id
        )) AS answers
      FROM master_quiz_questions mqq
      LEFT JOIN master_quiz_answers mqa ON mqq.id = mqa.quiz_question_id
      WHERE mqq.types = $1
      GROUP BY mqq.id
      ORDER BY mqq.id ASC
      `,
      [types]
      // `
      // SELECT * FROM master_quiz_questions mqq
      // RIGHT JOIN master_quiz_answers mqa ON mqq.id = mqa.quiz_question_id
      // where mqq.types = $1 order by mqq.id asc
      // `, [types]
    );
    return res.rows;
  } catch (err) {
    throw err;
  }
};

exports.insertAnswers = async (userId, questionId, answerId) => {
  try {
    const res = await db.query(
      `
      INSERT INTO quiz_answer_question_users (user_id, quiz_question_id, quiz_answer_id, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *
      `,
      [userId, questionId, answerId]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getQuestionAnswer = async (userId, types) => {
  try {
    const res = await db.query(
      `
      SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        json_agg(
          json_build_object(
            'question', mq.question,
            'types', mq.types,
            'answer', ma.answer
          )
        ) AS question_answers
      FROM users u
      JOIN quiz_answer_question_users qaqu ON qaqu.user_id = u.id
      JOIN master_quiz_questions mq ON qaqu.quiz_question_id = mq.id
      JOIN master_quiz_answers ma ON qaqu.quiz_answer_id = ma.id AND ma.quiz_question_id = mq.id
      WHERE u.id = $1 AND mq.types = $2
      GROUP BY u.id;
      `,
      [userId, types]
    );
    return res.rows;
  } catch (err) {
    throw err;
  }
};
