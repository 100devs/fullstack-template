// const Post = require("../models/Log");
const Log = require("../models/Log");
const Habit = require("../models/Habit");

module.exports = {
  getLog: async (req, res) => {
    try {
      //id parameter comes from the post routes
      const logs = await Log.find({user: req.user.id}).lean();
      console.log(logs)
      res.render("logs.ejs", { logs: logs, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  // work on this later
  createLog: async (req, res) => {
    try {
      const dailyHabits = await Habit.find({user: req.user.id})
      const date = new Date;
      console.log(dailyHabits[0].habits);
      await Log.create({
        habits: dailyHabits,
        date: date,
        user: req.user.id,
      });
      console.log("Habit has been added!");
      res.redirect("/logs");
      // res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  deleteLog: async (req, res) => {
    try {
      // Find post by id
      await Log.findOneAndDelete({ _id: req.params.id });
      // await Log.remove({ _id: req.params.id });
      console.log("Deleted Log");
      res.redirect("/logs");
    } catch (err) {
      // res.redirect("/logs");
      console.error(err);
    }
  },
};
