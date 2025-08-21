import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { config } from "../config/index.js";

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "your_api_key_here");

export async function inferIngredientsFromImage(imagePath: string): Promise<string[]> {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Convert to base64
    const base64Image = imageBuffer.toString("base64");

    // Get the generative model for vision tasks
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      }
    });

    const prompt = "Identify the dish or main ingredients in this image. Return ONLY a valid JSON array of ingredient names, without any additional text or formatting. Example: [\"pasta\", \"tomato\", \"cheese\"]";

    // Create the correct image part format
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg" // Change to "image/png" if your images are PNG
      }
    };

    // Generate content - CORRECT FORMAT
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            imagePart
          ]
        }
      ]
    });
    
    const response = await result.response;
    const text = response.text().trim();

    // Clean and parse the response
    let cleanText = text;
    
    // Remove code formatting if present
    if (cleanText.includes('```json')) {
      cleanText = cleanText.replace(/```json|```/g, '').trim();
    }
    
    // Extract JSON array from the response
    const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }

    // Parse the JSON and validate
    const ingredients = JSON.parse(cleanText);
    
    return Array.isArray(ingredients) 
      ? ingredients.filter(item => item && typeof item === 'string' && item.trim() !== '')
      : ["Unknown Ingredient"];

  } catch (error) {
    console.error("Gemini API error:", error);
    return ["Unknown Ingredient"];
  }
}