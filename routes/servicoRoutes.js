const express = require("express");
const Servico = require("../models/Servico");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Criar um novo serviço
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { cliente_id, descricao, status, valor } = req.body;

    // 🐞 Log dos dados recebidos
    console.log("📥 Dados recebidos:", req.body);

    if (!cliente_id || !descricao || !status) {
      console.log("❌ Campos obrigatórios faltando");
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios!" });
    }

    const novoServico = await Servico.create({
      cliente_id,
      descricao,
      status,
      valor,
      data_servico: new Date() // ✅ Insere data atual no campo obrigatório
    });

    console.log("✅ Serviço cadastrado:", novoServico);
    res.status(201).json(novoServico);
  } catch (error) {
    console.error("🔥 ERRO AO CADASTRAR SERVIÇO:", error);
    res.status(500).json({ error: "Erro ao cadastrar serviço." });
  }
});

// 📌 Listar todos os serviços
router.get("/", authMiddleware, async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.json(servicos);
  } catch (error) {
    console.error("🔥 ERRO AO BUSCAR SERVIÇOS:", error);
    res.status(500).json({ error: "Erro ao buscar serviços." });
  }
});

// 📌 Buscar um serviço por ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ error: "Serviço não encontrado!" });
    }
    res.json(servico);
  } catch (error) {
    console.error("🔥 ERRO AO BUSCAR SERVIÇO:", error);
    res.status(500).json({ error: "Erro ao buscar serviço." });
  }
});

// 📌 Atualizar um serviço
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { descricao, status, valor } = req.body;
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({ error: "Serviço não encontrado!" });
    }

    servico.descricao = descricao;
    servico.status = status;
    servico.valor = valor;

    await servico.save();
    res.json(servico);
  } catch (error) {
    console.error("🔥 ERRO AO ATUALIZAR SERVIÇO:", error);
    res.status(500).json({ error: "Erro ao atualizar serviço." });
  }
});

// 📌 Excluir um serviço
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ error: "Serviço não encontrado!" });
    }

    await servico.destroy();
    res.json({ message: "Serviço removido com sucesso!" });
  } catch (error) {
    console.error("🔥 ERRO AO EXCLUIR SERVIÇO:", error);
    res.status(500).json({ error: "Erro ao excluir serviço." });
  }
});

module.exports = router;
