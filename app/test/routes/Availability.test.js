const request = require("supertest");
const app = require("../../app");
const { test, describe } = require("@jest/globals");

describe("GET /availability", () => {
    test("It should respond with an array of availability", async () => {
        const response = await request(app).get("/availability");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("GET /availability/:bycicleId/:storeId", () => {
    test("It should respond with an availability", async () => {
        const response = await request(app).get("/availability/1/1");
        expect(response.statusCode).toBe(200);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).get("/availability/abc/abc");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with a 404", async () => {
        const response = await request(app).get("/availability/84635/84635");
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /availability/bycicle/:bycicleId", () => {
    test("It should respond with an array of availability", async () => {
        const response = await request(app).get("/availability/bycicle/1");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).get("/availability/bycicle/abc");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with a 404", async () => {
        const response = await request(app).get("/availability/bycicle/84635");
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /availability/store/:storeId", () => {
    test("It should respond with an array of availability", async () => {
        const response = await request(app).get("/availability/store/1");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).get("/availability/store/abc");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with a 404", async () => {
        const response = await request(app).get("/availability/store/84635");
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /availability/register", () => {
    test("It should respond with an availability", async () => {
        const response = await request(app).post("/availability/register").send({
            bycicleId: 13,
            storeId: 2,
            stock: 5
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("bycicleId");
        expect(response.body).toHaveProperty("storeId");
        expect(response.body).toHaveProperty("stock");
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).post("/availability/register").send({
            bycicleId: "abc",
            storeId: 1,
            stock: 5
        });
        expect(response.statusCode).toBe(400);

    });

    test("It should respond with an error message", async () => {
        const response = await request(app).post("/availability/register").send({
            bycicleId: 1,
            storeId: "abc",
            stock: 5
        });
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).post("/availability/register").send({
            bycicleId: 1,
            storeId: 1,
            stock: "abc"
        });
        expect(response.statusCode).toBe(400);
    });
});

describe("PUT /availability/:bycicleId/:storeId/:stock", () => {
    test("It should respond with an availability", async () => {
        const response = await request(app).put("/availability/1/1/10");
        expect(response.statusCode).toBe(200);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).put("/availability/abc/1/10");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).put("/availability/1/abc/10");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).put("/availability/1/1/abc");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with a 404", async () => {
        const response = await request(app).put("/availability/84635/84635/10");
        expect(response.statusCode).toBe(404);
    });
});
