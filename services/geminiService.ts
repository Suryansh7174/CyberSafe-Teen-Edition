
import { GoogleGenAI, Type } from "@google/genai";
import { ScamReport } from "../types";

// Fix: Always use process.env.API_KEY directly as mandated in the guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to extract JSON from a potentially markdown-wrapped string
const sanitizeJsonResponse = (text: string) => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? jsonMatch[0] : text;
};

export const analyzeScamMessage = async (message: string): Promise<ScamReport> => {
  // Fix: Create instance right before API call to ensure latest config
  const ai = getAI();
  try {
    // Using Pro model for complex security analysis and reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a tactical security audit on this message. Target audience: Teenager. 
      Analyze for: Phishing, malware bait, social engineering, or grooming patterns.
      Message: "${message}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isScam: { 
                type: Type.BOOLEAN,
                description: "Whether the message is malicious or suspicious."
            },
            confidence: { 
                type: Type.NUMBER,
                description: "Confidence score between 0 and 1."
            },
            explanation: { 
                type: Type.STRING,
                description: "Cool, teen-friendly explanation of why it's a scam or safe."
            },
            redFlags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Specific tactical red flags found."
            },
            safeAction: { 
                type: Type.STRING,
                description: "The immediate action the user should take."
            }
          },
          required: ["isScam", "confidence", "explanation", "redFlags", "safeAction"]
        }
      }
    });

    // Fix: Directly use .text property as it is a getter, not a method
    const sanitizedText = sanitizeJsonResponse(response.text || '{}');
    return JSON.parse(sanitizedText);
  } catch (error) {
    console.error("AI Audit Failure:", error);
    // Graceful fallback for the UI
    return {
      isScam: true,
      confidence: 0.5,
      explanation: "Shield's neural link hit a snag, but this message looks pretty sus. Better safe than sorry, Guardian.",
      redFlags: ["System Timeout during scan", "Ambiguous pattern detected"],
      safeAction: "Don't click anything and block the sender just in case."
    };
  }
};

export const getSecurityAdvice = async (query: string): Promise<string> => {
  // Fix: Create instance right before API call to ensure latest config
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are 'Shield', an elite cyber-defense AI for teenagers. Use modern lingo (sus, red flag, no cap, L, W, core) but keep it professional and authoritative. Use markdown for structure. Keep responses punchy, helpful, and visually engaging with emojis. Never give dangerous advice."
      }
    });

    // Fix: Directly use .text property
    return response.text || "I'm recalibrating my data streams. Hit me up again in a sec.";
  } catch (error) {
    console.error("AI Advice Failure:", error);
    return "Shield is currently in high-sec lock-down. Check back later.";
  }
};
