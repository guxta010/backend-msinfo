const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cliente = require("./Cliente");

const Servico = sequelize.define("Servico", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: "id",
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data_servico: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pendente", "Em andamento", "Concluído"),
    defaultValue: "Pendente",
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Servico.belongsTo(Cliente, { foreignKey: "cliente_id" }); // Relacionamento com Cliente

module.exports = Servico;
