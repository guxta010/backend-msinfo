const { Sequelize } = require("sequelize");
require("dotenv").config();

// Conexão com MySQL via Sequelize usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Testar conexão
sequelize.authenticate()
  .then(() => console.log("Conexão com MySQL estabelecida! ✅"))
  .catch(err => console.error("Erro ao conectar no MySQL:", err));

module.exports = sequelize;