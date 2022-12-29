const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("/", require("./src/routes/index"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env.NODE_ENV === "dev" ? err : {};
});

console.log("App is running on http://localhost:3000");

module.exports = app;
