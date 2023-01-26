const DataTypes = require("sequelize");
const bycicleModel = require("./bycicle/BycicleModel").get();
const storeModel = require("./store/StoreModel").get();
const bookingModel = require("./booking/BookingModel").get();
const availabilityModel = require("./availability/AvailabilityModel").get();

const Models = {
	bycicle: function (sequelize) {
		return sequelize.define("bycicles", bycicleModel.properties(DataTypes));
	},
	store: function (sequelize) {
		return sequelize.define("stores", storeModel.properties(DataTypes));
	},
	booking: function (sequelize) {
		return sequelize.define("bookings", bookingModel.properties(DataTypes));
	},
	availability: function (sequelize) {
		return sequelize.define("availabilities", availabilityModel.properties(DataTypes));
	}
};

module.exports = Models;