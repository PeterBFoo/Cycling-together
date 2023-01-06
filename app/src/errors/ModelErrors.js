function ModelError(model) {
	this.model = model.toUpperCase();
}

ModelError.prototype.propertyType = function (propertyName, wrongType, desiredType) {
	throw this.model + ": " + propertyName + ": " + wrongType + " must be of type " + desiredType;
};

ModelError.prototype.notNullable = function (property) {
	throw this.model + ": " + property + " cannot be null";
};

ModelError.prototype.invalidProperties = function () {
	throw this.model + ": Invalid properties";
};

var modelError = function (model) {
	let error = new ModelError(model);
	return {
		propertyType: function (propertyName, wrongType, desiredType) {
			return error.propertyType(propertyName, wrongType, desiredType);
		},
		notNullable: function (property) {
			return error.notNullable(property).call(error);
		},
		invalidProperties: function () {
			return error.invalidProperties();
		}
	};
};

module.exports = modelError;