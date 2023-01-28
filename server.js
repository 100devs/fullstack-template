const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
// const nodeCron = require("node-cron")
const mainRoutes = require("./routes/main");
const logRoutes = require("./routes/logs");
const dashRoutes = require("./routes/dashboard")
const cron = require("node-cron");

// npm install pm2
cron.schedule("59 59 23 * * *", () => {
  logsController.createLog(); 
});

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// node-cron for scheduling log upload
// https://www.youtube.com/watch?v=x8VIVR6ABHo - gotten from this vid
// nodeCron.schedule('*/2 * * * * *', () => {
//   console.log("It's working");
// })

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
// app.use("/post", postRoutes);
app.use("/logs", logRoutes);
app.use("/dashboard", dashRoutes);



//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
