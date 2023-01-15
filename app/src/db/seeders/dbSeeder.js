const bycicleSeeder = require("./bycicle/BycicleSeeder");
const storeSeeder = require("./store/StoreSeeder");
const bookingSeeder = require("./booking/BookingSeeder");

var dbActions = {
	seed: async () => {
		await storeSeeder.up();
		await bycicleSeeder.up();
		await bookingSeeder.up();
	},
	drop: async () => {
		await storeSeeder.down();
		await bycicleSeeder.down();
		await bookingSeeder.down();
	}
};

dbActions.seed();