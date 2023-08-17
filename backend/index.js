require("dotenv").config();

const express = require("express");
const app = express();
const { API_PORT } = process.env;
const cors = require("cors");

const whitelist = ["http://localhost:3000/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors("*"));

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(API_PORT, () =>
  console.log(`App listening at http://localhost:${API_PORT}`)
);
