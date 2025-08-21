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
        url: process.env.NODE_ENV === 'production' 
          ? "https://reewild.onrender.com" 
          : "http://localhost:3000",
        description: process.env.NODE_ENV === 'production' 
          ? "Production server" 
          : "Development server",
      },
    ],
  },
  apis: [
    "./src/routers/*.ts",
    "./dist/src/routers/*.js"
  ]
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  // Check if swaggerSpec has valid content
  if (!swaggerSpec || Object.keys(swaggerSpec).length === 0) {
    console.error("Swagger specification is empty or invalid");
    return;
  }

  // Use CDN for Swagger UI assets to fix MIME type issues
  const swaggerUiOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-standalone-preset.js',
    ],
    customSiteTitle: "Foodprint Carbon API",
   
  };

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

  // Also provide raw JSON spec
  app.get("/docs-json", (req, res) => {
    res.json(swaggerSpec);
  });

  // Prevent favicon 404 errors
  app.get('/docs/favicon-32x32.png', (req, res) => {
    res.status(204).end();
  });

  app.get('/docs/favicon-16x16.png', (req, res) => {
    res.status(204).end();
  });
}