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
    expect(res.body.message).toBe(`Cannot find Bycicle with id=${id}.`);
});

test("POST /bycicles/register", async () => {
    const res = request(app)
        .post("/bycicles/register")
        .send({
            "category": "Tazz",
            "weight": 22,
            "frame": "Sonsing",
            "suspension": "Daltfresh",
            "fork": "Stronghold",
            "wheels": "Otcom",
            "wheelSize": 72,
            "brakes": "Bamity",
            "groupSet": "Sub-Ex",
            "driveTrain": 22,
            "frontTravel": "Zontrax",
            "seatPost": "Bamity",
            "storeId": 1
        })
        .end((err, res) => {
            if (err) {
                throw err;
            } else {
                expect(res.statusCode).toBe(201);
                expect(res.body.message).toEqual("Bycicle was registered successfully.");
                expect(res.body.data).toHaveProperty("id");
            }
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
            "category": "Updated",
            "weight": 22,
            "frame": "Updated",
            "suspension": "Updated",
            "fork": "Updated",
            "wheels": "Updated",
            "wheelSize": 72,
            "brakes": "Updated",
            "groupSet": "Updated",
            "driveTrain": 20,
            "frontTravel": "Updated",
            "seatPost": "Updated",
            "storeId": 1
        })
        .expect(200);
});

test("PUT /bycicles/update/:id 404", async () => {
    let id = 943;
    const res = await request(app)
        .put("/bycicles/update/" + id)
        .send({
            "category": "Updated",
            "weight": 22,
            "frame": "Updated",
            "suspension": "Updated",
            "fork": "Updated",
            "wheels": "Updated",
            "wheelSize": 72,
            "brakes": "Updated",
            "groupSet": "Updated",
            "driveTrain": 20,
            "frontTravel": "Updated",
            "seatPost": "Updated",
            "storeId": 1
        })
        .expect(404);

    expect(res.body.message).toEqual(`Cannot update Bycicle with id=${id}.`);
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
