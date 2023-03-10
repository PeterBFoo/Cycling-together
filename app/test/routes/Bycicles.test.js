const request = require("supertest");
const app = require("../../app");
const { test } = require("@jest/globals");

test("GET /bycicles", async () => {
    const response = await request(app).get("/bycicles");
    expect(response.statusCode).toBe(200);
    expect(response.body.length > 1).toBeTruthy();
});

test("GET /bycicles/get/:id", async () => {
    const res = await request(app).get("/bycicles/get/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
});

test("GET /bycicles/get/:id", async () => {
    let id = 843;
    const res = await request(app).get("/bycicles/get/" + id);

    expect(res.statusCode).toBe(404);
});

test("GET /get/category/:category", async () => {
    const res = await request(app).get("/bycicles/get/category/Mountain Bike");

    expect(res.statusCode).toBe(200);
    expect(res.body.length > 1).toBeTruthy();
});

test("POST /bycicles/register", async () => {
    await request(app)
        .post("/bycicles/register")
        .send({
            "model": "test",
            "category": "Road Bike",
            "brand": "Specialized",
            "weight": 8.3,
            "frame": "Carbon fiber",
            "suspension": null,
            "fork": "Specialized FACT carbon fiber",
            "wheels": "Specialized Roval CLX 50 Disc",
            "wheelSize": 62,
            "brakes": "Shimano Ultegra hydraulic disc",
            "groupSet": "Shimano Ultegra Di2 electronic",
            "driveTrain": "2x11 speed",
            "frontTravel": null,
            "seatpost": "Specialized S-Works carbon fiber",
            "price": 29.99,
            "photo": ""
        })
        .expect((res) => {
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("id");
        });
});

test("POST /bycicles/register 201 without optional parameters", async () => {
    await request(app)
        .post("/bycicles/register")
        .send({
            "model": "test",
            "category": "Mountain Bike",
            "brand": "Trek",
            "weight": 14.5,
            "frame": "Aluminum",
            "fork": "RockShox Recon RL",
            "wheelSize": 73,
            "brakes": "Shimano MT200 hydraulic disc",
            "driveTrain": "1x10 speed",
            "seatpost": "Bontrager Rhythm Elite",
            "price": 19.99,
            "photo": ""
        })
        .expect((res) => {
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("id");
        });
});

test("POST /bycicles/register 400", async () => {
    await request(app)
        .post("/bycicles/register")
        .send({})
        .expect(400);
});

test("PUT /bycicles/update/:id", async () => {
    const res = await request(app)
        .put("/bycicles/update/1")
        .send({
            "model": "new test",
            "category": "Road Bike",
            "brand": "Specialized",
            "weight": 8.3,
            "frame": "Carbon fiber",
            "suspension": null,
            "fork": "Specialized FACT carbon fiber",
            "wheels": "Specialized Roval CLX 50 Disc",
            "wheelSize": 62,
            "brakes": "Shimano Ultegra hydraulic disc",
            "groupSet": "Shimano Ultegra Di2 electronic",
            "driveTrain": "2x11 speed",
            "frontTravel": null,
            "seatpost": "Specialized S-Works carbon fiber",
            "price": 29.99,
            "storeId": 1,
            "photo": "testtest"
        })
        .expect(200);
});

test("PUT /bycicles/update/:id 404", async () => {
    let id = 943;
    const res = await request(app)
        .put("/bycicles/update/" + id)
        .send({
            "model": "new model",
            "category": "Road Bike",
            "brand": "Specialized",
            "weight": 8.3,
            "frame": "Carbon fiber",
            "suspension": null,
            "fork": "Specialized FACT carbon fiber",
            "wheels": "Specialized Roval CLX 50 Disc",
            "wheelSize": 62,
            "brakes": "Shimano Ultegra hydraulic disc",
            "groupSet": "Shimano Ultegra Di2 electronic",
            "driveTrain": "2x11 speed",
            "frontTravel": null,
            "seatpost": "Specialized S-Works carbon fiber",
            "price": 29.99,
            "storeId": 1,
            "photo": ""
        })
        .expect(404);

    expect(res.body.message).toContain("Cannot find Bycicle with id=943.");
});

test("DELETE /bycicles/delete/:id 200", async () => {
    let id = 13;
    await request(app)
        .delete("/bycicles/delete/one/" + id)
        .expect(200);
});

test("DELETE /bycicles/delete/:id 404", async () => {
    let id = 943;
    await request(app)
        .delete("/bycicles/delete/one/" + id)
        .expect(404);
});
