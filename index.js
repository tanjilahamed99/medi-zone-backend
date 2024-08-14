require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/Db/connectDb");
const { default: mongoose } = require("mongoose");

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const main = async () => {
  console.log("Called");
  await connectDB();

  server.listen(port, () => {
    console.log("listening to port ", port);
  });
};

main();
