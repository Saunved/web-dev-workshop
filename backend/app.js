// Dependencies
const express = require("express");
const app = express();

// Importing routes
const userRouter = require("./routes/user");

app.use("/", [userRouter]);

module.exports = app;
