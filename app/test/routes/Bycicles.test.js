const request = require("supertest");
const app = require("../../app");

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
    expect(res.body.message).toContain(`Cannot find Bycicle with id=${id}.`);
});

test("GET /get/category/:category", async () => {
    const res = await request(app).get("/bycicles/get/category/Mountain Bike");

    expect(res.statusCode).toBe(200);
    expect(res.body.length > 1).toBeTruthy();
});

test("POST /bycicles/register", async () => {
    const res = request(app)
        .post("/bycicles/register")
        .send({
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
            "storeId": 1
        })
        .end((err, res) => {
            if (err) {
                throw err;
            } else {
                expect(res.statusCode).toBe(201);
                expect(res.body.message).toContain("Bycicle was registered successfully.");
                expect(res.body.data).toHaveProperty("id");
            }
        });
});

test("POST /bycicles/register 201 without optional parameters", async () => {
    await request(app)
        .post("/bycicles/register")
        .send({
            "category": "Mountain Bike",
            "brand": "Trek",
            "weight": 14.5,
            "frame": "Aluminum",
            "fork": "RockShox Recon RL",
            "wheelSize": 73,
            "brakes": "Shimano MT200 hydraulic disc",
            "driveTrain": "1x10 speed",
            "seatpost": "Bontrager Rhythm Elite",
            "storeId": 1
        })
        .expect((res) => {
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toContain("Bycicle was registered successfully.");
            expect(res.body.data).toHaveProperty("id");
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
            "storeId": 1
        })
        .expect(200);
});

test("PUT /bycicles/update/:id 404", async () => {
    let id = 943;
    const res = await request(app)
        .put("/bycicles/update/" + id)
        .send({
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
            "storeId": 1
        })
        .expect(404);

    expect(res.body.message).toContain(`Cannot update Bycicle with id=${id}.`);
});

test("DELETE /bycicles/delete/:id 204", async () => {
    let id = 1;
    await request(app)
        .delete("/bycicles/delete/one/" + id)
        .expect(204);
});

test("DELETE /bycicles/delete/:id 404", async () => {
    let id = 943;
    await request(app)
        .delete("/bycicles/delete/one/" + id)
        .expect(404);
});
