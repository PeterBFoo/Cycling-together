const bycicleSeeder = require("./bycicle/BycicleSeeder");
const storeSeeder = require("./store/StoreSeeder");
const bookingSeeder = require("./booking/BookingSeeder");
const availabilitySeeder = require("./availability/AvailabilitySeeder");

var dbActions = {
	seed: async () => {
		await storeSeeder.up();
		console.log("\x1b[36m%s\x1b[0m", "\nStore seeder done 🏬\n".toUpperCase());
		await bycicleSeeder.up();
		console.log("\x1b[36m%s\x1b[0m", "\nBycicle seeder done 🚲\n".toUpperCase());
		await availabilitySeeder.up();
		console.log("\x1b[36m%s\x1b[0m", "\nAvailability seeder done ✅ \n".toUpperCase());
		await bookingSeeder.up();
		console.log("\x1b[36m%s\x1b[0m", "\nBooking seeder done 📄 \n".toUpperCase());

	},
	drop: async () => {
		await storeSeeder.down();
		await bycicleSeeder.down();
		await availabilitySeeder.down();
		await bookingSeeder.down();
	}
};

dbActions.seed();