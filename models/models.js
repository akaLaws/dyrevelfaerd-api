var { DataTypes, Model } = require("sequelize");
var { sequelize } = require("../config/database");

class About extends Model {};
class Volunteer extends Model {};
class Animal extends Model {};
class Asset extends Model {};
class Subscriber extends Model {};
class Adoptsection extends Model {};
class User extends Model {};

User.init({
	username: DataTypes.TEXT,
	password: DataTypes.TEXT
}, { sequelize, modelName: "user" });

About.init({
	title: DataTypes.TEXT,
	content: DataTypes.TEXT
}, { sequelize, modelName: "about" });

Volunteer.init({
	title: DataTypes.TEXT,
	content: DataTypes.TEXT,
	extra: DataTypes.TEXT
}, { sequelize, modelName: "volunteer" });

Animal.init({
	name: DataTypes.TEXT,
	description: DataTypes.TEXT,
	age: DataTypes.INTEGER
}, { sequelize, modelName: "animal" });

Asset.init({
	url: DataTypes.TEXT
}, { sequelize, modelName: "asset" });

Subscriber.init({
	name: DataTypes.TEXT,
	email: { type: DataTypes.TEXT, unique: true }
}, { sequelize, modelName: "subscriber" });

Adoptsection.init({
	title: DataTypes.TEXT,
	content: DataTypes.TEXT
}, { sequelize, modelName: "adoptsection" });

Animal.belongsTo(Asset, { foreignKey: "assetId" });
Asset.hasOne(Animal, { foreignKey: "assetId" });

Volunteer.belongsTo(Asset, { foreignKey: "assetId" });
Asset.hasOne(Volunteer, { foreignKey: "assetId" });

Adoptsection.belongsTo(Asset, { foreignKey: "assetId" });
Asset.hasOne(Adoptsection, { foreignKey: "assetId" });

sequelize.sync({ force: false })
	.then(function() {
		console.log("Tabels created");
	})
	.catch(function(error) {
		console.error(error);
	});

module.exports = {
	User,
	About,
	Volunteer,
	Animal,
	Asset,
	Subscriber,
	Adoptsection
};
