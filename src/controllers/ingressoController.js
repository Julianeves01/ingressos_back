const ingressoModel = require("../models/ingressoModel");

const getAllIngresso = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingressos." });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso." });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updatedIngresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const deleted = await ingressoModel.deleteIngresso(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json({ message: "Ingresso deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar ingresso." });
    }
};

const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const result = await ingressoModel.vendaIngresso(id, quantidade);
        res.json(result);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    getAllIngresso,
    getIngresso,
    createIngresso,
    updateIngresso,
    deleteIngresso,
    vendaIngresso,
};

