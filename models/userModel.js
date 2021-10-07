const mongoose = require("mongoose");
const { dbLink } = require("../secrets/links");
const validator = require("email-validator");
// console.log(dbLink);

mongoose.connect(dbLink).then(function (db) {
	// console.log(db);
	console.log('db connected');
})
	.catch(function (err) {
		console.log(err);
	});

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: function () {
			return validator.validate(this.email);
		}
	},
	createdAt: {
		type: String,
	},
	password: {
		type: String,
		required: true,
		min: 8
	},
});

const userModel = mongoose.model('userModel', userSchema);
module.exports = {userModel};