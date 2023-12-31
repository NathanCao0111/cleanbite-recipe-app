require("dotenv").config();
require("./src/config/db").connect();

const express = require("express");
const app = express();
const { API_PORT } = process.env;
const cors = require("cors");
const logger = require("morgan");
const route = require("./src/routes");
const errorHandlerMdw = require("./src/middlewares/errorHandlerMdw");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);

// error handler
app.use(errorHandlerMdw);

app.listen(API_PORT, () =>
  console.log(`App listening at http://localhost:${API_PORT}`)
);
