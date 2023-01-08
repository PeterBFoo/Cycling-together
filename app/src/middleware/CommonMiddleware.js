
var commonMiddleware = (function () {
    function validateRequest(req) {
        if (!req.body) {
            return false;
        }
        return true;
    }

    return {
        validateRequest
    };
})();

module.exports = commonMiddleware;