const express = require('express');
const authRouter = express.Router();
const path = require('path')
const { userModel } = require('../models/userModel');

authRouter.route('/signup').post(setCreatedAt, async (req, res) => {
	try {
		let userDetails = req.body;
		console.log(req.body);
		// user.push(userDetails);
		let user = await userModel.create(userDetails);
		res.json({
			message: "user signed up",
			user: userDetails,
		})
		// console.log(user)
	} catch (err) {
		console.log(err);
	}
})

authRouter.route('/forgotPassword').get((req, res) => {
	let indexPath = path.join(__dirname, "../public/forgotPassword.html");
	res.sendFile(indexPath);
})
authRouter.route('/login').post(loginUser)

// --------- Functions ----------- //


function setCreatedAt(req, res, next) {
	// console.log('in setCreated at');
	let obj = req.body;
	let len = Object.keys(obj).length;
	if (len == 0) return res.status(400).json({ message: "cannot create if body is empty" });
	req.body.createdAt = new Date().toISOString();
	next();
}

async function loginUser(req, res) {
	try {
		if (req.body.email) {
			let user = await userModel.findOne({ email: req.body.email });
			if (user) {
				if (req.body.password == user.password) {
					res.cookie('login', '1234', {httpOnly: true});
					return res.json({
						message: "user logged in",
					})
				} else {
					return res.json({
						message: "email or password is wrong",
					})
				}
			} else {
				return res.json({
					message: "email or password is wrong",
				});
			}
		} else {
			return res.json({
				message: "user is not present",
			})
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
}

module.exports = { authRouter };
