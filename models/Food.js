const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    restaurant: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Food", FoodSchema);