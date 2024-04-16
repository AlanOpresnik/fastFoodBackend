const cloudinary = require("cloudinary");

// Configura Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Función para cargar una imagen a Cloudinary
async function uploadImage(filePath) {
  try {
    // Sube la imagen a Cloudinary y espera la respuesta
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "productsNike", // Carpeta donde se almacenará la imagen
    });

    // Devuelve el resultado de la carga de la imagen
    return result;
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la carga de la imagen
    console.error("Error al cargar imagen a Cloudinary:", error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
}

async function deleteImage(publicId) {
  await cloudinary.v2.uploader.destroy(publicId);
}

module.exports = {uploadImage,deleteImage};
