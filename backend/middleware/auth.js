module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token n�o fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Espera "Bearer <token>"

  // Aqui voc� valida o token de verdade; por enquanto s� um exemplo fixo:
  if (token === 'seu-token-de-exemplo') {
    next();
  } else {
    res.status(403).json({ error: 'Token inv�lido' });
  }
}
