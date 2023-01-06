const db = require("../db/connection.js");
const bycicleModel = require("../models/bycicle/Bycicle.js");
const Bycicle = db.bycicles;


// Create and Save a new Bycicle
function registerBycicle(req, res) {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Bycicle
	try {
		var bycicle = bycicleModel.get().setup(req.body);
	} catch (error) {
		res.status(400).send({
			message: error.message
		});
		return;
	}

	// Save Bycicle in the database
	Bycicle.create(bycicle)
		.then(data => {
			res.status(201).send({
				message: "Bycicle was registered successfully.",
				data: data
			});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Bycicle."
			});
		});
}

function findAllBycicles(req, res) {
	Bycicle.findAll({ where: {} })
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Bycicles."
			});
		});
}

// Find a single Bycicle with an id
function findOneBycicle(req, res) {
	let id = req.params.id;

	Bycicle.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Bycicle with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Bycicle with id=" + id, err
			});
		});
}

// Update a Bycicle by the id in the request
function updateBycicle(req, res) {
	let id = req.params.id;

	try {
		var bycicle = bycicleModel.get().setup(req.body);
	} catch (error) {
		res.status(400).send({
			message: error.message
		});
		return;
	}

	Bycicle.update(bycicle, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Bycicle was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Bycicle with id=${id}. Maybe the bycicle was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating bycicle with id=" + id + err
			});
		});
}

// Delete a Bycicle with the specified id in the request
function deleteBycicle(req, res) {
	let id = req.params.id;

	Bycicle.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Bycicle was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Bycicle with id=${id}. Maybe Bycicle was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Bycicle with id=" + id, err
			});
		});
}

// Delete all Bycicles from the database.
function deleteAllBycicles(req, res) {
	Bycicle.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Bycicles were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Bycicles."
			});
		});
}

var bycicleController = {
	registerBycicle,
	findAllBycicles,
	findOneBycicle,
	updateBycicle,
	deleteBycicle,
	deleteAllBycicles
};

module.exports = bycicleController;