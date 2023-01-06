var { createSingleAdoptSection, getSingleAdoptSection, getAllAdoptSections, updateSingleAdoptSection, deleteSingleAdoptSection } = require("../controllers/adoptsection.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/adoptsections", isAuthorized, createSingleAdoptSection);
	router.get("/api/v1/adoptsections/:id", getSingleAdoptSection);
	router.get("/api/v1/adoptsections", getAllAdoptSections);
	router.put("/api/v1/adoptsections/:id", isAuthorized, updateSingleAdoptSection);
	router.delete("/api/v1/adoptsections/:id", isAuthorized, deleteSingleAdoptSection);
};
