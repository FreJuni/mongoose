const express = require("express");
const postRouter = require("./Routers/Rpost");
const adminRouter = require("./Routers/Radmin");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const authRouter = require("./Routers/Rauth");
const User = require("./Models/Muser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", "Pages");

app.use(bodyParser.urlencoded({ extended: false }));

const store = new MongoDBStore({
  uri: process.env.MONGOOSE_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("659a488ff78c5f7fb3ab7313")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(postRouter);
app.use(authRouter);
app.use("/admin", adminRouter);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(8080);
    return User.findOne().then((user) => {
      if (!user) {
        User.create({
          username: "kham",
          email: "kham@gmail.como",
          password: "kham123",
        });
      }
      return user;
    });
  })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });
