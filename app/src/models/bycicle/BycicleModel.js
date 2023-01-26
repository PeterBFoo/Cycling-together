const modelError = require("../../errors/ModelErrors.js")("Bycicle");

function Bycicle() {
	let properties = Object.keys(this.properties());
	properties.forEach(property => {
		this[property] = null;
	});
}

/**
 * Check if the newBike object has the same property names as the Bycicle
 * 
 * @param {Object} newBike 
 * @param {String[]} desiredProperties
 * @returns boolean
 */
function isValid(newBike, desiredProperties, propertiesDescriptions) {
	let properties = Object.keys(newBike);
	let matches = 0;
	let matchesWithNull = 0;

	desiredProperties.some(propertyName => {
		if (properties.includes(propertyName)) matches++;
		if (propertiesDescriptions[propertyName].allowNull && newBike[propertyName] == undefined) matchesWithNull++;
	});

	if (matches == desiredProperties.length || matchesWithNull + matches == desiredProperties.length) {
		return true;
	} else {
		return false;
	}
}

/**
 * Checks if the value that must have that property has the desired type (see Bycicle.prototype.properties).
 * 
 * @param {Object} property 
 * @param value 
 * @returns boolean
 */
function matchesDesiredType(property, value) {
	let desiredTypes = [property.type];
	property.allowNull ? desiredTypes.push(null, undefined) : null;

	for (let i = 0; i < desiredTypes.length; i++) {
		let desiredType = desiredTypes[i];
		if (typeof value == desiredType || value == desiredType) {
			return true;
		}
	}

	return false;
}

/**
 * Defines properties of bycicle. Used to control which data is being created in each field
 * and to know which fields the database will be using.
 *
 * @param optional DataTypes object to define the types of the properties of the Bycicle (stands for Sequelize DataTypes)
 */
Bycicle.prototype.properties = function (DataTypes = {
	STRING: "string",
	INTEGER: "number",
	FLOAT: "number",
	BOOLEAN: "boolean"
}) {
	var properties = {
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		brand: {
			type: DataTypes.STRING,
			allowNull: false
		},
		weight: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		frame: {
			type: DataTypes.STRING,
			allowNull: false
		},
		suspension: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fork: {
			type: DataTypes.STRING,
			allowNull: false
		},
		wheels: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wheelSize: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		brakes: {
			type: DataTypes.STRING,
			allowNull: false
		},
		groupSet: {
			type: DataTypes.STRING,
			allowNull: true
		},
		driveTrain: {
			type: DataTypes.STRING,
			allowNull: false
		},
		frontTravel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		seatpost: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	};
	return properties;
};

/**
 * Sets the properties of the bycicle
 * 
 * @param Object 
 * @throws ModelError if the property is not nullable and the value is null or if the property type is not the same as the value type
 * @return Bycicle
 */
Bycicle.prototype.setup = function (newBike) {
	let properties = this.properties();

	if (isValid(newBike, Object.keys(properties), properties)) {
		Object.keys(properties).forEach((property) => {
			if (matchesDesiredType(properties[property], newBike[property])) {
				if (newBike[property] == undefined) newBike[property] = null;
			} else {
				if (newBike[property] == null) {
					return modelError.notNullable(property);
				}
				return modelError.propertyType(property, typeof property, properties[property].type);
			}
		});
	} else {
		return modelError.invalidProperties();
	}

	Object.setPrototypeOf(newBike, this);
	return newBike;
};

var bycicle = (function () {
	let instance = new Bycicle();
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

module.exports = bycicle;