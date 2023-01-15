const db = require("../../connection.js");
const bookingModel = require("../../../models/booking/BookingModel").get();
const queryInterface = db.connection.getQueryInterface();
const clientsData = require("../../mocks/clients.json");
const Booking = db.bookings;


module.exports = {
    up: async () => {
        const numberOfBookings = 2;
        const bycicles = await queryInterface.sequelize.query(
            "SELECT * from BYCICLES;"
        );
        var data = [];

        for (let i = 0; i < numberOfBookings; i++) {
            data.push(bookingModel.setup({
                name: clientsData[i].name,
                surname: clientsData[i].surname,
                email: clientsData[i].email,
                phoneNumber: clientsData[i].phoneNumber,
                bycicleId: bycicles[0][i].id,
                storeId: bycicles[0][i].storeId,
                startDate: "2023-05-01",
                startDateHour: "10:00",
                endDate: "2023-05-03",
                endDateHour: "10:00",
            }));
        }

        console.log("\x1b[42m%s\x1b[0m", "SEEDING BOOKINGS");
        await Booking.sync({ force: true });
        await Booking.bulkCreate(data);
    },
    down: async () => {
        console.log("\x1b[41m%s\x1b[0m", "DROPPING BOOKINGS");
        await Booking.destroy({ where: {}, truncate: false });
    }
};




