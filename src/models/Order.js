const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        title: String,
        quantity: Number,
        unit_price: Number
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    cp: {
        type: Number,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shipping_method: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    external_reference: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,

    },
    status: String, // 'pendiente', 'pagado', etc.
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;