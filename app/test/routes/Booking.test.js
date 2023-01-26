const request = require("supertest");
const app = require("../../app");
const { test, describe, expect } = require("@jest/globals");
const utils = require("../../src/utils").get();

describe("GET /booking/:publicId", () => {
    test("It should respond with a booking", async () => {
        const response = await request(app).get("/booking/TESTTEST");
        expect(response.statusCode).toBe(200);
        expect(response.body.publicId).toEqual("TESTTEST");
    });

    test("It should respond with an error message", async () => {
        const response = await request(app).get("/booking/abc");
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with a 404", async () => {
        const response = await request(app).get("/booking/ABCDEFGH");
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /booking/register", () => {
    test("It should respond with a booking", async () => {
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let todayString = utils.parseDateToString(today);
        let tomorrowString = utils.parseDateToString(tomorrow);

        const res = await request(app)
            .post("/booking/register")
            .send({
                "name": "Test",
                "surname": "Test",
                "email": "test@test.com",
                "phoneNumber": "123456789",
                "bycicleId": 1,
                "storeId": 1,
                "startDate": todayString,
                "endDate": tomorrowString,
                "total": 200
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.isActive).toBeTruthy();
        expect(res.body.publicId).toBeDefined();
        expect(utils.parseDateToString(res.body.startDate)).toEqual(todayString);
        expect(utils.parseDateToString(res.body.endDate)).toEqual(tomorrowString);
    });

    test("It should respond with a 400 because the date is incorrect", async () => {
        const res = await request(app)
            .post("/booking/register")
            .send({
                "name": "Test",
                "surname": "Test",
                "email": "test@test.com",
                "phoneNumber": "123456789",
                "bycicleId": 1,
                "storeId": 1,
                "startDate": "2022-10-10",
                "endDate": "2022-10-10",
                "total": 200
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    })

    test("It should respond with a 404 because that store doesn't exist ", async () => {
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        today = utils.parseDateToString(today);
        tomorrow = utils.parseDateToString(tomorrow);

        const res = await request(app)
            .post("/booking/register")
            .send({
                "name": "Test",
                "surname": "Test",
                "email": "test@test.com",
                "phoneNumber": "123456789",
                "bycicleId": 1,
                "storeId": 4,
                "startDate": today,
                "endDate": tomorrow,
                "total": 200
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    })
});

describe("POST /booking/cancel/:publicId", () => {
    test("It should respond with a canceled booking", async () => {
        const res = await request(app).post("/booking/cancel/TESTTEST");
        expect(res.statusCode).toBe(200);
        expect(res.body.canceled).toBeTruthy();
    });

    test("It should respond with a 400 because ID is incorrect", async () => {
        const res = await request(app).post("/booking/cancel/abc");
        expect(res.statusCode).toBe(400);
    });

    test("It should respond with a 404 because doesn't find the booking", async () => {
        const res = await request(app).post("/booking/cancel/ABCDEFGH");
        expect(res.statusCode).toBe(404);
    });
});

describe("PUT /booking/update/:publicId", () => {
    test("Create a booking and modify the dates", async () => {
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let todayString = utils.parseDateToString(today);
        let tomorrowString = utils.parseDateToString(tomorrow);

        const res = await request(app)
            .post("/booking/register")
            .send({
                "name": "Test",
                "surname": "Test",
                "email": "test@test.com",
                "phoneNumber": "123456789",
                "bycicleId": 1,
                "storeId": 1,
                "startDate": todayString,
                "endDate": tomorrowString,
                "total": 200
            });

        let anotherDay = new Date();
        let anotherPostDay = new Date();
        anotherDay.setDate(tomorrow.getDate() + 1)
        anotherPostDay.setDate(tomorrow.getDate() + 2)

        let anotherDayString = utils.parseDateToString(anotherDay);
        let anotherPostDayString = utils.parseDateToString(anotherPostDay);

        expect(res.body.isActive).toBeTruthy();

        const res2 = await request(app).put("/booking/update/" + res.body.publicId)
            .send({
                "startDate": anotherDayString,
                "endDate": anotherPostDayString
            });

        expect(res2.statusCode).toBe(200);
        expect(res2.body.isActive).toBeFalsy();
        expect(utils.parseDateToString(res2.body.startDate)).toEqual(anotherDayString);
        expect(utils.parseDateToString(res2.body.endDate)).toEqual(anotherPostDayString);
    });

    test("Modify dates of a booking incorrectly and expect to fail", async () => {
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let todayString = utils.parseDateToString(today);
        let tomorrowString = utils.parseDateToString(tomorrow);

        const res = await request(app)
            .post("/booking/register")
            .send({
                "name": "Test",
                "surname": "Test",
                "email": "test@test.com",
                "phoneNumber": "123456789",
                "bycicleId": 1,
                "storeId": 1,
                "startDate": todayString,
                "endDate": tomorrowString,
                "total": 200
            });

        let response = await request(app).put("/booking/update/" + res.body.publicId)
            .send({
                "startDate": "2022-03-12",
                "endDate": "2022-05-12"
            })

        expect(response.statusCode).toBe(400);
    })

    test("Modify dates of a booking that doesn't exist and expect to fail", async () => {
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let todayString = utils.parseDateToString(today);
        let tomorrowString = utils.parseDateToString(tomorrow);

        let response = await request(app).put("/booking/update/ABCDEFGH")
            .send({
                "startDate": todayString,
                "endDate": tomorrowString
            })

        expect(response.statusCode).toBe(404);
    })
});
