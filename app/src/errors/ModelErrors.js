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

ModelError.prototype.invalidProperty = function (property) {
	throw this.model + ": This property can't be manually set! -> " + property;
};

var modelError = function (model) {
	let error = new ModelError(model);
	return {
		propertyType: function (propertyName, wrongType, desiredType) {
			return error.propertyType(propertyName, wrongType, desiredType);
		},
		notNullable: function (property) {
			return error.notNullable(property);
		},
		invalidProperty: function (property) {
			return error.invalidProperty(property);
		},
		invalidProperties: function () {
			return error.invalidProperties();
		}
	};
};

module.exports = modelError;