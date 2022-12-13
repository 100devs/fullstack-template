// const cloudinary = require("../middleware/cloudinary");
// const Post = require("../models/Log");
const Log = require("../models/Log");

module.exports = {
  getLog: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const log = await Log.findById(req.params.id);
      res.render("log.ejs", { post: post, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  // work on this later
  createLog: async (req, res) => {
    try {
      await Habit.create({
        habit: req.body.habit,
        // image: result.secure_url,
        icon: req.body.icon,
        // cloudinaryId: result.public_id,
        caption: req.body.caption,
        // progress: req.body.progress,
        unit: req.body.unit,
        user: req.user.id,
      });
      console.log("Habit has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  deleteLog: async (req, res) => {
    try {
      // Find post by id
      let log = await Log.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Log.remove({ _id: req.params.id });
      console.log("Deleted Log");
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
};
