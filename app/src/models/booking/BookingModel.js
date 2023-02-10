const modelError = require("../../errors/ModelErrors.js")("Booking");
const utils = require("../../utils").get();

function Booking() {
    let properties = Object.keys(this.properties());
    properties.forEach(property => {
        this[property] = null;
    });
}

function isValid(newBooking, desiredProperties, propertiesDescriptions) {
    let properties = Object.keys(newBooking);
    let matches = 0;
    let matchesWithNull = 0;

    desiredProperties.some(propertyName => {
        if (properties.includes(propertyName) && (newBooking[propertyName] != null || newBooking[propertyName] != undefined)) matches++;
        if (propertiesDescriptions[propertyName].allowNull && (newBooking[propertyName] == undefined || newBooking[propertyName] == null)) matchesWithNull++;
    });

    if (matches == desiredProperties.length || matchesWithNull + matches == desiredProperties.length) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if the value that must have that property has the desired type (see Booking.prototype.properties).
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
        else if (typeof value == desiredType || utils.validDate(value)) return true;
    }

    return false;
}

/**
 * Defines properties of a booking. Used to control which data is being created in each field
 * and to know which fields the database will be using.
 *
 * @param optional DataTypes object to define the types of the properties of the Booking (stands for Sequelize DataTypes)
 */
Booking.prototype.properties = function (DataTypes = {
    STRING: "string",
    INTEGER: "number",
    FLOAT: "number",
    BOOLEAN: "boolean",
    DATE: "string"
}) {
    var properties = {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bycicleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        canceled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    };
    return properties;
};

Booking.prototype.generatePublicId = function () {
    const crypto = require("crypto");
    return crypto.randomBytes(4).toString("hex").toUpperCase();
};

/**
 * Sets the properties of a booking
 * 
 * @param Object 
 * @throws ModelError if the property is not nullable and the value is null or if the property type is not the same as the value type
 * @return Booking
 */
Booking.prototype.setup = function (newBooking) {
    let properties = this.properties();

    if (newBooking.publicId == undefined) newBooking.publicId = this.generatePublicId();
    if (newBooking.canceled == undefined) newBooking.canceled = false;

    if (this.activateBookings([newBooking]).length > 0) {
        newBooking.isActive = true;
    } else {
        newBooking.isActive = false;
    }

    if (isValid(newBooking, Object.keys(properties), properties)) {
        Object.keys(properties).forEach((property) => {
            if (matchesDesiredType(properties[property], newBooking[property])) {
                if (newBooking[property] == undefined) newBooking[property] = null;
                else if (utils.validDate(newBooking[property])) newBooking[property] = utils.createDate(newBooking[property], newBooking[property + "Hour"]);
            } else {
                if (newBooking[property] == null) {
                    return modelError.notNullable(property);
                }
                return modelError.propertyType(property, typeof newBooking[property], properties[property].type);
            }
        });
    } else {
        return modelError.invalidProperties();
    }

    Object.setPrototypeOf(newBooking, this);

    return newBooking;
};

/**
 * 
 * @param {Array[Booking]} bookings 
 * @returns {Array}
 */
Booking.prototype.activateBookings = function (bookings) {
    let now = new Date().getTime();
    let activeBookings = [];

    bookings.forEach((booking) => {
        let startDate = new Date(booking.startDate).getTime();
        let endDate = new Date(booking.endDate).getTime();

        if (now > startDate && now < endDate && !booking.isActive) {
            booking.isActive = true;
            activeBookings.push(booking);
        }
    });

    return activeBookings;
};

/**
 * 
 * @param {Object} bookings 
 * @returns 
 */
Booking.prototype.deactivateBookings = function (bookings) {

    let now = new Date().getTime();
    let deactiveBookings = [];

    bookings.forEach((booking) => {
        let startDate = new Date(booking.startDate).getTime();
        let endDate = new Date(booking.endDate).getTime();

        if ((now < startDate || now > endDate) && booking.isActive) {
            let bookingToDeactivate = Object.create(booking);
            Object.getOwnPropertyNames(booking).forEach((property) => {
                bookingToDeactivate[property] = booking[property];
            });
            bookingToDeactivate.isActive = false;
            deactiveBookings.push(bookingToDeactivate);
        }
    });

    return deactiveBookings;
};

var booking = (function () {
    let instance = new Booking();
    return {
        get: function () {
            return instance;
        },
        setup: function () {
            return this.setup;
        },
        properties: function () {
            return this.properties;
        },
        activateBookings: function () {
            return this.activateBookings;
        },
        deactivateBookings: function () {
            return this.deactivateBookings;
        }
    };
})();

module.exports = booking;