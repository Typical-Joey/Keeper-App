const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Need to use express.json() to handle json objects being sent from react server
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/keeperDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const userSchema = mongoose.Schema({
  // username: String,
  // password: String,
  // email: String,
  notes: Array,
});

const User = mongoose.model("User", userSchema);

const test = new User({
  notes: [
    { title: "Test 1", content: "Something" },
    { title: "Test 2", content: "Something Else" },
  ],
});

// test.save();

app.get("/", function (req, res) {
  res.send("Working");
});

app
  .route("/user/notes")

  // Show users notes
  .get(function (req, res) {
    User.find(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        // Sending user specific notes array to front-end
        res.send(user[0].notes);
      }
    });
  })

  // Add users notes to database
  .post(function (req, res) {
    // console.log(req.body);
  });

// Port needs to be 5000 beacuse react defaults to 3000
app.listen(process.env.PORT || 5000, function () {
  console.log("Server is now listening");
});
