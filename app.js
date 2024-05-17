"use strict";

require('dotenv').config();
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function main() {
    try {
        const chatCompletion = await getGroqChatCompletion();
        // Print the completion returned by the LLM.
        process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "make me a simple code for hello world using html"
            }
        ],
        model: "llama3-8b-8192"
    });
}

module.exports = {
    main,
    getGroqChatCompletion
};

if (require.main === module) {
    main();
}