const db = require("../../connection.js");
const availabilityModel = require("../../../models/availability/AvailabilityModel").get();
const queryInterface = db.connection.getQueryInterface();
const Availability = db.availabilities;


module.exports = {
    up: async () => {
        const bycicles = await queryInterface.sequelize.query(
            "SELECT * from BYCICLES;"
        );

        var data = [];
        bycicles[0].forEach(bycicle => {
            data.push(availabilityModel.setup({
                bycicleId: bycicle.id,
                stock: 10,
                storeId: 1
            }));
        });

        console.log("\x1b[42m%s\x1b[0m", "SEEDING AVAILABILITIES");
        await Availability.sync({ force: true });
        await Availability.bulkCreate(data);
    },
    down: async () => {
        console.log("\x1b[41m%s\x1b[0m", "DROPPING AVAILABILITIES");
        await Availability.destroy({ where: {}, truncate: false });
    }
};




