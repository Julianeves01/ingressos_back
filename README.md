# 🎟️ API de Gestão de Ingressos

Bem-vindo à API de controle de ingressos para eventos! Essa aplicação permite criar, listar, atualizar, deletar e vender ingressos de forma eficiente e segura. 🚀

## 📁 Estrutura do Projeto

```
.
├── src
│   ├── config         # Configuração do banco de dados PostgreSQL
│   ├── controllers    # Lógica dos endpoints
│   ├── database       # Script SQL para criação das tabelas
│   ├── models         # Operações diretas com o banco
│   └── routes         # Definição das rotas da API
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## 🛠️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- Um gerenciador de pacotes como `npm` ou `yarn`
- Variáveis de ambiente para o banco de dados

---

## ⚙️ Configuração do Banco de Dados

1. Crie o banco de dados e tabelas.

2. Crie um arquivo `.env` na raiz do projeto com as credenciais:

```
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=ingressos_db
DB_PASSWORD=sua_senha
DB_PORT=sua_porta
```

---

## 📦 Instalação

Instale as dependências do projeto:

```bash
npm install
```

---

## ▶️ Executando o Servidor

Para rodar o backend em ambiente de desenvolvimento:

```bash
node server.js
```

Ou, se preferir, utilize o `nodemon` para reiniciar automaticamente:

```bash
npx nodemon server.js
```

---

## 🚪 Endpoints da API

| Método | Rota               | Descrição                        |
|--------|--------------------|----------------------------------|
| GET    | `/ingressos`       | Lista todos os ingressos;        |
| GET    | `/ingressos/:id`   | Detalha e traz um ingresso específico; |
| POST   | `/ingressos`       | Cria um novo ingresso;           |
| PUT    | `/ingressos/:id`   | Atualiza um ingresso existente;  |
| DELETE | `/ingressos/:id`   | Deleta um ingresso;              |
| POST   | `/venda`           | Realiza uma venda;               |

---


## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

---
