function ModelError(model) {
    this.model = model;
}

ModelError.prototype.propertyType = function (wrongType, desiredType) {
    throw this.model.toUpperCase() + ": " + wrongType + " must be of type " + desiredType;
}

ModelError.prototype.notNullable = function (property) {
    throw this.model.toUpperCase() + ": " + property + " cannot be null";
}

var modelError = function (model) {
    let error = new ModelError(model);
    return {
        propertyType: function (wrongType, desiredType) {
            return error.propertyType(wrongType, desiredType);
        },
        notNullable: function (property) {
            return error.notNullable(property).call(error);
        }
    }
};

module.exports = modelError;