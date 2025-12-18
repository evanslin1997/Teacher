import { GoogleGenAI } from "@google/genai";

async function tryGenerateWithRetry(ai, prompt, maxRetries = 2) {
    const models = ["gemini-2.5-flash-lite"];

    for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
        const model = models[modelIndex];

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const response = await ai.models.generateContent({
                    model: model,
                    contents: prompt,
                });
                return response.text;
            } catch (error) {
                const isLastAttempt = attempt === maxRetries;
                const isLastModel = modelIndex === models.length - 1;

                // If 503 (overloaded) and not last attempt, wait and retry
                if (error.message?.includes('503') || error.message?.includes('overloaded')) {
                    if (!isLastAttempt) {
                        await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
                        continue;
                    } else if (!isLastModel) {
                        console.log(`Model ${model} overloaded, trying fallback...`);
                        break; // Try next model
                    }
                }

                // For other errors or last attempt, throw
                if (isLastAttempt && isLastModel) {
                    throw error;
                }
            }
        }
    }
}

export async function generateComment(apiKey, studentName, traits, config) {
    try {
        const ai = new GoogleGenAI({ apiKey });

        const stylesText = (config.styles && config.styles.length > 0)
            ? config.styles.join('、')
            : '溫馨鼓勵';

        const traitsText = traits.length > 0
            ? traits.join('、')
            : '無特定特質';

        const prompt = `
你是一位資深教師，正在撰寫學生的學期評語。

學生姓名：${studentName}
學生特質：${traitsText}

評語要求：
- 風格：${stylesText}
- 字數限制：約 ${config.wordCount || 150} 字
- 語言：繁體中文（台灣）
- 內容要具體、建設性，展現對學生的關心與期許
- 不要包含「學生姓名：」或「老師：」等前綴，直接輸出評語內容

請根據以上要求，為這位學生撰寫一段溫暖且有意義的學期評語。
    `;

        return await tryGenerateWithRetry(ai, prompt);
    } catch (error) {
        console.error("Error generating comment:", error);
        throw error;
    }
}
