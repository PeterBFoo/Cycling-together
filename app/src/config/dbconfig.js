const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	HOST: process.env.HOST,
	PORT: process.env.PORT,
	USER: process.env.DBUSER,
	PASSWORD: process.env.PASSWORD,
	DB: process.env.DB,
	DIALECT: process.env.DIALECT,
	LOGGING: (process.env.LOGGING === "true"),
	pool: {
		max: process.env.POOL_MAX || 5,
		min: process.env.POOL_MIN || 0,
		acquire: process.env.POOL_ACQUIRE || 30000,
		idle: process.env.POOL_IDLE || 10000
	}
};