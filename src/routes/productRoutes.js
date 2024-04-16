const express = require("express");
const { getAllProducts, createProduct } = require("../constrollers/productController");


const router = express.Router();

router.get("/getProducts", getAllProducts);
router.post('/postProduct', createProduct);

module.exports = router;
