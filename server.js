const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./config/database");

// Importando os models
const Usuario = require("./models/Usuario");
const Cliente = require("./models/Cliente");
const Servico = require("./models/Servico");

// Importando rotas
const clienteRoutes = require("./routes/clienteRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/servicos", servicoRoutes);
app.use("/usuarios", usuarioRoutes);

// Rota base
app.get("/", (req, res) => {
  res.send("API da Assistência Técnica rodando! 🚀");
});

// 🔥 Middleware para capturar erros e exibir no terminal
app.use((err, req, res, next) => {
  console.error("Erro capturado pelo middleware:", err);
  res.status(500).json({ error: "Erro interno no servidor." });
});

// Sincronizar as tabelas no banco
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas com sucesso! ✅");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
  }
});
