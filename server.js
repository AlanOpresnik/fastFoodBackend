const { conection } = require("./database/conection.js");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./src/routes/authRoutes.js");
const productRoutes = require("./src/routes/productRoutes.js");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const path = require("path");
const paymentRoutes = require("./src/routes/paymentRoutes.js");

conection();

const app = express();
const port = 3900;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/mp",paymentRoutes)

app.get("/api", (req, res) => {
    res.send("Welcome");
});

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

app.use("/uploadsProducts", express.static(path.join("src", "uploadsProducts")));

app.listen(port, () => {
    console.log("Escuchando en el puerto " + port);
});
