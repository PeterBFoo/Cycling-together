const db = require("../../connection.js");
const Store = db.stores;
const data = require("../../mocks/stores.json");

module.exports = {
	up: async () => {
		console.log("\x1b[42m%s\x1b[0m", "SEEDING STORES");
		await Store.sync({ force: true });
		await Store.bulkCreate(data);
	},
	down: async () => {
		console.log("\x1b[41m%s\x1b[0m", "DROPPING STORES");
		await Store.destroy({ where: {}, truncate: false });
	}
};