const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

const chatgpt_api_key = process.env.CHATGPT_API_KEY;
const chatgpt_completion_url = 'https://api.openai.com/v1/chat/completions';
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/', (req, res) => {
  const { message } = req.body;
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${chatgpt_api_key}`,
  };

  axios
    .post(chatgpt_completion_url, data, headers)
    .then(res => {
      console.log(res.data);
      res.status(200).send(`You sent this ${message}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(`ERROR ${err}`);
    });
});

app.get('/list', (req, res) => {
  const headers = {
    Authorization: 'Bearer ' + chatgpt_api_key,
  };
  axios
    .get('https://api.openai.com/v1/models', headers)
    .then(res => {
      console.log(res.data);
      res.status(200).send(`You sent this ${message}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(`ERROR ${err.message}`);
    });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
