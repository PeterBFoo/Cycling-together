const Bycicle = require("../db/connection.js").bycicles;


// Create and Save a new Bycicle
function registerBycicle(req, res) {
	// Save Bycicle in the database
	Bycicle.create(req.body)
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
				message: `Error retrieving Bycicle with id=${id}. ${err}`
			});
		});
}

// Update a Bycicle by the id in the request
function updateBycicle(req, res) {
	let id = req.params.id;

	Bycicle.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.status(200).send({
					message: "Bycicle was updated successfully."
				});
			} else {
				res.status(404).send({
					message: `Cannot update Bycicle with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error updating Bycicle with id=${id}. ${err}`
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
				res.status(204).send({
					message: "Bycicle was deleted successfully!"
				});
			} else {
				res.status(404).send({
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