import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedQuestionResponse } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not set in environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateQuestionWithAI = async (topic: string, difficulty: string): Promise<GeneratedQuestionResponse> => {
  const ai = getAiClient();
  
  const prompt = `Create a single multiple-choice question for an English test.
  Topic: ${topic}
  Difficulty: ${difficulty}
  
  Please ensure the question tests grammar or vocabulary effectively.
  Return the result in JSON format only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questionText: { type: Type.STRING, description: "The question stem" },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN }
                }
              }
            },
            explanation: { type: Type.STRING, description: "Why the correct answer is correct" }
          },
          required: ["questionText", "options", "explanation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedQuestionResponse;

  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
};

export const generateImageForQuestion = async (prompt: string, size: '1K' | '2K' | '4K'): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const extractQuestionsFromImage = async (base64Image: string): Promise<GeneratedQuestionResponse[]> => {
  const ai = getAiClient();
  
  // Extract base64 data and mime type from data URL
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image format");
  }
  const mimeType = matches[1];
  const data = matches[2];

  const prompt = `Analyze this image which contains an English quiz or test.
  Extract all the questions found in the image.
  For each question, identify the question text, the options, and the correct answer.
  If the correct answer is not explicitly marked in the image, please solve the question yourself to find the correct answer.
  Provide a brief explanation for the answer.
  Return the output as a JSON array of questions.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: prompt }
        ]
      },
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    isCorrect: { type: Type.BOOLEAN }
                  }
                }
              },
              explanation: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as GeneratedQuestionResponse[];
  } catch (error) {
    console.error("Error extracting questions from image:", error);
    throw error;
  }
};