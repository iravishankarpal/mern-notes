// require("dotenv").config();

const mongoose = require("mongoose");
require("dotenv").config();

const connectionDB = async () => {
  // "mongodb://localhost:27017"
  var conn = await mongoose.connect(process.env.mongo_url);
  await console.log(`conected to host : ${conn.connection.host}`);
};

module.exports = connectionDB;
