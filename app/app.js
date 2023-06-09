const express = require("express");
const app = express();
const xssClean = require("xss-clean");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");

app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);

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
