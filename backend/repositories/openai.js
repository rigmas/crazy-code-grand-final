const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateText = async (prompt, role = "user") => {
  const response = await openai.chat.completions.create({
    messages: [{ role, content: prompt }],
    model: "gpt-4o",
  });

  return response.choices[0].message;
};
