const express = require("express");
const app = express();
const createError = require("http-errors");

const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isLoggedIn = (_, res, next) => {
  console.log("middleware logged");
  next();
};

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/api/user", isLoggedIn, (_, res) => {
  res.status(200).send({
    message: "user profile is returned",
  });
});

app.get("/test", (_, res) => {
  res.send("Testing successfull!");
});

// client error handler
app.use((_, res, next) => {
  // res.status(404).send({ message: "User not found" });
  createError(404, "Route not found");
  next();
});

// server error handler
app.use((err, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server error" });
});

module.exports = app;
