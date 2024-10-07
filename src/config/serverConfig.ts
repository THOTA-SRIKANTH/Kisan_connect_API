import path from "path";
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../", "../", ".env"),
});

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};
