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
    clientId: {
        type: String,
      
    },
    external_reference: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        
    },
    status: String, // 'pendiente', 'pagado', etc.
    preferenceId: String // ID de la preferencia de MercadoPago
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;