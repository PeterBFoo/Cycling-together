const storeModel = require("../models/store/Store.js");
const common = require("./CommonMiddleware.js");

var storeMiddleware = (function () {
	function validateRequest(req) {
		return common.validateRequest(req);
	}

	function isValidStore(store) {
		try {
			storeModel.get().setup(store);
		} catch (error) {
			return false;
		}
		return true;
	}

	return {
		validateRequest,
		isValidStore
	}
})()

module.exports = storeMiddleware;