const bcrypt = require("bcryptjs");
const Usuario = require("./models/Usuario");
const sequelize = require("./config/database");

(async () => {
  await sequelize.sync();

  const senhaHash = await bcrypt.hash("123456", 10);

  await Usuario.create({
    nome: "Admin",
    email: "admin@email.com",
    senha: senhaHash,
  });

  console.log("✅ Admin criado com sucesso!");
})();
