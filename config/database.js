const { Sequelize } = require("sequelize");

// Conexão com MySQL via Sequelize
const sequelize = new Sequelize("assistencia_tecnica", "admin", "102030gg", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("Conexão com MySQL estabelecida! ✅"))
  .catch(err => console.error("Erro ao conectar no MySQL:", err));

module.exports = sequelize;
