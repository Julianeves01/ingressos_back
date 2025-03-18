const e = require("express");
const pool = require("../config/database");

const getIngressos = async () => {
    const result = await pool.query("SELECT * FROM ingressos");
    return result.rows;
    };


const getIngressoById = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.rows[0];
    };


const createIngresso = async (nome, email, evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "INSERT INTO ingressos (nome, email, evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [nome, email, evento, local, data_evento, categoria, preco, quantidade_disponivel]
    );
    return result.rows[0];
    };


const updateIngresso = async (id, nome, email, evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "UPDATE ingressos SET evento = $1, local = $2, data_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *",
    [nome, email, evento, local, data_evento, categoria, preco, quantidade_disponivel, id]
    );
        return result.rows[0];
};


const deleteIngresso = async (id) => {
    const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);
    return result.rowCount > 0;
};

const vendaIngresso = async (id, quantidade) => {
    const ingresso = await getIngressoById(id);
    if (!ingresso) {
        throw new Error ("Ingresso não encontrado") ;
    }
    if (ingresso.quantidade_disponivel < quantidade) {
        throw new Error ("Ingressos insuficientes para a venda"); ;
    }
    const novoQuantidade = ingresso.quantidade_disponivel - quantidade;

// preço mínimo de venda    
const precoMinimoPorCategoria = {
    "Pista": 100.00,
    "Pista VIP": 200.00,
    "Camarote": 300.00,
    "Arquibancada": 80.00
};

if (ingresso.preco < precoMinimoPorCategoria[ingresso.categoria]) {
    throw new Error ("Preço para categoria ${ingresso.categoria} abaixo do mínimo permitido");
}

await pool.query("UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2", [novoQuantidade, id]);
return {
    mensagem: "compra realizada com sucesso!",
    evento: ingresso.evento,
    categoria: ingresso.categoria,
    quantidade_comprada: quantidade,
    quantidade_restante: novoQuantidade,
};
};


module.exports = {getIngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, vendaIngresso};

