const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

 const register = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, lastName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Inicio de sesión


 const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Generar una clave secreta dinámicamente
    const secret = Math.random().toString(36).slice(-8);
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "2d" });
    res.status(200).json({ token, name:user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
 const getAllUsers = async (req, res) => {
   try {
       const users = await User.find();
       res.status(200).json(users);
   }catch(error){
       res.status(500).json({ message: "Error al buscar usuarios" });
   }
 }
 module.exports = { register, login, getAllUsers };

