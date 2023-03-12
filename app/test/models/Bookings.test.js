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
        "total": 100,
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
        "total": 100,
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
        "total": 100,
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
        "total": 100,
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
        })
    }
    expect(setup).toThrow();
})

test("That booking has to be active based on his dates", () => {
    let day = new Date().getDate();
    let month = new Date().getMonth().toString();
    let year = new Date().getFullYear().toString();

    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    let dayBeforeNow = year + "-" + months[month] + "-" + (day - 1);
    let dayAfterNow = year + "-" + months[month] + "-" + (day + 1);
    let booking = bookingModel.activateBookings([{
        "name": "John",
        "surname": "Doe",
        "email": "test@test.com",
        "phoneNumber": "123456789",
        "bycicleId": 1,
        "storeId": 1,
        "total": 100,
        "startDate": dayBeforeNow,
        "endDate": dayAfterNow
    }]);

    expect(booking[0].isActive).toBeTruthy();
})

test("That booking has to be inactive based on his days", () => {
    let booking = bookingModel.activateBookings([{
        "name": "John",
        "surname": "Doe",
        "email": "test@test.com",
        "phoneNumber": "123456789",
        "bycicleId": 1,
        "storeId": 1,
        "total": 100,
        "startDate": "2023-05-01",
        "endDate": "2023-05-03"
    }])[0];

    expect(booking).toBeFalsy();
})

test("That booking has to be active to be deactivated", () => {
    let day = new Date().getDate();
    let month = new Date().getMonth().toString();
    let year = new Date().getFullYear().toString();

    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    let dayBeforeNow = year + "-" + months[month] + "-" + (day - 1);
    let dayAfterNow = year + "-" + months[month] + "-" + (day + 1);
    let booking = bookingModel.activateBookings([{
        "name": "John",
        "surname": "Doe",
        "email": "test@test.com",
        "phoneNumber": "123456789",
        "bycicleId": 1,
        "storeId": 1,
        "total": 100,
        "startDate": dayBeforeNow,
        "endDate": dayAfterNow
    }])[0];

    expect(booking.isActive).toBeTruthy();

    // let's change the dates to be in the future

    booking.startDate = dayAfterNow;
    booking.endDate = dayAfterNow;

    // now that booking is active, can be deactivated

    booking = bookingModel.deactivateBookings([booking])[0];

    expect(booking.isActive).toBeFalsy();
})