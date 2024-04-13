import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: 'FastFood', useUnifiedTopology: true });
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
    } catch (error) {
        console.error(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}


export { conection };