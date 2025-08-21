import { Router, type IRouter } from "express";
import { estimateDish, estimateImage } from "../controllers/estimate.controller.js";
import upload from "../middlewares/upload.js";

const router: IRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Estimate
 *   description: Carbon footprint estimation API
 */

/**
 * @swagger
 * /api/estimate:
 *   post:
 *     summary: Estimate carbon footprint from dish name
 *     tags: [Estimate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dish
 *             properties:
 *               dish:
 *                 type: string
 *                 description: Name of the dish to estimate
 *                 example: "Pasta with tomato sauce"
 *     responses:
 *       200:
 *         description: Successful carbon footprint estimate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dish:
 *                   type: string
 *                   example: "Pasta with tomato sauce"
 *                 carbonFootprint:
 *                   type: number
 *                   description: Carbon footprint in kg CO2 equivalent
 *                   example: 2.5
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "tomato"
 *                       carbonFootprint:
 *                         type: number
 *                         example: 0.4
 *       400:
 *         description: Bad request - missing dish parameter
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/estimate/image:
 *   post:
 *     summary: Estimate carbon footprint from dish image
 *     tags: [Estimate]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the dish
 *     responses:
 *       200:
 *         description: Successful carbon footprint estimate from image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dish:
 *                   type: string
 *                   example: "Pasta with tomato sauce"
 *                 carbonFootprint:
 *                   type: number
 *                   description: Carbon footprint in kg CO2 equivalent
 *                   example: 2.5
 *       400:
 *         description: Bad request - no image provided
 *       500:
 *         description: Internal server error
 */

router.post("/estimate", estimateDish);
router.post("/estimate/image", upload.single("image"), estimateImage);

export default router;