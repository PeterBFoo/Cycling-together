const db = require("../../connection.js");
const bookingModel = require("../../../models/booking/BookingModel").get();
const clientsData = require("../../mocks/clients.json");
const Booking = db.bookings;
const Availability = db.availabilities;


module.exports = {
    up: async () => {
        const numberOfBookings = 2;
        const availabilities = await Availability.findAll();
        var data = [];

        for (let i = 0; i < numberOfBookings; i++) {
            data.push(bookingModel.setup({
                name: clientsData[i].name,
                surname: clientsData[i].surname,
                email: clientsData[i].email,
                phoneNumber: clientsData[i].phoneNumber,
                bycicleId: availabilities[i].bycicleId,
                storeId: availabilities[i].storeId,
                startDate: "2023-01-15",
                endDate: "2023-01-20",
                total: 299.95
            }));
        }

        // FOR TESTING PURPOSES
        data.push({
            name: "Test",
            surname: "test",
            email: "test@test.com",
            phoneNumber: "123456789",
            bycicleId: 1,
            storeId: 1,
            startDate: "2023-01-15",
            endDate: "2023-01-20",
            isActive: false,
            publicId: "TESTTEST",
            total: 300
        });

        data.forEach(async booking => {
            if (booking.isActive) {
                let availability = await Availability.findOne({ where: { "bycicleId": booking.bycicleId, "storeId": booking.storeId } });

                await Availability.update({ stock: availability.stock - 1 }, { where: { "bycicleId": booking.bycicleId, "storeId": booking.storeId } });
            }
        });

        console.log("\x1b[42m%s\x1b[0m", "SEEDING BOOKINGS");
        await Booking.sync({ force: true });
        await Booking.bulkCreate(data);
    },
    down: async () => {
        console.log("\x1b[41m%s\x1b[0m", "DROPPING BOOKINGS");
        await Booking.destroy({ where: {}, truncate: false });
    }
};




