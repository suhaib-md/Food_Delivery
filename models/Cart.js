const mongoose = require("mongoose");

const CartFoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
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
        type: String,
        default: "./public/images/sushi.jpeg",
    }
});

module.exports = mongoose.model("Cart", CartFoodSchema);