const storeModel = require("../models/store/StoreModel.js");
const common = require("./CommonMiddleware.js");

var storeMiddleware = (function () {
	function validateRequest(req) {
		return common.validateRequest(req);
	}

	function validateId(id) {
		return common.validateId(id);
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
		validateId,
		validateRequest,
		isValidStore
	};
})();

module.exports = storeMiddleware;