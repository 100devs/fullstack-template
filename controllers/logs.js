// const cloudinary = require("../middleware/cloudinary");
// const Post = require("../models/Log");
const Log = require("../models/Log");

module.exports = {
  getDashboard: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const logs = await Log.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("dashboard.ejs", { logs: logs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
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
  createLog: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Log.create({
        habit: req.body.habit,
        // image: result.secure_url,
        icon: req.body.icon,
        // cloudinaryId: result.public_id,
        caption: req.body.caption,
        // progress: req.body.progress,
        unit: req.body.unit,
        user: req.user.id,
      });
      console.log("Log has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  likeLog: async (req, res) => {
    try {
      await Log.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/log/${req.params.id}`);
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
