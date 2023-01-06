var { createSingleAbout, getSingleAbout, getAllAbouts, updateSingleAbout, deleteSingleAbout } = require("../controllers/about.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/abouts", isAuthorized, createSingleAbout);
	router.get("/api/v1/abouts/:id", getSingleAbout);
	router.get("/api/v1/abouts", getAllAbouts);
	router.put("/api/v1/abouts/:id", isAuthorized, updateSingleAbout);
	router.delete("/api/v1/abouts/:id", isAuthorized, deleteSingleAbout);
};
