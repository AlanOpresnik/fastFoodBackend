const express = require("express");
const { getAllProducts, createProduct } = require("../constrollers/productController");
const upload = require("../config/multer");

const router = express.Router();

router.get("/getProducts", getAllProducts);
router.post('/postProduct', upload.array('images', 5), createProduct);

module.exports = router;
