require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
// const { port } = require("./secret");

const port = process.env.PORT || 6000;
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await connectDB();
});
