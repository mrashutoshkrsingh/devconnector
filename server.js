const express = require("express");
var app = express();
const mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => {
		console.log("Mongoose connected");
	})
	.catch(err => console.log(err));

app.get("/", () => {
	res.send("Hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});
