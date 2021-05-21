const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// Hopefully this allows me to push to heroku
app.use(cors());

app.use(express.static(__dirname + "client"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join("client/build", "index.html"));
  });
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Need to use express.json() to handle json objects being sent from react server
app.use(express.json());

mongoose.connect(
  `mongodb+srv://admin-joey:${process.env.DBPASSWORD}@keeper.zv18s.mongodb.net/keeperDB`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const noteSchema = mongoose.Schema({
  title: String,
  content: String,
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  notes: Array,
});

const User = mongoose.model("User", userSchema);

let activeUser = {};

// User Route
// This will be used so the front-end can get the users info to update notes
app.get("/user", function (req, res) {
  res.json(activeUser);
});

// Register Route
app.post("/user/register", function (req, res) {
  const { username, email, password } = req.body;

  User.findOne({ email: email }, function (err, user) {
    if (err) {
      res.json({ status: 400 }); // Error occured
    } else {
      if (user) {
        res.json({ status: 409 }); // User already exists
      } else {
        const user = new User({
          username: username,
          email: email,
          password: password,
          notes: [],
        });
        user.save();
        activeUser = user;
        res.json({ status: 200 }); // User successfully created
      }
    }
  });
});

// Login Route
app.post("/user/login", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log(err);
      res.json({ status: 400 });
    } else if (!user) {
      // Send back to login page with warning
      console.log("User not found");
      res.json({ status: 404 });
    } else {
      // Send to app page
      if (user.password === password) {
        activeUser = user;
        res.json({ status: 200 }); // User successfully logged in
      } else {
        res.json({ status: 403 }); // Incorrect Password
      }
    }
  });
});

// Add users notes to database
app.post("/user/notes", function (req, res) {
  const data = req.body;
  User.findByIdAndUpdate(
    data.id,
    { $push: { notes: data.note } },
    function (err) {
      if (err) {
        console.log(err);
        res.json({ status: 500 });
      } else {
        res.json({ status: 200 });
      }
    }
  );
});

// Deleting users notes in database
app.post("/user/notes/delete", function (req, res) {
  const data = req.body;
  User.findByIdAndUpdate(
    data.id,
    { $pull: { notes: data.note } },
    function (err) {
      if (err) {
        console.log(err);
        res.json({ status: 500 });
      } else {
        res.json({ status: 200 });
      }
    }
  );
});

// Port needs to be 5000 beacuse react defaults to 3000
app.listen(process.env.PORT || 5000, function () {
  console.log("Server is now listening");
});
