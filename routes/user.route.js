var { createSingleUser, getSingleUser } = require("../controllers/user.controller");

module.exports = function(router) {
	router.get("/api/v1/users/:id", getSingleUser);
	router.post("/api/v1/users", createSingleUser);
};
