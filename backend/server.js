const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { prompt, type } = req.body;
    console.log(`Received prompt: ${prompt}, type: ${type}`);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
                { role: 'system', content: `You are a helpful assistant specialized in generating ${type}.` },
                { role: 'user', content: prompt }
            ],
            max_tokens: 1500,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        console.log('OpenAI API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error with OpenAI API request:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while generating content' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
