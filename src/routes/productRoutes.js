const express = require("express");
const { getAllProducts, createProduct, deleteProduct } = require("../constrollers/productController");
const multer = require('multer');
const fileUpload = require("express-fileupload");

const upload = multer();


const router = express.Router();
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));


router.get("/getProducts", getAllProducts);
router.post('/postProduct', createProduct);
router.delete('/deleteProduct/:id', deleteProduct)


module.exports = router;
