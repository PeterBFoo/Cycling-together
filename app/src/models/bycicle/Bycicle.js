function Bycicle() {
	let properties = Object.keys(this.properties());
	properties.forEach(property => {
		this[property] = null;
	});
}

/**
 * Defines properties of bycicle. Used to control which data is being created in each field
 * and to know which fields the database will be using.
 * 
 * Not implicitly public, but accessible via the prototype chain.
 */
Bycicle.prototype.properties = function (DataTypes = {
	STRING: "string",
	INTEGER: "number"
}) {
	var properties = {
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		frame: {
			type: DataTypes.STRING,
			allowNull: false
		},
		suspension: {
			type: DataTypes.STRING,
			allowNull: false
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
			allowNull: false
		},
		driveTrain: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		frontTravel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		seatPost: {
			type: DataTypes.STRING,
			allowNull: true
		},
		storeId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	};
	return properties;
};

/**
 * Sets the properties of the bycicle
 * 
 * @param Object 
 * @throws Error if a property is not allowed to be null and is null
 * @return void
 */
Bycicle.prototype.setup = function (args) {
	let properties = this.properties();
	Object.keys(properties).forEach((property) => {
		if (!properties[property].allowNull && args[property] == null) {
			throw new Error("BYCICLE: Property " + property + " cannot be null");
		} else if (typeof args[property] != properties[property].type) {
			if (typeof parseInt(args[property]) == properties[property].type) {
				this[property] = parseInt(args[property]);
			} else {
				throw new Error("BYCICLE: Property " + property + " must be of type " + properties[property].type);
			}
		} else {
			this[property] = args[property];
		}
	});
};

var bycicle = (function () {
	let instance = new Bycicle();
	return {
		get: function () {
			return instance;
		},
		setup: function () {
			return this.setup;
		}
	};
})();

module.exports = bycicle;