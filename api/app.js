const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    console.log(completion.data.choices[0].message);
    res.status(200).json({ response: completion.data.choices[0].message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.listen(3005, () => {
  console.log('Server listening on port 3005');
});
