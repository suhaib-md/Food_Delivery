const router = require('express').Router();
const FoodItem = require("../models/Food"); // Update the model import

// This route will retrieve food items from the database and render a page to display them
router.get("/", async (req, res) => {
    try {
        const allFoodItems = await FoodItem.find();
        res.render("index", { foodItems: allFoodItems });
    } catch (error) {
        // Handle any errors, e.g., by rendering an error page or returning an error response.
        console.error("Error fetching food items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
