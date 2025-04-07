const express = require("express");
const Cliente = require("../models/Cliente");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Criar um cliente
router.post("/", async (req, res) => {
  try {
    console.log("📥 Dados recebidos no backend:", req.body);
    const { nome, telefone, email, endereco } = req.body;
    const novoCliente = await Cliente.create({ nome, telefone, email, endereco });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error("❌ Erro ao cadastrar cliente:", error);
    res.status(500).json({ error: "Erro ao cadastrar cliente." });
  }
});

// 📌 Listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
});

// 📌 Buscar um cliente por ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado!" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente." });
  }
});

// 📌 Atualizar um cliente
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { nome, telefone, email, endereco } = req.body;
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado!" });
    }

    cliente.nome = nome;
    cliente.telefone = telefone;
    cliente.email = email;
    cliente.endereco = endereco;

    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente." });
  }
});

// 📌 Excluir um cliente
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado!" });
    }

    await cliente.destroy();
    res.json({ message: "Cliente removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cliente." });
  }
});

module.exports = router;
