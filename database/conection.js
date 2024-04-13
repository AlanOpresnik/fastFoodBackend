const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const conection = async () => {
    try {
        await mongoose.connect("mongodb+srv://alan:alan123@cluster0.n03rc9x.mongodb.net/", { dbName: 'FastFood', useUnifiedTopology: true });
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
    } catch (error) {
        console.error(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
};

module.exports = { conection };
