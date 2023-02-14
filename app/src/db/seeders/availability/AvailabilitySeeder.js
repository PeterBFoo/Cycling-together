const db = require("../../connection.js");
const availabilityModel = require("../../../models/availability/AvailabilityModel").get();
const queryInterface = db.connection.getQueryInterface();
const Availability = db.availabilities;


module.exports = {
    up: async () => {
        const bycicles = await queryInterface.sequelize.query(
            "SELECT * from BYCICLES;"
        );

        const stores = await queryInterface.sequelize.query(
            "SELECT * from STORES;"
        );

        let storeNames = [];
        stores[0].forEach(store => {
            storeNames.push(store.storeName);
        });

        var data = [];
        bycicles[0].forEach(bycicle => {
            let included = false;
            storeNames.forEach(storeName => {
                if (bycicle.model.toLowerCase().includes(storeName.toLowerCase())) {
                    included = true;
                    data.push(availabilityModel.setup({
                        bycicleId: bycicle.id,
                        stock: 10,
                        storeId: stores[0].find(store => { return store.storeName === storeName }).id
                    }));
                }
            });
            if (!included) {
                data.push(availabilityModel.setup({
                    bycicleId: bycicle.id,
                    stock: 10,
                    storeId: stores[0][0].id
                }));
            }
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




