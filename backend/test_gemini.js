require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("System Instruction: You are a helpful assistant. Always output JSON.\n\nUser: Test connection: Reply with { \"status\": \"ok\" }");
        console.log("Response:", result.response.text());
    } catch (e) {
        console.log("Gemini Error:", e.message);
    }
}
test();
