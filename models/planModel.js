const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    price: {
        type: Number
    },
    delivery: {
        type: Boolean,
    },
    meals: {
        type: Number,
    },
    description: {
        type: String,
    },
})