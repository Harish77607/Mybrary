//here we are going to setup all our routes for index of our application.
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
}); // after this there will no changes in our as we didnt import this in server.js 

module.exports = router