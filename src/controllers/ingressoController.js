const ingressoModel = require("../models/ingressoModel");

const getIngressos = async (req, res) => {
  try {
    const ingressos = await ingressoModel.getIngressos();
    res.json(ingressos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar ingressos" });
  }
};

const getIngresso = async (req, res) => {
  try {
    const ingresso = await ingressoModel.getIngressoById(req.params.id);
    if (!ingresso) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }
    res.json(ingresso);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar ingresso" });
  }
};

const createIngresso = async (req, res) => {
  try {
    const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    if (!evento || !local || !data_evento || !categoria || !preco || !quantidade_disponivel) {
      return res.status(400).json({ message: "Dados inválidos ou incompletos" });
    }

    // Validar se data_evento é uma data válida
    if (isNaN(Date.parse(data_evento))) {
      return res.status(400).json({ message: "Data do evento inválida" });
    }

    const newIngresso = await ingressoModel.createIngresso(
      evento,
      local,
      data_evento,
      categoria,
      preco,
      quantidade_disponivel
    );

    res.status(201).json({ message: "Ingresso criado com sucesso", newIngresso });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ message: "Ingresso já existe" });
    }
    res.status(500).json({ message: "Erro ao criar ingresso" });
  }
};

const updateIngresso = async (req, res) => {
  try {
    const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;

    // Validar se data_evento é uma data válida
    if (data_evento && isNaN(Date.parse(data_evento))) {
      return res.status(400).json({ message: "Data do evento inválida" });
    }

    const updateIngresso = await ingressoModel.updateIngresso(
      req.params.id,
      evento,
      local,
      data_evento,
      categoria,
      preco,
      quantidade_disponivel
    );

    if (!updateIngresso) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }

    res.json({ message: "Ingresso atualizado com sucesso", updateIngresso });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar ingresso" });
  }
};

const deleteIngresso = async (req, res) => {
  try {
    const message = await ingressoModel.deleteIngresso(req.params.id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar ingresso" });
  }
};

const createVenda = async (req, res) => {
  try {
    const { id, quantidade_requerida } = req.body;

    // Validar os dados recebidos
    if (!id || !quantidade_requerida) {
      return res.status(400).json({ message: "Dados inválidos ou incompletos" });
    }

    const venda = await ingressoModel.createVenda(id, quantidade_requerida);

    if (venda.error) {
      return res.status(400).json({ message: venda.error });
    }

    res.status(201).json({ message: "Venda realizada com sucesso", venda });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao realizar venda" });
  }
};

module.exports = {
  getIngressos,
  getIngresso,
  createIngresso,
  updateIngresso,
  deleteIngresso,
  createVenda,
};