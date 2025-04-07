const bcrypt = require('bcryptjs');

const senha = 'msinfo'; // ← Coloque a senha que você quer aqui

bcrypt.hash(senha, 10).then((hash) => {
  console.log("Hash gerado:", hash);
});
