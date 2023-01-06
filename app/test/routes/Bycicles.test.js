const request = require("supertest");
const app = require("../../app");

test("GET /bycicles", async () => {
    const response = await request(app).get("/bycicles");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(10);
});

test("GET /bycicles/get/:id", async () => {
    const res = await request(app).get("/bycicles/get/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
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

test("PUT /bycicles/update/:id", async () => {
    const res = await request(app)
        .put("/bycicles/update/2")
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
        });

    expect(res.body.message).toEqual("Bycicle was updated successfully.");
});

test("DELETE /bycicles/delete/one/id", async () => {
    const res = await request(app).delete("/bycicles/delete/one/1");
    expect(res.body.message).toEqual("Bycicle was deleted successfully!");
});

/**
test("DELETE /bycicles/delete/all", async () => {
    const res = await request(app).delete("/bycicles/delete/all");
    expect(res.body.message).toEqual("10 Bycicles were deleted successfully!");
})
*/