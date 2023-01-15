const { expect, test } = require("@jest/globals");

const bookingModel = require("../../src/models/booking/BookingModel.js").get();

test("Create a new booking", () => {
    let booking = bookingModel.setup({
        "name": "John",
        "surname": "Doe",
        "email": "john@gmail.com",
        "phoneNumber": "123456789",
        "bycicleId": 1,
        "storeId": 1,
        "startDate": "2023-05-01",
        "endDate": "2023-05-03"
    });

    expect(booking.startDate).toBeInstanceOf(Date);
    expect(booking.endDate).toBeInstanceOf(Date);
    expect(booking).toBeTruthy();
});

test("Create bookings", () => {
    let booking = bookingModel.setup({
        "name": "John",
        "surname": "Doe",
        "email": null,
        "phoneNumber": "123456789",
        "bycicleId": 1,
        "storeId": 1,
        "startDate": "2023-05-01",
        "endDate": "2023-05-03"
    });

    let booking2 = bookingModel.setup({
        "name": "Mary",
        "surname": "Jane",
        "email": "test@test.com",
        "phoneNumber": "987654321",
        "bycicleId": 1,
        "storeId": 1,
        "startDate": "2023-05-01",
        "endDate": "2023-05-03"
    });

    expect(booking == booking2).toBeFalsy();
});

test("Create a new booking without optional parameters", () => {
    let booking = bookingModel.setup({
        "name": "John",
        "surname": "Doe",
        "phoneNumber": "123456789",
        "bycicleId": 1,
        "storeId": 1,
        "startDate": "2023-05-01",
        "endDate": "2023-05-03"
    });

    expect(booking.email).toBeDefined()
    expect(booking.email).toBe(null)
    expect(booking).toBeTruthy();
});

test("Create booking with wrong properties", () => {
    let setup = function () {
        bookingModel.setup({
            "name": "John",
            "surname": "Doe",
            "email": "john@gmail.com",
            "phoneNumber": "123456789",
            "bycicleId": 1,
            "storeId": 1,
            "startDate": "",
            "endDate": ""
        })
    }
    expect(setup).toThrow();
})