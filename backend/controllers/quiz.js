const userRepo = require('../repositories/user');
const quizRepo = require("../repositories/quiz");
const predictionServices = require('../services/prediction');

exports.getQuestions = async (req) => {
  const { types } = req.query;
  try {
    const questions = await quizRepo.getQuestionList(types);
    return { message: "List questions", data: questions };
  } catch (err) {
    console.error("quiz::getQuestions - err: ", err);
    throw err;
  }
};

exports.submitAnswers = async (req) => {
  const { user_id, quiz_question_id, quiz_answer_id } = req.body;
  try {
    const result = await quizRepo.insertAnswers(user_id, quiz_question_id, quiz_answer_id);
    return { message: "Submit answers", data: result };
  } catch (err) {
    console.error("quiz::submitAnswers - err: ", err);
    throw err;
  }
};

exports.getPersonalityResult = async (req) => {
  const { user_id, types } = req.body;
  try {
    const questionAnswers = await quizRepo.getQuestionAnswer(user_id, types);
    const personalityResult = await predictionServices.getPersonality(questionAnswers);
    await userRepo.updatePersonalityByEmail(personalityResult, user_id)
    return { message: "Get personality result", data: personalityResult };
  } catch (err) {
    console.error("quiz::getPersonalityResult - err: ", err);
    throw err;
  }
}