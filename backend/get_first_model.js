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
            // print the exact first valid model
            console.log("FIRST_VALID_MODEL=" + validModels[0]);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
listModels();
