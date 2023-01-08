const Store = require("../db/connection.js").stores;

var controller = (function () {

	function findAllStores(req, res) {
		Store.findAll({ where: {} })
			.then(data => {
				res.status(200).send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while retrieving Stores."
				});
			});
	}

	function findAssociatedBikes(req, res) {
		const storeId = req.params.id;
		Store.findByPk(storeId, { include: ["bycicles"] })
			.then(data => {
				res.status(200).send(data);
			})
			.catch(err => {
				res.status(500).send({
					message: "Error retrieving Store with id=" + storeId, err
				});
			});
	}

	function findOneStore(req, res) {
		const id = req.params.id;

		Store.findByPk(id)
			.then(data => {
				if (data) {
					res.status(200).send(data);
				} else {
					res.status(404).send({
						message: `Cannot find Store with id=${id}. Store not found.`
					});
				}
			})
			.catch(err => {
				res.status(500).send({
					message: "Error retrieving Store with id=" + id, err
				});
			});
	}

	function updateStore(req, res) {
		const id = req.params.id;

		Store.update(req.body, {
			where: { id: id }
		})
			.then(num => {
				if (num == 1) {
					res.status(200).send({
						message: "Store was updated successfully."
					});
				} else {
					res.status(404).send({
						message: `Cannot update Store with id=${id}. Store not found.`
					});
				}
			})
			.catch(err => {
				res.status(500).send({
					message: "Error updating Store with id=" + id, err
				});
			});
	}

	function registerStore(req, res) {
		Store.create(req.body)
			.then(data => {
				res.status(201).send({
					message: "Store was registered successfully.",
					data: data
				});
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the Store."
				});
			});
	}

	function deleteOne(req, res) {
		const id = req.params.id;

		Store.destroy({
			where: { id: id }
		})
			.then(num => {
				if (num == 1) {
					res.status(204).send({
						message: "Store was deleted successfully!"
					});
				} else {
					res.status(404).send({
						message: `Cannot delete Store with id=${id}. Store not found. `
					});
				}
			})
			.catch(err => {
				res.status(500).send({
					message: "Could not delete Store with id=" + id, err
				});
			});
	}

	function deleteAll(req, res) {
		Store.destroy({
			where: {},
			truncate: false
		})
			.then(nums => {
				if (nums == 0) {
					res.status(304).send({
						message: "Cannot delete stores because there are no stores in the database."
					});
				} else {
					res.status(204).send({ message: `${nums} Stores were deleted successfully!` });
				}
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while removing all Stores."
				});
			});
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