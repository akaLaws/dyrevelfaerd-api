var { Animal, Asset } = require("../models/models");
var saveFile = require("../services/asset");

async function getSingleAnimal(req, res, next) {
	try {
		let animal = await Animal.findByPk(parseInt(req.params.id), { include: [ Asset ] });
		res.json(animal);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllAnimals(req, res, next) {
	try {
		let animals = await Animal.findAll({ include: [ Asset ] });
		res.json(animals);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleAnimal(req, res, next) {
	try {

		// Added asset creation on the try to circumvent bad UX on the frontend by having seperate file upload and data cross refferencing
		const file = req.files.file
		let asset
		if (file) {
			let file = saveFile(req.files.file);
			asset = await Asset.create({
				url: "http://localhost:4000/file-bucket/" + file
			});
		}

		let animal = await Animal.create({
			name: req.fields.name,
			description: req.fields.description,
			age: req.fields.age,
			assetId: file ? asset.dataValues.id : req.fields.assetId
		});
		res.json(animal);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleAnimal(req, res, next) {
	try {
		const file = req.files.file
		let asset
		if (file) {
			let file = saveFile(req.files.file);
			asset = await Asset.create({
				url: "http://localhost:4000/file-bucket/" + file
			});
		}
		let animal = await Animal.findByPk(parseInt(req.params.id), { include: [ Asset ] });
		
		if (animal) {
			animal.name = req.fields.name;
			animal.description = req.fields.description;
			animal.assetId = parseInt(req.fields.assetId);
			animal.save();
			res.json(animal);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleAnimal(req, res, next) {
	// NOTE: Is relevant Id's for assets deleted as well? 
	try {
		await Animal.destroy({
			where: {
				id: parseInt(req.params.id)
			}
		});
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleAnimal,
	getSingleAnimal,
	getAllAnimals,
	updateSingleAnimal,
	deleteSingleAnimal
};

