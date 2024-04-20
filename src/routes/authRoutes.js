const express = require("express");
const { register, login, getAllUsers, addToCart, getUserById, removeFromCart } = require("../constrollers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/addToCart", addToCart);
router.get("/getUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.post('/deleteProductCart', removeFromCart)

module.exports = router;
