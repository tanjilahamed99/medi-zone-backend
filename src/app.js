const express = require("express");
const cors = require("cors");
require("dotenv").config();

// middle wares
// applyMiddleWare(app);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.LOCAL_CLIENT, process.env.CLIENT_SECONDARY],
    credentials: true,
  })
);

// error handlers
const globalErrorHandler = require("./Error/globalErrorHandler");

// routes
const product = require("./routes/product/index");
const auth = require("./routes/auth/index");
const user = require("./routes/user/index");
const carts = require("./routes/carts/index");
// middlewares

// apply routes
app.use("/api", product);
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api", carts);

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${res.originalUrl} on the server`);
  error.status = 404;

  next(error);
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
