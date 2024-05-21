const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html', (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send(err);
        }
    });
});

app.post('/get_recommendations', async (req, res) => {
    const { country, duration, groupSize } = req.body;

    const prompt = `Provide a list of travel recommendations for ${groupSize} people going to ${country} for ${duration} days.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful travel assistant.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const recommendations = response.data.choices[0].message.content.trim();
        res.json({ recommendations: recommendations });
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API error:', error.response.data);
            res.status(500).json({ error: 'Error fetching recommendations from OpenAI', details: error.response.data });
        } else if (error.request) {
            console.error('No response from OpenAI API:', error.request);
            res.status(500).json({ error: 'No response from OpenAI API' });
        } else {
            console.error('Error setting up OpenAI API request:', error.message);
            res.status(500).json({ error: 'Error setting up OpenAI API request', details: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
