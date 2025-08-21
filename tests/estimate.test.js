import request from "supertest";
import app from "../src/app";
describe("POST /api/estimate", () => {
    it("should return carbon data for a dish", async () => {
        const res = await request(app)
            .post("/api/estimate")
            .send({ dish: "Pasta" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("dish");
        expect(res.body).toHaveProperty("ingredients");
    });
});
//# sourceMappingURL=estimate.test.js.map