const express = require('express');
const { userModel } = require('../models/userModel');
const userRouter = express.Router();

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
    try {
        if (req.cookies && req.cookies.login == '1234') {
            next();
        } else {
            return res.json({
                message: "access denied",
            })
        }
    } catch (err) {
        return res.staus(500).json({
            message: err.message,
        })
    }
}

module.exports = { userRouter };