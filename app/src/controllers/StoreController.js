const service = require("../services/StoreService.js");

var controller = (function () {

	async function findAllStores(req, res) {
		let data = await service.findAll();

		if (data.length > 0) {
			res.status(200).send(data);
		}
		else {
			res.status(204).send(data);
		}
	}

	async function findAssociatedBikes(req, res) {
		let data = await service.findAssociatedBikes(req.params.id);

		if (data.bycicles.length > 0) {
			res.status(200).send(data);
		} else {
			res.status(204).send(data);
		}
	}

	async function findOneStore(req, res) {
		let data = await service.findOne(req.params.id);

		if (data) {
			res.status(200).send(data);
		} else {
			res.status(404).send(data);
		}

	}

	async function updateStore(req, res) {
		let data = await service.update(req.params.id, req.body);

		if (data == 1) {
			res.status(200).send({
				message: "Store was updated successfully."
			});
		} else {
			res.status(404).send({
				message: `Cannot find Store with id=${req.params.id}.`
			});
		}
	}

	async function registerStore(req, res) {
		let request = await service.create(req.body);

		if (request) {
			res.status(201).send(request);
		} else {
			res.status(500).send(request);
		}
	}

	async function deleteOne(req, res) {
		let request = await service.deleteOne(req.params.id);

		if (request == 1) {
			res.status(200).send({
				message: "Store was deleted successfully."
			});
		} else {
			res.status(404).send({
				message: `Cannot find Store with id=${req.params.id}.`
			});
		}
	}

	async function deleteAll(req, res) {
		let request = await service.deleteAll();

		if (request > 0) {
			res.status(200).send({
				message: request + "All Stores were deleted successfully."
			});
		} else {
			res.status(404).send({
				message: "No stores were found to delete."
			});
		}
	}

	return {
		findAllStores,
		findOneStore,
		updateStore,
		registerStore,
		deleteOne,
		deleteAll,
		findAssociatedBikes
	};
})();

module.exports = controller;