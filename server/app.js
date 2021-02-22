const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("Working");
});

// Port needs to be 5000 beacuse react defaults to 3000
app.listen(process.env.PORT || 5000, function () {
  console.log("Server is now listening");
});
