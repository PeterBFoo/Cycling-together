const request = require("supertest");
const app = require("../../app");

test("GET /stores", async () => {
    const response = await request(app).get("/stores");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
});

test("GET /stores/get/:id", async () => {
    const res = await request(app).get("/stores/get/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
});

test("GET /stores/:id/bycicles", async () => {
    const res = await request(app).get("/stores/1/bycicles");

    expect(res.statusCode).toBe(200);
    res.body.bycicles.forEach((bycicle) => {
        expect(bycicle.storeId).toBe(1);
    });
});

test("POST /stores/register", async () => {
    const res = request(app)
        .post("/stores/register")
        .send({
            "storeName": "Test Store",
            "address": "Test Address",
            "city": "Test City",
            "country": "Test Country",
            "phoneNumber": "Test Phone Number",
            "email": "test@test.com",
            "website": "Test Website"
        })
        .end((err, res) => {
            if (err) {
                throw err;
            } else {
                expect(res.statusCode).toBe(201);
                expect(res.body.message).toEqual("Store was registered successfully.");
                expect(res.body.data).toHaveProperty("id");
            }
        });
});

test("PUT /stores/update/:id", async () => {
    const res = await request(app)
        .put("/stores/update/2")
        .send({
            "storeName": "Updated Test Store",
            "address": "Updated Test Address",
            "city": "Test City",
            "country": "Test Country",
            "phoneNumber": "Test Phone Number",
            "email": "test@test.com",
            "website": "Test Website"
        });

    expect(res.body.message).toEqual("Store was updated successfully.");
});

test("DELETE /stores/delete/one/id", async () => {
    const res = await request(app).delete("/stores/delete/one/1");
    expect(res.body.message).toEqual("Store was deleted successfully!");
});

test("DELETE /stores/delete/all", async () => {
    const res = await request(app).delete("/stores/delete/all");
    expect(res.body.message).toEqual("2 Stores were deleted successfully!");
})