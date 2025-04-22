const pool = require("../config/database");

const getIngressos = async () => {
  const result = await pool.query("SELECT * FROM ingressos");
  return result.rows;
};

const getIngressoById = async (id) => {
  const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
  return result.rows[0];
};

const createIngresso = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
  // Verificação de preços mínimos por categoria
  if (categoria === "Pista" && preco < 100) {
    return { error: "Preço mínimo para Pista foi atingido." };
  } else if (categoria === "Pista VIP" && preco < 200) {
    return { error: "Preço mínimo para Pista VIP foi atingido." };
  } else if (categoria === "Camarote" && preco < 300) {
    return { error: "Preço mínimo para Camarote foi atingido." };
  } else if (categoria === "Arquibancada" && preco < 80) {
    return { error: "Preço mínimo para Arquibancada foi atingido." };
  }

  // Inserção no banco de dados
  const query = `
    INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [evento, local, data_evento, categoria, preco, quantidade_disponivel];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar ingresso:", error);
    throw error;
  }
};

const updateIngresso = async (id, evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
  const query = `
    UPDATE ingressos
    SET evento = $1, local = $2, data_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [evento, local, data_evento, categoria, preco, quantidade_disponivel, id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao atualizar ingresso:", error);
    throw error;
  }
};

const deleteIngresso = async (id) => {
  const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);
  if (result.rowCount === 0) {
    return { error: "Ingresso não encontrado" };
  }
  return { message: "Ingresso deletado com sucesso!" };
};

const createVenda = async (id, quantidade_requerida) => {
  try {
    // Buscar o ingresso pelo ID
    const ingresso = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);

    if (!ingresso.rows.length) {
      return { error: "Ingresso não encontrado" };
    }

    const { quantidade_disponivel } = ingresso.rows[0];

    // Verificar se há ingressos suficientes
    if (quantidade_disponivel < quantidade_requerida) {
      return { 
        error: `Quantidade insuficiente de ingressos disponíveis. Disponível: ${quantidade_disponivel}, Requerido: ${quantidade_requerida}` 
      };
    }

    // Atualizar a quantidade de ingressos disponíveis
    const novaQuantidade = quantidade_disponivel - quantidade_requerida;
    await pool.query("UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2", [novaQuantidade, id]);

    // Registrar a venda
    const venda = await pool.query(
      "INSERT INTO vendas (id_ingresso, quantidade) VALUES ($1, $2) RETURNING *",
      [id, quantidade_requerida]
    );

    return venda.rows[0];
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    throw error;
  }
};

module.exports = {
  getIngressos,
  getIngressoById,
  createIngresso,
  updateIngresso,
  deleteIngresso,
  createVenda,
};