const db = require("../../connection.js");
const Store = db.stores;
const data = require("../../mocks/stores.json");

module.exports = {
	up: async (env) => {
		if (env === "test") {
			let testData = data.slice(0, 2);
			console.log("\x1b[43m%s\x1b[0m", "SEEDING STORES TEST");
			await Store.sync({ force: true });
			await Store.bulkCreate(testData);

		} else {
			console.log("\x1b[42m%s\x1b[0m", "SEEDING STORES");
			await Store.sync({ force: true });
			await Store.bulkCreate(data);
		}
	},
	down: async () => {
		console.log("\x1b[41m%s\x1b[0m", "DROPPING STORES");
		await Store.destroy({ where: {}, truncate: false });
	}
};