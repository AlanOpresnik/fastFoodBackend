const mongoose = require("mongoose");

    const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: [{
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number,
          }],
          category:{
            type: String,
            required: true,
          },
          color: {
            type: String,
          },
          limitedProduct: {
            type: Boolean,
            required: true,
          },
          isNewProduct: {
            type: Boolean,
            required: true,
          },
          ofert: {
            type: Boolean,
            required: true,
          },
          tallas: [{
            type: String, // Puedes cambiar el tipo según tus necesidades
            
        }]
    });

    const Product = mongoose.model("Product", productSchema);

    module.exports = Product;