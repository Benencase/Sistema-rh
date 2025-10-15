const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// A chave agora é lida de uma variável de ambiente.
// Use "12345678" apenas em desenvolvimento local.
const CHAVE_FIXA = process.env.CHAVE_FIXA || "12345678";

// Importa as rotas de candidatos, vagas e autenticação
const candidatosRoutes = require('./routes/candidatos');
const vagasRoutes = require('./routes/vagas');
const authRoutes = require('./routes/auth');

// Importa o middleware de autenticação
const verifyToken = require('./middleware/auth');

// Configuração do CORS para liberar apenas o seu frontend no Render
app.use(cors({
  origin: 'https://frontend-0pg4.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve arquivos estáticos da pasta 'uploads' na rota /uploads
app.use('/uploads', express.static('uploads'));

// Usa as rotas públicas
app.use('/candidatos', candidatosRoutes);
app.use('/auth', authRoutes);

// Usa rota de vagas protegida por token
app.use('/vagas', verifyToken, vagasRoutes);

// Rota raiz só para teste do servidor
app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

// Servir frontend em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Chave atual: ${CHAVE_FIXA}`);
});
