const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const dashboardController = require("../controllers/dashboard");
const logController = require("../controllers/logs");
// const logsController = require("../controllers/logs");
// const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);

// Dashboard Routes
router.get("/dashboard", ensureAuth, dashboardController.getDashboard);
// router.get("/dashboard", ensureAuth, logsController.getDashboard);

// Log Routes
// comment out later to see why it is needed.
router.get("/logs", logController.getLog);

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
