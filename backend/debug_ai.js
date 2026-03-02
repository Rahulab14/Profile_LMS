require('dotenv').config();
const { generateSQLAndResponse } = require('./src/chatbot/ai.service');

async function debug() {
    console.log("Debugging generateSQLAndResponse...");
    try {
        const result = await generateSQLAndResponse("What is my name?", 1, 'openai');
        console.log("Success with OpenAI:", result);
    } catch (err) {
        console.error("OpenAI Fallback Failed:", err);
    }

    try {
        const result = await generateSQLAndResponse("What is my name?", 1, 'xai');
        console.log("Result with xAI:", result);
    } catch (err) {
        console.error("xAI Call Failed:", err);
    }
}

debug();
