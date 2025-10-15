<<<<<<< HEAD
import React, { useState, useEffect } from "react";

function Vagas({ vagas, setVagas }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");

  // Carregar vagas do localStorage quando o componente monta
  useEffect(() => {
    const vagasSalvas = localStorage.getItem("vagas");
    if (vagasSalvas) {
      setVagas(JSON.parse(vagasSalvas));
    }
  }, [setVagas]);

  // Salvar vagas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("vagas", JSON.stringify(vagas));
  }, [vagas]);

  const adicionarVaga = () => {
    if (!titulo.trim() || !descricao.trim() || !dataInicio.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    const nova = {
      id: Date.now(),
      titulo,
      descricao,
      dataInicio,
    };

    setVagas([...vagas, nova]);

    setTitulo("");
    setDescricao("");
    setDataInicio("");
  };

  const excluirVaga = (id) => {
    if (window.confirm("Excluir vaga?")) {
      setVagas(vagas.filter((v) => v.id !== id));
    }
=======
import React, { useState, useEffect } from 'react';

export default function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [novaVaga, setNovaVaga] = useState({
    titulo: '',
    descricao: '',
    dataInicioPlanejada: '',
    escolaridade: '',
    estado: '',
    cidade: '',
    status: 'não selecionado',
  });

  useEffect(() => {
    // Puxe as vagas do backend, se existir essa API
    fetch('http://localhost:5000/vagas')
      .then(res => res.json())
      .then(data => setVagas(data))
      .catch(() => setVagas([])); // fallback
  }, []);

  const criarVaga = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!novaVaga.titulo || !novaVaga.descricao) {
      alert('Preencha título e descrição');
      return;
    }

    const res = await fetch('http://localhost:5000/vagas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaVaga),
    });

    if (res.ok) {
      const vagaCriada = await res.json();
      setVagas([...vagas, vagaCriada]);
      setNovaVaga({
        titulo: '',
        descricao: '',
        dataInicioPlanejada: '',
        escolaridade: '',
        estado: '',
        cidade: '',
        status: 'não selecionado',
      });
    } else {
      alert('Erro ao criar vaga');
    }
  };

  const excluirVaga = (id) => {
    // Aqui você deve chamar API DELETE para remover do backend
    setVagas(vagas.filter(v => v.id !== id));
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
  };

  return (
    <div>
<<<<<<< HEAD
      <h2>💼 Vagas ({vagas.length})</h2>

      <div
        style={{
          marginBottom: "1rem",
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: 8,
        }}
      >
        <h3>Criar Nova Vaga</h3>
        <input
          placeholder="Título da Vaga"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ marginRight: 8, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ marginRight: 8, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          style={{ marginRight: 8, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <button
          onClick={adicionarVaga}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Criar
        </button>
      </div>

      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse", borderRadius: 8, overflow: "hidden" }}
      >
        <thead style={{ backgroundColor: "#f3f4f6" }}>
=======
      <h2>Vagas</h2>

      <table border="1" cellPadding={5} style={{ marginTop: 10, width: '100%' }}>
        <thead>
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
          <tr>
            <th>Título da Vaga</th>
            <th>Descrição</th>
            <th>Data Planejada de Início</th>
<<<<<<< HEAD
=======
            <th>Escolaridade</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Status</th>
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
          {vagas.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Nenhuma vaga cadastrada.
              </td>
            </tr>
          )}
          {vagas.map((vaga) => (
            <tr key={vaga.id}>
              <td>{vaga.titulo}</td>
              <td>{vaga.descricao}</td>
              <td>{vaga.dataInicio}</td>
              <td>
                <button
                  onClick={() => excluirVaga(vaga.id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
=======
          {vagas.map(v => (
            <tr key={v.id}>
              <td>{v.titulo}</td>
              <td>{v.descricao}</td>
              <td>{v.dataInicioPlanejada}</td>
              <td>{v.escolaridade}</td>
              <td>{v.estado}</td>
              <td>{v.cidade}</td>
              <td>{v.status}</td>
              <td>
                <button onClick={() => excluirVaga(v.id)}>Excluir</button>
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
    </div>
  );
}

export default Vagas;
=======

      <h3>Criar Nova Vaga</h3>
      <form onSubmit={criarVaga} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Título da Vaga"
          value={novaVaga.titulo}
          onChange={e => setNovaVaga({ ...novaVaga, titulo: e.target.value })}
          required
        />
        <textarea
          placeholder="Descrição"
          value={novaVaga.descricao}
          onChange={e => setNovaVaga({ ...novaVaga, descricao: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Data Planejada de Início"
          value={novaVaga.dataInicioPlanejada}
          onChange={e => setNovaVaga({ ...novaVaga, dataInicioPlanejada: e.target.value })}
        />
        <input
          type="text"
          placeholder="Escolaridade"
          value={novaVaga.escolaridade}
          onChange={e => setNovaVaga({ ...novaVaga, escolaridade: e.target.value })}
        />
        <input
          type="text"
          placeholder="Estado"
          value={novaVaga.estado}
          onChange={e => setNovaVaga({ ...novaVaga, estado: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={novaVaga.cidade}
          onChange={e => setNovaVaga({ ...novaVaga, cidade: e.target.value })}
        />
        <select
          value={novaVaga.status}
          onChange={e => setNovaVaga({ ...novaVaga, status: e.target.value })}
        >
          <option value="não selecionado">Não Selecionado</option>
          <option value="em andamento">Em Andamento</option>
          <option value="contratado">Contratado</option>
          <option value="não apto no momento">Não Apto no Momento</option>
        </select>

        <button type="submit" style={{ marginTop: 10 }}>Criar Vaga</button>
      </form>
    </div>
  );
}
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
