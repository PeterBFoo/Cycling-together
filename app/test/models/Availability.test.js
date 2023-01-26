const { expect, test } = require("@jest/globals");

const availabilityModel = require("../../src/models/availability/AvailabilityModel.js").get();

test("Create a availability", () => {
    let availability = availabilityModel.setup({
        "bycicleId": 1,
        "stock": 12,
        "storeId": 1
    });

    expect(availability);
});

test("Create availabilities", () => {
    let availability1 = availabilityModel.setup({
        "bycicleId": 1,
        "stock": 12,
        "storeId": 1
    });

    let availability2 = availabilityModel.setup({
        "bycicleId": 2,
        "stock": 12,
        "storeId": 1
    });

    expect(availability1 == availability2).toBeFalsy();
});

test("Create availability with wrong properties", () => {
    let setup = function () {
        bookingModel.setup({
            "bycicleId": "ksd",
            "stock": null,
            "storeId": 1
        });
    }
    expect(setup).toThrow();
})