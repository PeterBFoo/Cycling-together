var express = require("express");
var router = express.Router();

const endpoints = {
	bycicle: [
		"bycicles/ GET -> Get all the bycicles in the DB",
		"bycicles/get/:id GET -> Find an specific bycicle",
		"bycicles/register POST-> Register a new bycicle in the DB",
		"bycicles/update/:id PUT -> Update an specific bycicle",
		"bycicles/delete/one/:id DELETE -> Delete an specific bycicle",
		"bycicles/delete/all DELETE -> Delete all bycicles in the DB"
	],
	store: [
		"stores/ GET -> Get all the stores from the DB",
		"stores/get/:id GET -> Find an specific store",
		"stores/register POST-> Register a new store in the DB",
		"stores/update/:id PUT -> Update an specific store",
		"stores/delete/one/:id DELETE -> Delete an specific store",
		"stores/delete/all DELETE -> Delete all stores from the DB",
		"stores/:storeId/bycicles GET -> Get all the bycicles that are asociated with the store id"
	]
};

const bycicleEndpoints = endpoints.bycicle;
const storeEndpoints = endpoints.store;

function prepareMessage(fn) {
	let welcomeMessage = "<h2>Welcome! Here are some endpoints for you to check out:</h2><br><ul><p>BYCICLE</p>";
	welcomeMessage = fn(bycicleEndpoints, welcomeMessage) + "<p>STORE</p>";
	welcomeMessage = fn(storeEndpoints, welcomeMessage) + "</ul>";
	return welcomeMessage;
}

function addEndpointsToMessage(arr, mes) {
	arr.forEach(endpoint => {
		mes = mes + "<li>" + endpoint + "</li>";
	});
	return mes;
}

/* GET home page. */
router.get("/", function (req, res) {
	let welcomeMessage = prepareMessage(addEndpointsToMessage);
	return res.send(welcomeMessage).status(200);
});

module.exports = router;
