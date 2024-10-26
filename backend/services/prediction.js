const openai = require("../repositories/openai");

exports.getPersonality = async (data) => {
  const prompt = `
   I need you work as a expert psycologist.
   You only need to decide between two "Introvert" or "Extrovert". 
   You dont need to say anything, ONLY CHOOSE ONE either "Introvert" or Extrovert", based on data below

   Data:
   ${JSON.stringify(data, null, 2)}
  `;

  const result = await openai.generateText(prompt);
  return result.content;
};
