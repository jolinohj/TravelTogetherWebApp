const express = require('express');
const bodyParser = require('body-parser');
const { ChatGPT } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Initialize ChatGPT instance with your API key
const chatGPT = new ChatGPT({
    apiKey: process.env.OPENAI_API_KEY, // Make sure you set this environment variable
    timeout: 30000, // 30 seconds timeout
});

// Endpoint to handle POST requests with user answers
app.post('/api/generate', async (req, res) => {
    try {
        // Extract user answers from the request body
        const { question1, question2, question3 } = req.body;

        // Log the extracted user answers
        console.log('User Answers:', { question1, question2, question3 });

        // Construct the prompt/question to be sent to ChatGPT
        const prompt = `${question3} people are traveling to ${question1} for ${question2} days. Based on the above inputs, provide the following response:
1. Your group can visit xx (number of places based on number of days and country) places 
2. Table with list of places with details like price (if any), average time spent there, ratings, category of attraction (e.g. adventure, cultural, scenic, etc.)`;

        // Log the constructed prompt/question
        console.log('Prompt:', prompt);

        // Generate the response using ChatGPT
        const response = await chatGPT.complete(prompt);

        // Log the response from ChatGPT
        console.log('ChatGPT Response:', response.choices[0].text);

        // Send the response back to the frontend
        res.json({ response: response.choices[0].text });
    } catch (error) {
        // Log any errors that occur
        console.error('Error:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.env.OPENAI_API_KEY