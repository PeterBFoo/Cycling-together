const bycicleSeeder = require("./bycicle/BycicleSeeder");
const storeSeeder = require("./store/StoreSeeder");
const env = require("../../config/dbconfig");

var dbSeeder = {
	seed: async (env) => {
		await storeSeeder.up(env);
		await bycicleSeeder.up(env);
	},
	drop: async () => {
		await storeSeeder.down();
		await bycicleSeeder.down();
	}
};

dbSeeder.seed(env.NODE_ENV);