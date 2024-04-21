const express = require("express");
const { createOrder } = require("../constrollers/paymentController");

const router = express.Router();

router.post('/create_preference',createOrder )
router.get('/success', (req, res) => res.send("Pago completo"))
router.post('/webhook', (req, res) => res.send("webhook"))

module.exports = router;