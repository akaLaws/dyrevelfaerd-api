var { createSingleSubscriber, getAllSubscribers, deleteSingleSubscriber } = require("../controllers/subscriber.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/subscribers", createSingleSubscriber);
	router.get("/api/v1/subscribers", isAuthorized, getAllSubscribers);
	router.delete("/api/v1/subscribers/:email", deleteSingleSubscriber);
};
