const express = require('express')
const router = express.Router()

let vagas = []
let idCounter = 1

// Listar vagas
router.get('/', (req, res) => {
  res.json(vagas)
})

// Criar vaga
router.post('/', (req, res) => {
  const { titulo, descricao, dataInicio } = req.body
  const vaga = { id: idCounter++, titulo, descricao, dataInicio }
  vagas.push(vaga)
  res.status(201).json(vaga)
})

// Excluir vaga
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  vagas = vagas.filter(v => v.id !== id)
  res.status(204).end()
})

module.exports = router
