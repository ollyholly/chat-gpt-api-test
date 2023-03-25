const { Configuration, OpenAIApi } = require('openai');

const openaiConfig = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});


const openai = new OpenAIApi(openaiConfig);

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const { messages } = JSON.parse(event.body);

    const chatGPT = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(chatGPT.data.choices[0].message),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error fetching response from GPT-3 API' }) };
  }
};
