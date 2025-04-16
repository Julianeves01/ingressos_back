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
      const{ evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
      const newIngresso = await ingressoModel.createIngresso(evento, data_evento, local, categoria, preco, quantidade_disponivel);
      res.status(201).json(newIngresso);
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
      const{ evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
      const updateIngresso = await ingressoModel.updateIngresso(req.params.id, evento, data_evento, local, categoria, preco, quantidade_disponivel);
      if (!updateIngresso) {
        return res.status(404).json({ message: "Ingresso não encontrado" });
      }
      res.json(updateIngresso);
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
      const newVenda = await ingressoModel.createVenda(id, quantidade_requerida);
      if (newVenda.error) {
        return res.status(400).json({ message: newVenda.error });
      }
      res.status(201).json(newVenda);
    } catch (error) {
      console.error(error);
      if (error.code ==="23505") {
        return res.status(400).json({message: "Ingresso já vendido!"});
      }
      res.status(500).json({ message: "Erro ao comprar ingresso" });
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