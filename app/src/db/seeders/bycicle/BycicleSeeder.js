const db = require("../../connection.js");
var data = require("../../mocks/bycicles.json");
const queryInterface = db.connection.getQueryInterface();
const Bycicle = db.bycicles;


module.exports = {
	up: async () => {
		const stores = await queryInterface.sequelize.query(
			"SELECT id from STORES;"
		);

		console.log("\x1b[42m%s\x1b[0m", "SEEDING BYCICLES");
		data.forEach((bycicle) => {
			bycicle.storeId = stores[0][Math.floor(Math.random() * stores[0].length)].id;
		});

		await Bycicle.sync({ force: true });
		await Bycicle.bulkCreate(data);
	},
	down: async () => {
		console.log("\x1b[41m%s\x1b[0m", "DROPPING BYCICLES");
		await Bycicle.destroy({ where: {}, truncate: false });
	}
};




