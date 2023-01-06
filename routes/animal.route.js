var { createSingleAnimal, getSingleAnimal, getAllAnimals, updateSingleAnimal, deleteSingleAnimal } = require("../controllers/animal.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/animals", isAuthorized, createSingleAnimal);
	router.get("/api/v1/animals/:id", getSingleAnimal);
	router.get("/api/v1/animals", getAllAnimals);
	router.put("/api/v1/animals/:id", isAuthorized, updateSingleAnimal);
	router.delete("/api/v1/animals/:id", isAuthorized, deleteSingleAnimal);
};
