import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const response = await openai
    .createCompletion({
      model: model,
      prompt: prompt.trim(),
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => {
      console.log(`回答が見つかりませんでした ${err.message}`);
    });

  return response;
};

export default query;
