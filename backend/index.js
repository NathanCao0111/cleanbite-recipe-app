require("dotenv").config();
require("./src/config/db").connect();

const createError = require("http-errors");
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const cors = require("cors");
const logger = require("morgan");
const route = require("./src/routes");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);

app.get("/hello", (req, res) => {
  res.send("Hello");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  next(err);
  // res.status(err.status || 500);
  // res.render("error");
});

app.listen(API_PORT, () =>
  console.log(`App listening at http://localhost:${API_PORT}`)
);
