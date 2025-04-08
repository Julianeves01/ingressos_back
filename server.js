require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ingressoRoutes = require("./src/routes/ingressoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(" 😶‍🌫️ API de ingressos está rodando");
});

app.use("/api", ingressoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🎀 Servidor rodando em http://localhost:${PORT}`);
});

