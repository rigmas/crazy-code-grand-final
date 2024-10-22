const openai = require("../repositories/openai");

exports.getPersonality = async (data) => {
  const prompt = `
   I need you work as a psycologist
   based on this answer questions data, 
   you only need to decide between two "Introvert" or "Extrovert". 
   You dont need to say anything, only decide on choose one either "Introvert" or Extrovert"

   Data:
   ${JSON.stringify(data, null, 2)}
  `;

  const result = await openai.generateText(prompt);
  return result.content;
};
