const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const env = require("./src/config/dbconfig");
const app = express();
const db = require("./src/db/connection.js");

db.connection.sync()
  .then(() => {
    console.log("\x1b[36m%s\x1b[0m", "\nSynced database");
  })
  .catch((err) => {
    console.log("\x1b[31m%s\x1b[0m", "Failed to sync database due to: " + err.message);
  });

if (env.NODE_ENV === "dev") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use("/", require("./src/routes/index"));
app.use("/bycicles", require("./src/routes/Bycicles"));
app.use("/stores", require("./src/routes/Stores"));

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

console.log("App is running on http://localhost:" + env.PORT + "\n");

module.exports = app;
