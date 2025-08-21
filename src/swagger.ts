import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import type { Express } from "express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Foodprint Carbon API",
      version: "1.0.0",
      description: "API to estimate carbon footprint of dishes",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  // Try these different path patterns:
  apis: [
    "./src/routers/*.ts",           // For development (TypeScript files)
    "./dist/src/routers/*.js"                   // Broad search (be careful with this)
  ]
};
const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {

  // Check if swaggerSpec has valid content
  if (!swaggerSpec || Object.keys(swaggerSpec).length === 0) {
    console.error("Swagger specification is empty or invalid");
    return;
  }

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Also provide raw JSON spec
  app.get("/docs-json", (req, res) => {
    res.json(swaggerSpec);
  });
}