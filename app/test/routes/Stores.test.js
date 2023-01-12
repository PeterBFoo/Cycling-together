const request = require("supertest");
const app = require("../../app");

test("GET /stores", async () => {
    const response = await request(app).get("/stores");

    expect(response.statusCode).toBe(200);
    expect(response.body.length > 1).toBeTruthy();
});

test("GET /stores/get/:id", async () => {
    let id = 1;
    const res = await request(app).get("/stores/get/" + id);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
});

test("GET /stores/:id/bycicles", async () => {
    const res = await request(app).get("/stores/1/bycicles");

    expect(res.statusCode).toBe(200);
    res.body.bycicles.forEach((bycicle) => {
        expect(bycicle.storeId).toBe(1);
    });
});

test("POST /stores/register 201", async () => {
    await request(app)
        .post("/stores/register")
        .send({
            "storeName": "test",
            "address": "6918 test Lane",
            "city": "test",
            "country": "test",
            "phoneNumber": "test",
            "email": "test",
            "website": "test"
        })
        .expect(201)
        .expect((res) => {
            expect(res.body).toHaveProperty("id");
        });
});

test("POST /stores/register 201 without optional parameters", async () => {
    await request(app)
        .post("/stores/register")
        .send({
            "storeName": "test",
            "address": "6918 test Lane",
            "city": "test",
            "country": "test",
            "phoneNumber": "test",
            "email": "test"
        })
        .expect(201)
        .expect((res) => {
            console.log(res);
            expect(res.body).toHaveProperty("id");
        });
});

test("POST /stores/register 400", async () => {
    await request(app)
        .post("/stores/register")
        .send({})
        .expect(400);
});

test("PUT /stores/update/:id 200", async () => {
    let id = 1;

    await request(app)
        .put("/stores/update/" + id)
        .send({
            "storeName": "Updated Test Store",
            "address": "Updated Test Address",
            "city": "Test City",
            "country": "Test Country",
            "phoneNumber": "Test Phone Number",
            "email": "test@test.com",
            "website": "Test Website"
        })
        .expect(200);
});

test("PUT /stores/update/:id 404", async () => {
    let id = 754;

    await request(app)
        .put("/stores/update/" + id)
        .send({
            "storeName": "Updated Test Store",
            "address": "Updated Test Address",
            "city": "Test City",
            "country": "Test Country",
            "phoneNumber": "Test Phone Number",
            "email": "test@test.com",
            "website": "Test Website"
        })
        .expect(404);
});

test("DELETE /stores/delete/one/:id 204", async () => {
    let id = 1;

    await request(app)
        .delete("/stores/delete/one/" + id)
        .expect(200);
});

test("DELETE /stores/delete/one/:id 404", async () => {
    let id = 754;

    await request(app)
        .delete("/stores/delete/one/" + id)
        .expect(404);
});
