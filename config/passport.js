const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			//console.log("jwt", jwt_payload.sub);
			User.findOne({ _id: jwt_payload.id })
				.then(user => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
						// or you could create a new account
					}
				})
				.catch(err => console.log(err));
		})
	);
};
