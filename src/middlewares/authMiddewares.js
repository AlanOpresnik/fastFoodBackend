import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  // Verificar si hay un token JWT en el encabezado de autorización
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }
  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Agregar el ID del usuario decodificado al objeto de solicitud
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido" });
  }
};