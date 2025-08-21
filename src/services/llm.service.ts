import OpenAI from "openai";
import { config } from "../config/index.js";
import { GoogleGenAI } from "@google/genai";


//AIzaSyByHYkdVOLzTi8jYuW45FQwKttRkeC3l2I
export async function inferIngredientsFromText(dish: string) {
  const prompt = `List the main ingredients for the dish "${dish}" as a JSON array of strings.`;
  const ai = new GoogleGenAI({});

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}
