const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// A chave agora é lida de uma variável de ambiente.
// Use "12345678" apenas em desenvolvimento local.
const CHAVE_FIXA = process.env.CHAVE_FIXA || "12345678";

// Configuração do CORS para liberar apenas o seu frontend no Render
app.use(cors({
  origin: 'https://frontend-0pg4.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

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

// Servir frontend em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Chave atual: ${CHAVE_FIXA}`);
});
