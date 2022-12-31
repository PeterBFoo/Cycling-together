const modelError = require("../../errors/ModelErrors.js")("Store");

function Store() {
	let properties = Object.keys(this.properties());
	properties.forEach(property => {
		this[property] = null;
	});
}

/**
 * Defines properties of a store. Used to control which data is being created in each field
 * and to know which fields the database will be using.
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
 */
Store.prototype.setup = function (args) {
	let properties = this.properties();
	Object.keys(properties).forEach((property) => {
		if (typeof args[property] == properties[property].type || (properties[property].allowNull && args[property] == null)) {
			this[property] = args[property];
		} else if (typeof parseInt(args[property]) == properties[property].type) {
			this[property] = parseInt(args[property]);
		} else {
			if (args[property] == null) {
				modelError.notNullable(property);
			} else {
				modelError.propertyType(typeof property, properties[property].type);
			}
		}
	});

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