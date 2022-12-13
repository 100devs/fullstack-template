const Habit = require("../models/Habit")

// const cloudinary = require("../middleware/cloudinary");
// const Post = require("../models/Log");

module.exports = {
  getDashboard: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const habits = await Habit.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("dashboard.ejs", { habits: habits, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
//   createHabit: async (req, res) => {
//     try {
//       });
//       console.log("Habit has been added!");
//       res.redirect("/dashboard");
//     } catch (err) {
//       console.log(err);
//     }
//   },
  increment: async (req, res) => {
    try {
      await Habit.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { points: 1 },
        }
      );
      console.log("Increment + 1");
      res.redirect(`/dashboard/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  decrement: async (req, res) => {
    try {
      await Habit.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { points: -1 },
        }
      );
      console.log("Decrement - 1");
      res.redirect(`/dashboard/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteHabit: async (req, res) => {
    try {
      // Find post by id
      let habit = await Habit.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Habit.remove({ _id: req.params.id });
      console.log("Deleted Habit");
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
};
