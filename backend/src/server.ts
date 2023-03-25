import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const openaiConfig = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});

const openai = new OpenAIApi(openaiConfig);

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const chatGPT = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    res.json(chatGPT.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching response from GPT-3 API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
