const dbConfig = require("../config/dbconfig.js");
const models = require("../models/Models.js");
const Sequelize = require("sequelize");

/**
 * Start connection with database
 */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
	logging: dbConfig.LOGGING,
	port: dbConfig.PORT,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};
db.connection = sequelize;

/**
 * Models
 */
db.bycicles = models.bycicle(sequelize);
db.stores = models.store(sequelize);
db.bookings = models.booking(sequelize);
db.availabilities = models.availability(sequelize);

/**
 * Relations
 */

// STORES //

/**
 * Store has many availabilities
 */
db.stores.hasMany(db.availabilities, {
	foreignKey: {
		name: "storeId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

// BYCICLES //

/**
 * Bycicle has one availability
 */
db.bycicles.hasOne(db.availabilities,
	{
		foreignKey: {
			name: "bycicleId",
			allowNull: false
		},
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		hooks: true
	});

// AVAILABILITIES //

/**
 * Availability belongs to one bycicle
 */
db.availabilities.belongsTo(db.bycicles, {
	foreignKey: {
		name: "bycicleId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

/**
 * Availability belongs to one store
 */
db.availabilities.belongsTo(db.stores, {
	foreignKey: {
		name: "storeId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

/**
 * Availability has one booking
 */
db.availabilities.hasOne(db.bookings, {
	foreignKey: {
		name: "bycicleId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

db.availabilities.hasOne(db.bookings, {
	foreignKey: {
		name: "storeId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

// BOOKINGS //
/**
 * Booking belong to one availability
 */
db.bookings.belongsTo(db.availabilities, {
	as: "bycicle",
	foreignKey: {
		name: "bycicleId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

db.bookings.belongsTo(db.availabilities, {
	as: "store",
	foreignKey: {
		name: "storeId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

/**
 * Exports db object with all models and relations
 */
module.exports = db;