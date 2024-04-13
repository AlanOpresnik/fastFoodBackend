const express = require("express");
const { register, login, getAllUsers } = require("../constrollers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getAllUsers);

module.exports = router;
