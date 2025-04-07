const { Sequelize } = require("sequelize");
require("dotenv").config();

// Conexão com PostgreSQL via Sequelize usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 26257, // padrão para CockroachDB
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necessário para CockroachDB, Neon, PlanetScale
      },
    },
  }
);

// Testar conexão
sequelize.authenticate()
  .then(() => console.log("✅ Conexão com PostgreSQL/CockroachDB estabelecida!"))
  .catch(err => console.error("❌ Erro ao conectar no PostgreSQL:", err));

module.exports = sequelize;
