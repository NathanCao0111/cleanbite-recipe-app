require("dotenv").config();

const express = require("express");
const app = express();
const { API_PORT } = process.env;

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(API_PORT, () =>
  console.log(`App listening at http://localhost:${API_PORT}`)
);
