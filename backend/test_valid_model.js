require('dotenv').config();

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            const validModels = data.models
                .filter(m => m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name.replace('models/', ''));
            console.log("VALID MODELS:", validModels.join(', '));

            // test the first one
            if (validModels.length > 0) {
                const testModel = validModels[0];
                console.log("Testing model:", testModel);
                const { GoogleGenerativeAI } = require('@google/generative-ai');
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: testModel });
                const result = await model.generateContent("Reply ok");
                console.log("Response:", result.response.text());
            }
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
listModels();
