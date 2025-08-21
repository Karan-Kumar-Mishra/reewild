# 🌱 Reewild Foodprint API

A backend service that estimates the **carbon footprint of dishes** from either a **dish name** or an **image upload**.  
Built with **Node.js + TypeScript + Express**, integrates with **OpenAI APIs** (LLM + Vision), and packaged with **Docker**.

---

## 🚀 Features

- 🍲 **Dish-based estimation** → `POST /api/estimate`  
- 📷 **Image-based estimation** → `POST /api/estimate/image`  
- 🛠 **Mock fallback** if OpenAI API is unavailable  
- 📦 **Multer** middleware for image uploads  
- 📚 **Swagger Docs** at `/docs`  
- ⚡ **Error handling middleware** with clean JSON responses  
- 🧪 **Unit tests (Jest + Supertest)**  
- 🐳 **Dockerized** for production  

---

## 📂 Project Structure

reewild-backend/
│── src/
│ ├── app.ts # Express app
│ ├── server.ts # Server entry point
│ ├── config/ # Config & env
│ ├── routes/ # API routes
│ ├── controllers/ # Request handlers
│ ├── services/ # OpenAI + carbon services
│ ├── middleware/ # Error handler & upload
│ ├── utils/ # Helpers
│ └── types/ # Type definitions
│
│── tests/ # Jest test cases
│── Dockerfile
│── docker-compose.yml
│── tsconfig.json
│── package.json
│── README.md
│── .env.example


---

## ⚙️ Setup

### 1. Clone repo
```bash
git clone https://github.com/<your-username>/reewild-backend.git
cd reewild-backend
pnpm install
pnpm run dev
pnpm run build
pnpm start
```
🐳 Docker
Build image

```
docker build -t reewild-backend .
docker-compose up --build

```

📖 API Documentation
After starting the server, visit:

👉 http://localhost:4000/docs

Swagger UI provides request/response examples.

🧪 Running Tests

Run Jest tests:

```
pnpm test
```

Example test: tests/estimate.test.ts
✔️ Checks /api/estimate returns expected JSON.

📡 Example Requests
Dish-based estimate

```
curl -X POST http://localhost:4000/api/estimate \
  -H "Content-Type: application/json" \
  -d '{"dish": "Chicken Biryani"}'
```

Response:

```
{
  "dish": "Chicken Biryani",
  "estimated_carbon_kg": 4.2,
  "ingredients": [
    { "name": "Rice", "carbon_kg": 1.1 },
    { "name": "Chicken", "carbon_kg": 2.5 },
    { "name": "Spices", "carbon_kg": 0.2 },
    { "name": "Oil", "carbon_kg": 0.4 }
  ]
}

```
Image-based estimate

```
curl -X POST http://localhost:4000/api/estimate/image \
  -F "image=@/path/to/dish.jpg"
```

🔑 Design Decisions

Layered architecture → routes → controllers → services

Separation of concerns → LLM, Vision, Carbon logic isolated in services

Type safety → Strongly typed with TypeScript

Error resilience → Central error handler

Production readiness → Docker, .env, Jest, Swagger

🧭 Future Improvements

Replace mock carbon values with real dataset

Add authentication (JWT / API key)

CI/CD with GitHub Actions

Deploy to AWS/GCP/Azure

Caching for repeated dishes

