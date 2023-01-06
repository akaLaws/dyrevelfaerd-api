var { User, Class } = require("../models/models");
var { hashSync } = require("bcryptjs");

async function getSingleUser(req, res, next) {
	try {
		let user = await User.findByPk(parseInt(req.params.id));
		if (user) {
			res.json(user);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function createSingleUser(req, res, next) {
	try {
		let user = await User.create({
			username: req.fields.username,
			password: hashSync(req.fields.password, 15)
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleUser,
	getSingleUser
};
