const bycicleModel = require("../models/bycicle/Bycicle.js");
const common = require("./CommonMiddleware.js");

var bycicleMiddleware = (function () {
	function validateRequest(req) {
		return common.validateRequest(req);
	}

	function isValidBike(bike) {
		try {
			bycicleModel.get().setup(bike);
		} catch (error) {
			return false;
		}
		return true;
	}

	return {
		validateRequest,
		isValidBike
	}
})();

module.exports = bycicleMiddleware;