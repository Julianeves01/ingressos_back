CREATE DATABASE festivais_db;

\c festivais_db;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco,  quantidade_disponivel) VALUES
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'Camarote', 250.00, 100),
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'VIP', 360.00, 26),
('Show Henrique & Juliano', 'jaguariuna', '2025-09-10', 'Arquibancada', 389.90, 200);

