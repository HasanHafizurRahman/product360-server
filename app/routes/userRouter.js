const express = require("express");
const userRouter = express.Router();
const rateLimit = require("express-rate-limit");
const { getUser } = require("../controllers/userController");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per minutes)
  message: "Rate limit exceeded. Please try again .",
});

userRouter.get("/", limiter, getUser);

module.exports = userRouter;
