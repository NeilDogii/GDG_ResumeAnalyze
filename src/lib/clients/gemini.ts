import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../environment/gemini";

export const GoogleGenAIClient = new GoogleGenAI({
    apiKey: GEMINI_API_KEY()
});