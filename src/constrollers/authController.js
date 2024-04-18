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

 const getUserById = async (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la URL

  try {
      // Buscar el usuario por su ID en la base de datos
      const user = await User.findById(userId);

      if (!user) {
          // Si no se encuentra ningún usuario con el ID proporcionado, devolver un error 404
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Si se encuentra el usuario, devolverlo en la respuesta
      res.status(200).json(user);
  } catch (error) {
      // Si ocurre algún error durante la búsqueda del usuario, devolver un error 500
      console.error("Error al seleccionar el usuario por ID:", error);
      res.status(500).json({ message: "Error del servidor al seleccionar el usuario por ID" });
  }
};


 const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
      // Verificar si el usuario existe
      const user = await User.findById(userId);
      console.log(userId)

      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = user.cart.findIndex(item => item.productId.toString() === productId);

      if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, actualizar la cantidad
          user.cart[existingProductIndex].quantity += quantity || 1;
      } else {
          // Si el producto no está en el carrito, agregarlo
          user.cart.push({ productId, quantity: quantity || 1 });
      }

      // Guardar los cambios en el usuario
      await user.save();

      res.status(200).json({ message: "Producto agregado al carrito correctamente", user });
  } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      res.status(500).json({ message: "Error del servidor al agregar producto al carrito" });
  }
};

 module.exports = { register, login, getAllUsers,addToCart,getUserById };

