const modelError = require("../../errors/ModelErrors.js")("Availability");
const utils = require("../../utils").get();

function Availability() {
    let properties = Object.keys(this.properties());
    properties.forEach(property => {
        this[property] = null;
    });
}

function isValid(newAvailability, desiredProperties, propertiesDescriptions) {
    let properties = Object.keys(newAvailability);
    let matches = 0;
    let matchesWithNull = 0;

    desiredProperties.some(propertyName => {
        if (properties.includes(propertyName)) matches++;
        if (propertiesDescriptions[propertyName].allowNull && newAvailability[propertyName] == undefined) matchesWithNull++;
    });

    if (matches == desiredProperties.length || matchesWithNull + matches == desiredProperties.length) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if the value that must have that property has the desired type (see Availability.prototype.properties).
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
        if (desiredType == null && value == null) return true;
        else if (typeof value === desiredType && Boolean(value) || utils.validDate(value)) return true;
    }

    return false;
}

/**
 * Defines properties of a availability. Used to control which data is being created in each field
 * and to know which fields the database will be using.
 *
 * @param optional DataTypes object to define the types of the properties of the Availability (stands for Sequelize DataTypes)
 */
Availability.prototype.properties = function (DataTypes = {
    STRING: "string",
    INTEGER: "number",
    FLOAT: "number",
    BOOLEAN: "boolean",
    DATE: "string"
}) {
    var properties = {
        bycicleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    return properties;
};

/**
 * Sets the properties of availability
 * 
 * @param Object 
 * @throws ModelError if the property is not nullable and the value is null or if the property type is not the same as the value type
 * @return Availability
 */
Availability.prototype.setup = function (newAvailability) {
    let properties = this.properties();

    if (isValid(newAvailability, Object.keys(properties), properties)) {
        Object.keys(properties).forEach((property) => {
            if (matchesDesiredType(properties[property], newAvailability[property])) {
                if (newAvailability[property] == undefined) newAvailability[property] = null;
            } else {
                if (newAvailability[property] == null) {
                    return modelError.notNullable(property);
                }
                return modelError.propertyType(property, typeof property, properties[property].type);
            }
        });
    } else {
        return modelError.invalidProperties();
    }

    Object.setPrototypeOf(newAvailability, this);
    return newAvailability;
};

var availability = (function () {
    let instance = new Availability();
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

module.exports = availability;