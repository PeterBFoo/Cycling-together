const db = require("../db/connection.js");
const storeModel = require("../models/store/Store.js");
const Store = db.stores;


function findAll(req, res) {
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

function findOne(req, res) {
	const id = req.params.id;

	Store.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Store with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Store with id=" + id, err
			});
		});
}

function update(req, res) {
	const id = req.params.id;

	Store.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Store was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Store with id=${id}. Maybe Store was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Store with id=" + id, err
			});
		});
}

function create(req, res) {
	try {
		var store = storeModel.get().setup(req.body);
	} catch (error) {
		res.status(400).send({
			message: "Error creating Store", error
		});
	}

	Store.create(store)
		.then(data => {
			res.status(201).send(data);
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
				res.send({
					message: "Store was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Store with id=${id}. Maybe Store was not found!`
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
			res.send({ message: `${nums} Stores were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Stores."
			});
		});
}

var storeController = {
	findAll,
	findOne,
	update,
	create,
	deleteOne,
	deleteAll,
	findAssociatedBikes
};

module.exports = storeController;