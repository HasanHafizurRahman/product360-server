require("dotenv").config();
const port = process.env.PORT || 6000;
const url = process.env.MONGO_URL || "mongodb://localhost:27017/product360";
const defaultImage = process.env.DefaultImagePath;
module.exports = {
  port,
  url,
  defaultImage,
};
