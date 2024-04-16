const sharp = require("sharp");
const Product = require("../models/Products");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const fileUpload = require("express-fileupload")
const { uploadImage } = require("../config/cloudinary")

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "error al obtener los productos",
      data: error,
    });
  }
};
const createProduct = async (req, res) => {
  const {title, description,price,category,color,limitedProduct,isNewProduct,ofert,tallas} = req.body;
  if (req.files?.image) {
    const result = await uploadImage(req.files.image.tempFilePath)
    console.log(result)
  }
  let images;

  try {


    const newProduct = new Product({
      title: title,
      description: description,
      price: price,
      category: category,
      color: color,
      limitedProduct: limitedProduct,
      isNewProduct: isNewProduct,
      ofert: ofert,
      tallas: tallas,
    });

    const savedProduct = await newProduct.save();

    return res.status(200).send({
      status: "success",
      msg: "Producto guardado con éxito",
      product: savedProduct,
    });
  } catch (error) {


    return res.status(500).json({
      status: "error",
      message: "Error al subir el producto",
      data: error,
    });
  }
}


module.exports = { getAllProducts, createProduct };
