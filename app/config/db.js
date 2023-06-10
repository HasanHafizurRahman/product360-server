const mongoose = require("mongoose");
const { url } = require("../secret");

async function connectDB(options = {}) {
  try {
    await mongoose.connect(url, options);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("failed to connect to mongo");
  }
}

module.exports = connectDB;
