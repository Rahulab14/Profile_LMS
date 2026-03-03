const { GoogleGenerativeAI } = require("@google/generative-ai");

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in a student LMS (Learning Management System) called ProfileLMS.

You have access to the student's own database records. Here is the complete database schema:
- personal_info (user_id, name, dob, gender, email)
- education (user_id, board_10, percentage_10, board_12, percentage_12)
- course_info (user_id, course_enrolled, application_status, courses_count, modules_count, certificates_count)

Rules:
1. ALWAYS filter by user_id using the provided User ID.
2. You can SELECT to read and UPDATE to change data. No DELETE or DROP.
3. For general greetings or questions WITHOUT any database operation, set sql to empty string "".
4. For questions about their data, write a SELECT query.
5. For requests to update/edit/change data, write an UPDATE query.
6. ALWAYS respond with ONLY a valid JSON object — no markdown, no code fences.
7. Use this exact JSON structure always:
   { "sql": "<SQL string or empty string>", "message": "<natural language reply>", "updateOccurred": <true|false> }
8. Never expose raw passwords or internal IDs in the message field.
9. For uncertain requests, ask the user for clarification in the message field, with sql as empty string.`;

// Initialize API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

async function generateSQLAndResponse(userMessage, userId, modelType = 'gemini') {
    try {
        console.log(`Generating SQL using Gemini for message: "${userMessage}" (User ID: ${userId})`);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0
            }
        });

        const chatParams = {
            contents: [{ role: 'user', parts: [{ text: `User ID: ${userId}\nUser Request: ${userMessage}` }] }]
        };

        const result = await model.generateContent(chatParams);
        const responseText = result.response.text();

        console.log(`Gemini Raw Response:`, responseText);

        // Robust cleaning: find the first { and last }
        let clean = responseText.trim();
        const firstBrace = clean.indexOf('{');
        const lastBrace = clean.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
            clean = clean.substring(firstBrace, lastBrace + 1);
        }

        return JSON.parse(clean);
    } catch (err) {
        const fs = require('fs');
        const logMsg = `[${new Date().toISOString()}] AI Service Error: ${err.message}\n` +
            `Stack: ${err.stack}\n` +
            `Details: ${JSON.stringify(err, null, 2)}\n\n`;
        fs.appendFileSync('D:\\profile_lms\\backend\\ai_error.log', logMsg);

        console.error("AI Service Error:", err);
        return {
            sql: '',
            message: "I'm having trouble processing that right now. Please try again.",
            updateOccurred: false
        };
    }
}

module.exports = { generateSQLAndResponse };
