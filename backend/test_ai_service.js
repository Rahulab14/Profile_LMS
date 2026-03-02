require('dotenv').config();
const { generateSQLAndResponse } = require('./src/chatbot/ai.service');

async function debugUpdate() {
    console.log("Testing generateSQLAndResponse for UPDATE query...");
    try {
        const result = await generateSQLAndResponse("change my 10th mark to 90", 1);
        console.log("AI Result:", result);

        if (result.sql && result.sql.toLowerCase().includes('update education')) {
            console.log("SUCCESS: It recognized an update query for 10th marks.");
        } else {
            console.log("FAILURE: Did not generate correct UPDATE query.");
        }
    } catch (err) {
        console.error("Test Failed:", err);
    }
}

debugUpdate();
