var { Adoptsection, Asset } = require("../models/models");
var saveFile = require("../services/asset");

async function getSingleAdoptSection(req, res, next) {
	try {
		let adoptsection = await Adoptsection.findByPk(parseInt(req.params.id), { include: [ Asset ] });
		res.json(adoptsection);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllAdoptSections(req, res, next) {
	try {
		let adoptsections = await Adoptsection.findAll({ include: [ Asset ] });
		res.json(adoptsections);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleAdoptSection(req, res, next) {
	
	try {
		const file = req.files.file
		let asset
		if (file) {
			let file = saveFile(req.files.file);
			asset = await Asset.create({
				url: "http://localhost:4000/file-bucket/" + file
			});
		}

		let adoptsection = await Adoptsection.create({
			title: req.fields.title,
			content: req.fields.content,
			assetId: file ? asset.dataValues.id : req.fields.assetId
		});
		res.json(adoptsection);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleAdoptSection(req, res, next) {
	try {
		const file = req.files.file
		let asset
		if (file) {
			let file = saveFile(req.files.file);
			asset = await Asset.create({
				url: "http://localhost:4000/file-bucket/" + file
			});
		}
		
		let adoptsection = await Adoptsection.findByPk(parseInt(req.params.id), { include: [ Asset ] });


		if (adoptsection) {
			adoptsection.title = req.fields.title;
			adoptsection.content = req.fields.content;
			adoptsection.assetId = parseInt(req.fields.assetId);
			adoptsection.save();
			res.json(adoptsection);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleAdoptSection(req, res, next) {
	try {
		// NOTE: Is relevant Id's for assets deleted as well? 
		await Adoptsection.destroy({
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
	createSingleAdoptSection,
	getSingleAdoptSection,
	getAllAdoptSections,
	updateSingleAdoptSection,
	deleteSingleAdoptSection
};
