const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const CHAVE_FIXA = "12345678";

app.get('/', (req, res) => {
  res.send('API RH ativa');
});

app.post('/auth', (req, res) => {
  const { key } = req.body;

  if (key === CHAVE_FIXA) {
    const expiracao = new Date();
    expiracao.setDate(expiracao.getDate() + 30);
    return res.json({ valid: true, expiresAt: expiracao.toISOString() });
  }

  res.status(401).json({ valid: false, message: 'Chave inválida' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Chave atual: ${CHAVE_FIXA}`);
});
