import type { Request, Response } from "express";
import { inferIngredientsFromText } from "../services/llm.service.js";
import { inferIngredientsFromImage } from "../services/vision.service.js";
import { estimateCarbon } from "../services/carbon.service.js";

export const estimateDish = async (req: Request, res: Response) => {
  try {
    const { dish } = req.body;
    const ingredients = await inferIngredientsFromText(dish);
    const cleanJson:any = ingredients?.replace(/```json|```/g, '').trim();
    const ingredientsArray = JSON.parse(cleanJson);
    const carbonData = estimateCarbon(dish, ingredientsArray);
    res.json(carbonData);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to estimate dish" });
  }
};

export const estimateImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Image required" });

    const ingredients = await inferIngredientsFromImage(file.path);
    const carbonData = estimateCarbon("Image Dish", ingredients);
    res.json(carbonData);
  } catch (error) {
    res.status(500).json({ error: "Failed to estimate image" });
  }
};
