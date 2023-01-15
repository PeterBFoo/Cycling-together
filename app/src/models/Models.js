const DataTypes = require("sequelize");
const bycicleModel = require("./bycicle/BycicleModel").get();
const storeModel = require("./store/StoreModel").get();
const bookingModel = require("./booking/BookingModel").get();

const Models = {
	bycicle: function (sequelize) {
		return sequelize.define("bycicles", bycicleModel.properties(DataTypes));
	},
	store: function (sequelize) {
		return sequelize.define("stores", storeModel.properties(DataTypes));
	},
	booking: function (sequelize) {
		let properties = bookingModel.properties(DataTypes);

		properties.publicId = {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		};

		return sequelize.define("bookings", properties);
	}
};

module.exports = Models;