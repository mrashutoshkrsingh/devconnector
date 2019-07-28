const express = require("express");
var app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const Posts = require("./routes/api/posts");
const Profile = require("./routes/api/profile");
const User = require("./routes/api/user");
const passport = require("passport");
const path = require("path");
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch(err => console.log(err));

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/api/users", User);
app.use("/api/posts", Posts);
app.use("/api/profile", Profile);

//Server static assets if production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
