const modelError = require("../../errors/ModelErrors.js")("Store");

function Store() {
	let properties = Object.keys(this.properties());
	properties.forEach(property => {
		this[property] = null;
	});
}

/**
 * Check if the newStore object has the same property names as the Store
 * 
 * @param {Object} newStore 
 * @param {String[]} desiredProperties
 * @returns boolean
 */
function isValid(newStore, desiredProperties) {
	let properties = Object.keys(newStore);
	let matches = 0;
	desiredProperties.some(propertyName => {
		if (properties.includes(propertyName)) matches++;
	});

	if (matches == desiredProperties.length) {
		return true;
	} else {
		return false;
	}
}

/**
 * Checks if the value that must have that property has the desired type (see Store.prototype.properties).
 * 
 * @param {Object} property 
 * @param value 
 * @returns boolean
 */
function matchesDesiredType(property, value) {
	let desiredTypes = [property.type];
	property.allowNull ? desiredTypes.push(null) : null;

	for (let i = 0; i < desiredTypes.length; i++) {
		let desiredType = desiredTypes[i];
		if (typeof value == desiredType || value == desiredType) {
			return true;
		}
	}

	return false;
}

function canBeConvertedToNumber(desiredType, value) {
	return typeof parseInt(value) == desiredType;
}

/**
 * Defines properties of a store. Used to control which data is being created in each field
 * and to know which fields the database will be using.
 * 
 * @param optional DataTypes object to define the types of the properties of the Store (stands for Sequelize DataTypes)
 */
Store.prototype.properties = function (DataTypes = {
	STRING: "string",
	INTEGER: "number",
}) {
	var properties = {
		storeName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		website: {
			type: DataTypes.STRING,
			allowNull: true
		},
	};
	return properties;
};

/**
 * Sets the properties of the store
 * 
 * @param Object 
 * @throws ModelError if the property is not nullable and the value is null or if the property type is not the same as the value type
 * @return Store
 */
Store.prototype.setup = function (newStore) {
	let properties = this.properties();

	if (isValid(newStore, Object.keys(properties))) {
		Object.keys(properties).forEach((property) => {
			if (matchesDesiredType(properties[property], newStore[property])) {
				this[property] = newStore[property];
			} else if (canBeConvertedToNumber(properties[property].type, newStore[property])) {
				this[property] = parseInt(newStore[property]);
			} else {
				if (newStore[property] == null) {
					return modelError.notNullable(property);
				} else {
					return modelError.propertyType(typeof property, properties[property].type);
				}
			}
		});
	} else {
		return modelError.invalidProperties();
	}

	return this;
};

var store = (function () {
	let instance = new Store();
	return {
		get: function () {
			return instance;
		},
		setup: function () {
			return this.setup;
		},
		properties: function () {
			return this.properties;
		}
	};
})();

module.exports = store;