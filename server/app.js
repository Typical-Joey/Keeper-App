const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/keeperDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const userSchema = mongoose.Schema({
  notes: Array
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.send("Working");
});

// Show users notes
app.get("/user/notes", function (req, res) {
  res.send({
    title: "Test Note",
    content: "Server is sending data to front-end!"
  });
});

// Add users notes to database
app.post("/user/add-note", function(req, res) {
  console.log(req);
});

// Port needs to be 5000 beacuse react defaults to 3000
app.listen(process.env.PORT || 5000, function () {
  console.log("Server is now listening");
});
