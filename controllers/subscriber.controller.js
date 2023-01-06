var { Subscriber } = require("../models/models");

async function getAllSubscribers(req, res, next) {
	try {
		let subscribers = await Subscriber.findAll();
		res.json(subscribers);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleSubscriber(req, res, next) {
	try {
		let subscriber = await Subscriber.create({
			name: req.fields.name,
			email: req.fields.email
		});
		res.json(subscriber);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleSubscriber(req, res, next) {
	try {
		await Subscriber.destroy({
			where: {
				email: req.params.email
			}
		});
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleSubscriber,
	getAllSubscribers,
	deleteSingleSubscriber
};
