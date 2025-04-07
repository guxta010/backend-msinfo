const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado! Token não fornecido." });
  }

  try {
    const tokenLimpo = token.replace("Bearer ", ""); // Remove "Bearer " do token
    const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; // Adiciona o ID do usuário à requisição
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido!" });
  }
};

module.exports = authMiddleware;
