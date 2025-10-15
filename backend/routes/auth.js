const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'teste@exemplo.com' && senha === '123456') {
    res.json({ message: 'Login realizado com sucesso!' });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

module.exports = router;
