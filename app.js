"use strict";

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sajikan file HTML
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/chat', async (req, res) => {
    try {
        console.log('Received POST request to /api/chat');
        console.log('Request body:', req.body);

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-8b-8192"
        });

        const reply = chatCompletion.choices[0]?.message?.content || "";
        console.log('Reply:', reply);

        res.json({
            reply: reply
        });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});