var { About } = require("../models/models");

async function getSingleAbout(req, res, next) {
	try {
		let about = await About.findByPk(parseInt(req.params.id));
		res.json(about);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllAbouts(req, res, next) {
	try {
		let about = await About.findAll();
		res.json(about);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleAbout(req, res, next) {
	try {
		let about = await About.create({
			title: req.fields.title,
			content: req.fields.content
		});
		res.json(about);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleAbout(req, res, next) {
	try {
		let about = await About.findByPk(parseInt(req.params.id));

		if(about) {
			about.title = req.fields.title;
			about.content = req.fields.content;
			about.save();
			res.json(about);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleAbout(req, res, next) {
	try {
		await About.destroy({
			where: {
				id: parseInt(req.params.id)
			}
		})
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleAbout,
	getSingleAbout,
	getAllAbouts,
	updateSingleAbout,
	deleteSingleAbout
};
