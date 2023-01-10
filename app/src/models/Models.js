const DataTypes = require("sequelize");
const bycicleModel = require("./bycicle/BycicleModel.js").get();
const storeModel = require("./store/StoreModel.js").get();

const Models = {
	bycicle: function (sequelize) {
		const Bycicle = sequelize.define("bycicles", bycicleModel.properties(DataTypes));
		return Bycicle;
	},
	store: function (sequelize) {
		const Store = sequelize.define("stores", storeModel.properties(DataTypes));
		return Store;
	}
};

module.exports = Models;