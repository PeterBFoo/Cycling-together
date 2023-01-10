const bycicleModel = require("../models/bycicle/BycicleModel.js").get();
const common = require("./CommonMiddleware.js");

var bycicleMiddleware = (function () {
	function validateRequest(req) {
		return common.validateRequest(req);
	}

	function validateId(id) {
		return common.validateId(id);
	}

	function isValidBike(bike) {
		try {
			bycicleModel.setup(bike);
		} catch (error) {
			return false;
		}
		return true;
	}

	function propertyExists(property) {
		return Object.keys(bycicleModel.properties()).includes(property);
	}

	return {
		validateId,
		validateRequest,
		isValidBike,
		propertyExists
	};
})();

module.exports = bycicleMiddleware;