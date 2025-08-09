const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const CHAVE_FIXA = "12345678";

app.use(cors());
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

// Adicione este código para servir os arquivos estáticos do frontend em produção
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}

// O servidor agora usa a porta do ambiente de produção (RENDER) ou a porta 3001 localmente
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Chave atual: ${CHAVE_FIXA}`);
});