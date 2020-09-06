const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/db");

// connect to db
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to MONGO");
});

const app = express();

// express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// express messages middlwware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set public
app.use(express.static(path.join(__dirname, "public")));

// set global errors variable
app.locals.errors = null;

// set routes
app.use("/", require("./routes/pages"));
app.use("/admin", require("./routes/admin_pages"));

// start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
