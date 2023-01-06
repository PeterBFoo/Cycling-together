const dbConfig = require("../config/dbconfig.js");
const models = require("../models/Models.js");

/**
 * Start connection with database
 */
const Sequelize = require("sequelize");
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

db.Sequelize = Sequelize;
db.connection = sequelize;

/**
 * Models
 */
db.bycicles = models.bycicle(sequelize);
db.stores = models.store(sequelize);

/**
 * Relations
 */
db.stores.hasMany(db.bycicles, {
	foreignKey: {
		name: "storeId",
		allowNull: false
	},
	onDelete: "CASCADE",
	onUpdate: "CASCADE"
});

db.bycicles.belongsTo(db.stores, {
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