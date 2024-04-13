
import {conection} from "./database/conection.js"
import dotenv from "dotenv"; 
dotenv.config();
import authRoutes from "./src/routes/authRoutes.js"
import express from "express"; 
import cors from "cors"; 
import path from "path"; 



conection();


const app = express();
const port = 3900; 

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Rutas
app.use("/api/auth", authRoutes);


app.get("/api", (req, res) => {
    res.send("Welcome")
})

app.use("/uploadsProducts", express.static(new URL("uploadsProducts", import.meta.url).pathname));



app.listen(port, () => {
  console.log("Escuchando en el puerto " + port);
});
