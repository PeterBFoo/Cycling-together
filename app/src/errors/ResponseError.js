function ResponseError() {
    this.errorType = "ResponseError";
    this.message = "";
}

ResponseError.prototype.invalidId = function () {
    this.message = "Invalid ID, ID has to be a number";
    return this;
};

ResponseError.prototype.invalidIdLength = function (length) {
    this.message = "Invalid ID, ID must have " + length + " characters length";
};

ResponseError.prototype.invalidType = function (property, desiredType) {
    this.message = "Invalid " + property + ", " + property + " has to be a " + desiredType;
    return this;
};

ResponseError.prototype.emptyBody = function () {
    this.message = "Body cannot be empty";
    return this;
};

ResponseError.prototype.notFound = function (entity) {
    this.message = entity + " not found";
    return this;
};

ResponseError.prototype.unknownError = function (error) {
    this.message = error;
    return this;
};

ResponseError.prototype.noAvailabilityForBycicle = function () {
    this.message = "There is no availability for this bycicle";
    return this;
};

ResponseError.prototype.dateError = function () {
    this.message = "Start date or end date cannot be less than the actual time and start date cannot be greater than end date";
    return this;
};

ResponseError.prototype.alreadyCanceled = function () {
    this.message = "Booking is already canceled";
    return this;
}

var responseError = (function () {

    let error = new ResponseError();

    return {
        get: function () {
            return error;
        },
        invalidId: function () {
            return error.invalidId();
        },
        invalidType: function (property, desiredType) {
            return error.invalidType(property, desiredType);
        },
        emptyBody: function () {
            return error.emptyBody();
        },
        notFound: function (entity) {
            return error.notFound(entity);
        },
        unknownError: function (err) {
            return error.unknownError(err);
        },
        invalidIdLength: function (length) {
            return error.invalidIdLength(length);
        },
        noAvailabilityForBycicle: function () {
            return error.noAvailabilityForBycicle();
        },
        dateError: function () {
            return error.dateError();
        },
        alreadyCanceled: function () {
            return error.alreadyCanceled();
        }
    };
})();

module.exports = responseError;