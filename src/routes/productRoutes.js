const express = require("express");
const { getAllProducts, createProduct, deleteProduct, getProductById,searchProducts } = require("../constrollers/productController");
const multer = require('multer');
const fileUpload = require("express-fileupload");

const upload = multer();


const router = express.Router();
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));


router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProductById);
router.post('/postProduct', createProduct);
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/search',searchProducts)



module.exports = router;
