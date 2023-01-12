const service = require("../services/BycicleService.js");

var controller = (function () {
	// Create and Save a new Bycicle
	async function registerBycicle(req, res) {
		// Save Bycicle in the database
		let request = await service.create(req.body);

		if (request) {
			res.status(201).send(request);
		} else {
			res.status(500).send(request);
		}
	}

	async function filterBy(req, res) {
		let data = await service.filterBy(req.params.property, req.params.value);

		if (data.length > 0) {
			res.status(200).send(data);
		} else {
			res.status(204).send(data);
		}
	}

	async function findAllBycicles(req, res) {
		let data = await service.findAll();

		if (data.length > 0) {
			res.status(200).send(data);
		} else {
			res.status(204).send(data);
		}
	}

	// Find a single Bycicle with an id
	async function findOneBycicle(req, res) {
		let data = await service.findOne(req.params.id);

		if (data) {
			res.status(200).send(data);
		} else {
			res.status(404).send(data);
		}
	}

	// Update a Bycicle by the id in the request
	async function updateBycicle(req, res) {
		let data = await service.update(req.params.id, req.body);

		if (data == 1) {
			res.status(200).send({
				message: "Bycicle was updated successfully."
			});
		} else {
			res.status(404).send({
				message: `Cannot find Bycicle with id=${req.params.id}.`
			});
		}
	}

	// Delete a Bycicle with the specified id in the request
	async function deleteBycicle(req, res) {
		let request = await service.deleteOne(req.params.id);

		if (request == 1) {
			res.status(200).send({
				message: "Bycicle was deleted successfully!"
			});
		} else {
			res.status(404).send({
				message: `Cannot find Bycicle with id=${req.params.id}.`
			});
		}
	}

	// Delete all Bycicles from the database.
	async function deleteAllBycicles(req, res) {
		let request = await service.deleteAll();

		if (request > 0) {
			res.status(200).send({
				message: request + " Bycicles were deleted successfully!"
			});
		} else {
			res.status(404).send({
				message: "No Bycicles were deleted."
			});
		}

	}

	return {
		registerBycicle,
		filterBy,
		findAllBycicles,
		findOneBycicle,
		updateBycicle,
		deleteBycicle,
		deleteAllBycicles
	};
})();

module.exports = controller;