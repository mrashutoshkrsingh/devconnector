const Joi = require("joi");

const register = Joi.object().keys({
	// email is required
	// email must be a valid email string
	email: Joi.string()
		.email()
		.required(),

	name: Joi.string()
		.required()
		.min(4)
		.max(30)
		.required(),

	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required()
});

const login = Joi.object().keys({
	// email is required
	// email must be a valid email string
	email: Joi.string()
		.email()
		.required(),

	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required()
});

module.exports.register = register;
module.exports.login = login;
