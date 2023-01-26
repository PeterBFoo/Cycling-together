const common = require("./CommonMiddleware");

var availabilityMiddleware = (function () {
    function isValidId(id) {
        return common.validateId(id);
    }

    function isValidRequest(req) {
        return common.validateRequest(req);
    }

    function isValidStock(stock) {
        return !isNaN(stock);
    }

    return {
        isValidId,
        isValidStock,
        isValidRequest
    };
})();

module.exports = availabilityMiddleware;