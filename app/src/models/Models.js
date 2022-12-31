const DataTypes = require("sequelize");
const bycicleModel = require("../models/bycicle/Bycicle.js");
const storeModel = require("../models/store/Store.js");

const Models = {
	bycicle: function (sequelize) {
		const Bycicle = sequelize.define("bycicles", bycicleModel.get().properties(DataTypes));
		return Bycicle;
	},
	store: function (sequelize) {
		const Store = sequelize.define("stores", storeModel.get().properties(DataTypes));
		return Store;
	}
};

module.exports = Models;