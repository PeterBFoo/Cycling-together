const request = require('supertest');
const app = require('../../app');

test("Display welcome message", () => {
    return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Welcome");
    });
})