const express = require('express');
const { userModel } = require('../models/userModel');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../secrets/links');

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
        if (req.cookies.login) {
            // console.log(req.cookies.login);
            let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
            // console.log(isVerified);
            if (isVerified) {
                next();
            } else {
                return res.json({
                    message: "access denied",
                })
            }
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