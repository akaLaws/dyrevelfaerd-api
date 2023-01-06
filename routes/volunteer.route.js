var { createSingleVolunteer, getSingleVolunteer, getAllVolunteers, updateSingleVolunteer, deleteSingleVolunteer } = require("../controllers/volunteer.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/volunteers", isAuthorized, createSingleVolunteer);
	router.get("/api/v1/volunteers/:id", getSingleVolunteer);
	router.get("/api/v1/volunteers", getAllVolunteers);
	router.put("/api/v1/volunteers/:id", isAuthorized, updateSingleVolunteer);
	router.delete("/api/v1/volunteers/:id", isAuthorized, deleteSingleVolunteer);
};
