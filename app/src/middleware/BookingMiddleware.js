const common = require("./CommonMiddleware");

var bookingMiddleware = (function () {
    function validateId(id) {
        return id.length == 8;
    }

    function validateRequest(req) {
        return common.validateRequest(req);
    }

    return {
        validateId,
        validateRequest
    };
})();

module.exports = bookingMiddleware;