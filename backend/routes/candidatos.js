const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garantir que a pasta 'uploads' exista
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configurar multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Simulação de banco de dados em memória
const candidatos = [];

// Rota para criar candidato com upload da foto e currículo
router.post('/', upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'curriculo', maxCount: 1 }]), (req, res) => {
  const { nome, cidade, sobre, vaga, status } = req.body;

  const foto = req.files['foto'] ? req.files['foto'][0].filename : null;
  const curriculo = req.files['curriculo'] ? req.files['curriculo'][0].filename : null;

  const candidato = {
    id: candidatos.length + 1,
    nome,
    cidade,
    sobre,
    vaga,
    status,
    foto,
    curriculo,
    criadoEm: new Date()
  };

  candidatos.push(candidato);

  res.status(201).json(candidato);
});

// Rota para listar candidatos
router.get('/', (req, res) => {
  res.json(candidatos);
});

// Rota para remover candidato pelo ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = candidatos.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Candidato não encontrado' });
  }

  candidatos.splice(index, 1);

  res.status(204).end();
});

module.exports = router;
