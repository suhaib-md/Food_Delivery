const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: String,
    mobileNumber: String,
    address: String,
    cardNumber: String,
    expirationDate: String,
    cvv: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;