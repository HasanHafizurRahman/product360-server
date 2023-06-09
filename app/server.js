require("dotenv").config();
const app = require("./app");
// const { port } = require("./secret");

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
