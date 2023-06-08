const express = require("express");
const app = express();
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per minutes)
  message: "Rate limit exceeded. Please try again .",
});

app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isLoggedIn = (_, res, next) => {
  console.log("middleware logged");
  next();
};

app.get("/", limiter, (_, res) => {
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

  next(createError(404, "Route not found"));
});

// server error handler -> all the errors
app.use((err, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
