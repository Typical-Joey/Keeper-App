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
  username: String,
  password: String,
  email: String,
  notes: Array,
});

const User = mongoose.model("User", userSchema);

const test = new User({
  username: "Bob",
  password: "123",
  email: "bob@bob.com",
  notes: [
    {
      title: "Test 1",
      content: "Something",
    },
    {
      content: "Something Else",
    },
  ],
});

// test.save();

// Register Route
app.post("/user/register", function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password; // Needs to be encrypted using passport
  const user = new User({
    username: username,
    email: email,
    password: password,
    notes: [],
  });
  user.save();
});

// Login Route
app.post("/user/login", function (req, res) {
  console.log(req.body);
});

// Notes Route
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
