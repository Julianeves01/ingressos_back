CREATE DATABASE ingressos_db;

\c ingressos;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco,  quantidade_disponivel) VALUES
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'Pista', 100.00, 06),
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'Pista VIP', 200.00, 51),
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'Camarote', 300.00, 100),
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'Arquibancada', 80.00, 0);

CREATE TABLE vendas (
    id SERIAL PRIMARY KEY,
    id_ingresso INT NOT NULL,
    quantidade INT NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ingresso) REFERENCES ingressos (id) ON DELETE CASCADE
);

