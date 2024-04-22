const express = require("express");
const { createOrder, webHook, getOrderById } = require("../constrollers/paymentController");

const router = express.Router();

router.post('/create_preference', createOrder)
router.get('/success', (req, res) => res.send("Pago completo"))
router.post('/webHook', webHook)
router.get('/getOrderById/:id', getOrderById)

module.exports = router;