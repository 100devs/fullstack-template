const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const logsController = require("../controllers/logs");
// const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
// change to getLogs here and everywhere
router.get("/:id", ensureAuth, logsController.getLog);
// router.get("/:id", ensureAuth, postsController.getPost); C

//Enables user to create post w/ cloudinary for media uploads
// change to createLogs here and everywhere
router.post("/createLog", upload.single("file"), logsController.createLog);
// router.post("/createPost", upload.single("file"), postsController.createPost); C

//Enables user to like post. In controller, uses POST model to update likes by 1
// change to likeLogs here and everywhere
// router.put("/likeLog/:id", logsController.likeLog); // Might relocate
// router.put("/likePost/:id", postsController.likePost);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
// change to deleteLogs here and everywhere
router.delete("/deleteLog/:id", logsController.deleteLog);
// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
