const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failed");
    console.error(error);
  }
}

module.exports = { connect };
