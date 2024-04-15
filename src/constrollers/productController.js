const sharp = require("sharp");
const Product = require("../models/Products");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

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
    let images; // Declara la variable images aquí
  
    try {
      images = await Promise.all(
        req.files.map(async (file) => {
          const imageBuffer = await sharp(file.path).toFormat("webp").toBuffer();
          const newFilename = file.filename.replace(/\.[^/.]+$/, ".webp");
          const newPath = `${file.destination}/${newFilename}`;
          await sharp(imageBuffer).toFile(newPath);
  
          // Eliminar la imagen original
          await unlinkAsync(file.path);
  
          return {
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: "image/webp",
            destination: file.destination,
            filename: newFilename,
            path: newPath,
            size: imageBuffer.length,
          };
        })
      );
  
      const newProduct = new Product({
        title: params.title,
        description: params.description,
        price: params.price,
        images: images,
        category: params.category,
        color: params.color,
        limitedProduct: params.limitedProduct,
        isNewProduct: params.isNewProduct,
        ofert: params.ofert,
        tallas: params.tallas,
      });
  
      const savedProduct = await newProduct.save();
  
      return res.status(200).send({
        status: "success",
        msg: "Producto guardado con éxito",
        product: savedProduct,
      });
    } catch (error) {
      if (images) {
        await Promise.all(
          images.map(async (image) => {
            await unlinkAsync(image.path);
          })
        );
      }
      return res.status(500).json({
        status: "error",
        message: "Error al subir el producto",
        data: error,
      });
    }
  };

module.exports = { getAllProducts, createProduct };
