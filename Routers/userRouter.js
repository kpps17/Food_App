const express = require('express');
const { userModel } = require('../models/userModel');
const userRouter = express.Router();

let userLoggedIn = false;

userRouter.route('/').get(protectRoute, async (req, res) => {
    try {
        let users = await userModel.find();
        if (users) {
            return res.json(users);
        } else {
            return res.json({
                message: "no users found",
            })
        }
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
})

function protectRoute(req, res, next) {
    if(userLoggedIn) {
        next();
    } else {
        return res.json({
            message: "access denied",
        })
    }
}

module.exports = {userRouter};