const express = require("express");
const router = express.Router();
// const authController = require("../controllers/auth");
const dashboardController = require("../controllers/dashboard");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
// router.get("/", homeController.getIndex);
// router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/:id", ensureAuth, dashboardController.getDashboard);
router.post("/createHabit", dashboardController.createHabit);
router.put("/increment/:id", dashboardController.increment);
router.put("/decrement/:id", dashboardController.decrement);
router.delete("/deleteHabit/:id", dashboardController.deleteHabit);

module.exports = router;
