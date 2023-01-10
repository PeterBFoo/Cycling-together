
var commonMiddleware = (function () {
    function validateRequest(req) {
        if (!req.body) {
            return false;
        }
        return true;
    }

    function validateId(id) {
        return !isNaN(id);
    }

    return {
        validateRequest,
        validateId
    };
})();

module.exports = commonMiddleware;