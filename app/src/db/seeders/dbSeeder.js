const bycicleSeeder = require("./bycicle/BycicleSeeder");
const storeSeeder = require("./store/StoreSeeder");

var dbSeeder = {
	seed: async () => {
		await storeSeeder.up();
		await bycicleSeeder.up();
	},
	drop: async () => {
		await storeSeeder.down();
		await bycicleSeeder.down();
	}
};

dbSeeder.seed();