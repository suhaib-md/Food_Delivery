const router = require('express').Router();
const Food = require('../models/Food'); // Updated model import
const Cart = require('../models/Cart'); // New model for the cart items
const Payment = require('../models/Payment'); // New model for the payment details

// Display food items from the database on the index page
router.get('/menu', async (req, res) => {
    try {
        const allFoodItems = await Food.find();
        res.render('menu', { foodItems: allFoodItems });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a food item to the cart
router.post('/add-to-cart/post/:_id', (req, res) => {
    const { _id } = req.params;
    Food.findById(_id)
        .then((foodItem) => {
            if (!foodItem) {
                console.log('Food item not found');
                return res.status(404).json({ error: 'Food item not found' });
            }

            // Create a new cart item and populate it with relevant data from the food item
            const cartItem = new Cart({
                foodItem: foodItem._id,
                quantity: 1, // You can track the quantity here
                name: foodItem.name, // Populate the required fields with values from the food item
                description: foodItem.description,
                price: foodItem.price,
                restaurant: foodItem.restaurant,
                image: foodItem.image
            });

            cartItem.save()
                .then(() => {
                    console.log('Added to cart:', foodItem);
                    res.redirect('/menu');
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});
// Display the cart
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.render('cart', { cartItems: cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a food item from the cart
router.get('/remove-from-cart/:_id', (req, res) => {
    const { _id } = req.params;
    Cart.deleteOne({_id})
        .then(() => {
            console.log('Removed from cart:', _id);
            res.redirect('/cart');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.post('/increment-quantity/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const cartItem = await Cart.findById(_id);

        if (!cartItem) {
            console.log('Cart item not found');
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Increment the quantity
        cartItem.quantity += 1;
        await cartItem.save();

        console.log('Quantity incremented:', cartItem);

        res.json({ message: 'Quantity incremented successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Decrement quantity
router.post('/decrement-quantity/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const cartItem = await Cart.findById(_id);

        if (!cartItem) {
            console.log('Cart item not found');
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Decrement the quantity (if greater than 0)
        if (cartItem.quantity > 0) {
            cartItem.quantity -= 1;
            await cartItem.save();
            console.log('Quantity decremented:', cartItem);
        }

        res.json({ message: 'Quantity decremented successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/payment', (req, res) => {
    res.render('payment'); // Assuming you have a 'payment.ejs' view
});

router.get('/thank-you', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.render('thank-you', { cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Handle the payment processing
router.post('/process-payment', async (req, res) => {
    try {
        const { name, mobileNumber, address, cardNumber, expirationDate, cvv } = req.body;

        // Create a new Payment document and save it to the collection
        const payment = new Payment({ name, mobileNumber, address, cardNumber, expirationDate, cvv });
        await payment.save();

        // After saving the payment data, you can redirect to the "Thank You" page
        res.redirect('/thank-you');
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Checkout
module.exports = router;
