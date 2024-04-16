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
            
        }],
        image: {
          public_id: {
            type: String,
            required: true
          },
          secure_url: {
            type: String,
            required: true
          }
        }
      
    });

    const Product = mongoose.model("Product", productSchema);

    module.exports = Product;