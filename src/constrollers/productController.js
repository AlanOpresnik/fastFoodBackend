const sharp = require("sharp");
const Product = require("../models/Products");
const fs = require("fs-extra");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const fileUpload = require("express-fileupload")
const cloudinaryFunctions = require("../config/cloudinary");




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
  const params = req.body;
  console.log(params);
  try {
    const newProduct = new Product({
      title: params.title,
      description: params.description,
      price: params.price,
      category: params.category,
      color: params.color,
      limitedProduct: params.limitedProduct,
      isNewProduct: params.isNewProduct,
      ofert: params.ofert,
      tallas: params.tallas,
    });

    if (req.files && req.files.image) {
      const result = await cloudinaryFunctions.uploadImage(req.files.image.tempFilePath);
      console.log(result); // Verifica el resultado de la subida de la imagen

      // Verifica si result contiene las propiedades esperadas antes de asignarlas
      if (result && result.public_id && result.secure_url) {
        newProduct.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      } else {
        throw new Error("No se recibió la URL de la imagen");
      }
      await fs.unlink(req.files.image.tempFilePath)
      console.log(req.files.image.tempFilePath)
    }


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
      data: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "El producto no existe" });
    }
    if (product.image.public_id) {

      const result = await cloudinaryFunctions.deleteImage(product.image?.public_id)
    }
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = { getAllProducts, createProduct, deleteProduct };
