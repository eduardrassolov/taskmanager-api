require("dotenv").config();

const mongoose = require("mongoose");

exports.connect = async (databaseUrl, options) => {
  await mongoose.connect(databaseUrl, {
    ...options,
    dbName: process.env.DATABASE_NAME,
  });
};
