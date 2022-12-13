const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
// const homeController = require("../controllers/home");
const dashboardController = require("../controllers/dashboard");
// const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
// router.get("/", homeController.getIndex);
// router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/dashboard", ensureAuth, dashboardController.getDashboard);

module.exports = router;
