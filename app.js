const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/foodDeliveryApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
const cartRoutes = require('./routes/food');  // You may need a separate route file for cart functionality
app.use(indexRoutes);
app.use(cartRoutes); // Add more route files as needed for different application features


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
