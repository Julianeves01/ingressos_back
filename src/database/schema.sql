CREATE DATABASE eventos;

\c eventos;

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

('Amanda Gomes', 'manda@gmail.com', 'Show Zé Neto e Cristiano', 'jaguariúna', '2025-09-10', 'Camarote', '250,00', 100),
('Julia neves', 'julinha@gmail.com', 'Show Henrique & Juliano', 'Piracicaba', '2025-07-15', 'Vip', '360,00', 26),
('Sophia Gomes', 'soso@gmail.com', 'Show Gusttavo Lima', 'Estádio Allianz Parque', '2025-06-20', 'Arquibancada', '389,90', 200),
