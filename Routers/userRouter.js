const express = require('express');
const { userModel } = require('../models/userModel');
const userRouter = express.Router();

userRouter.route('/').get(async (req, res) => {
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

module.exports = {userRouter};