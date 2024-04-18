const express = require("express");
const { register, login, getAllUsers, addToCart } = require("../constrollers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/addToCart", addToCart);
router.get("/getUsers", getAllUsers);

module.exports = router;
