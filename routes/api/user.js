const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = require("../../config/keys").secretKey;
// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
	res.json({ msg: "user works!" });
});

//user register

7754019063;

router.post("/register", (req, res) => {
	//console.log(req.body);
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	} else {
		// send a success response if validation passes
		// attach the random ID to the data response

		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				return res.status(400).json({ email: "email already exists" });
			}

			const avatar = gravatar.url(req.body.email, {
				s: "200",
				r: "pg",
				d: "mm"
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(newUser.password, salt, function(err, hash) {
					// Store hash in your password DB.
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => {
							res.json(user);
						})
						.catch(err => console.log(err));
				});
			});
		});
	}
});

//user login
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	} else {
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({ email: email }).then(user => {
			if (!user) return res.status(404).json({ email: "User not found" });
			bcrypt.compare(password, user.password).then(response => {
				if (!response)
					return res.status(404).json({ password: "password incorrect" });
				//user matched

				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				}; //create jwt payload

				//sign tocken
				jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
					if (err) throw err;
					res.json({
						success: true,
						token: "Bearer " + token
					});
				});
			});
		});
	}
});

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { id, name, email } = req.user;
		res.json({ id, name, email });
	}
);

module.exports = router;
