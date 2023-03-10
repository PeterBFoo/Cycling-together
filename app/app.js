const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const env = require("./src/config/dbconfig");
const app = express();
const db = require("./src/db/connection.js");
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const scheduler = require("./src/scheduler");
const cors = require("cors");


db.connection.sync()
  .then(() => {
    if (env.LOGGING) {
      console.log("\x1b[36m%s\x1b[0m", "\nSynced database");
    }
  })
  .catch((err) => {
    if (env.LOGGING) {
      console.log("\x1b[31m%s\x1b[0m", "Failed to sync database due to: " + err.message);
    }
  });

if (env.NODE_ENV === "dev") app.use(logger("dev"));
let appPort = env.NODE_ENV == "dev" ? "3000" : "8080";

app.use(express.json());
app.use(cors());

// Routes
app.use("/bycicles", require("./src/routes/BycicleRoutes"));
app.use("/stores", require("./src/routes/StoreRoutes"));
app.use("/booking", require("./src/routes/BookingRoutes"));
app.use("/availability", require("./src/routes/AvailabilityRoutes"));
const swaggerDocument = yaml.load(fs.readFileSync(__dirname + "/doc/apiDoc.yaml", 'utf8'));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env.NODE_ENV === "dev" ? err : {};
  res.status(404).send(err.message);
});

if (env.NODE_ENV != "test") {
  let task = require("./src/services/BookingService").refresh;
  task();
  scheduler.startDailyJob(task);
  console.log("\x1b[36m%s\x1b[0m", "App is running on http://localhost:" + appPort + "\n");
}

module.exports = app;
