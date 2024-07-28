import axios from 'axios';

const API_KEY = 'YOUR_API_KEY_HERE';
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const getChatGPTResponse = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      prompt: prompt,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching response:', error);
    return null;
  }
};
