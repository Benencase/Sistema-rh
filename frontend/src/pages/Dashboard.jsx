<<<<<<< HEAD
import React, { useMemo } from "react";

function Dashboard({ candidatos = [], vagas = [] }) {
  const totalCandidatos = useMemo(() => candidatos.length, [candidatos]);

  const statusCount = useMemo(() => {
    return candidatos.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});
  }, [candidatos]);

  const totalVagas = useMemo(() => vagas.length, [vagas]);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "1rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>📊 Dashboard</h2>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            flex: "1 1 220px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 10,
            padding: "1.2rem 1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 28 }}>{totalCandidatos}</h3>
          <p style={{ margin: 0, fontWeight: "bold" }}>Candidatos</p>
        </div>

        <div
          style={{
            flex: "1 1 320px",
            background: "#10b981",
            color: "#fff",
            borderRadius: 10,
            padding: "1rem 1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Status dos Candidatos</h3>
          <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
            {Object.entries(statusCount).map(([status, count]) => (
              <li key={status} style={{ marginBottom: 4 }}>
                <strong>{status}:</strong> {count}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            flex: "1 1 220px",
            background: "#f59e0b",
            color: "#fff",
            borderRadius: 10,
            padding: "1.2rem 1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 28 }}>{totalVagas}</h3>
          <p style={{ margin: 0, fontWeight: "bold" }}>Vagas</p>
        </div>
      </div>

      {/* Tabela dos candidatos, parte adicionada */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Candidatos</h3>
        <table
          border="1"
          cellPadding="5"
          style={{ width: "100%", borderCollapse: "collapse", borderRadius: 8, overflow: "hidden" }}
        >
          <thead style={{ backgroundColor: "#f3f4f6" }}>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Vaga</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Nenhum candidato cadastrado.
                </td>
              </tr>
            )}
            {candidatos.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.email}</td>
                <td>{c.status}</td>
                <td>{c.vaga || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
=======
import React, { useState, useEffect, useRef } from 'react';

export default function Dashboard() {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [novoCandidato, setNovoCandidato] = useState({
    nome: '',
    cidade: '',
    sobre: '',
    vaga: '',
    status: 'não selecionado',
    foto: null,
    curriculo: null,
  });

  const fotoInputRef = useRef(null);
  const curriculoInputRef = useRef(null);

  // Puxa candidatos do backend
  const fetchCandidatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/candidatos');
      if (!res.ok) throw new Error('Erro ao buscar candidatos');
      const data = await res.json();
      setCandidatos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatos();
  }, []);

  // Manipula inputs texto
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNovoCandidato(prev => ({ ...prev, [name]: value }));
  };

  // Manipula input file
  const handleFileChange = e => {
    const { name } = e.target;
    const file = e.target.files[0];
    setNovoCandidato(prev => ({ ...prev, [name]: file }));
  };

  // Adiciona novo candidato
  const adicionarCandidato = async e => {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    const formData = new FormData();
    formData.append('nome', novoCandidato.nome);
    formData.append('cidade', novoCandidato.cidade);
    formData.append('sobre', novoCandidato.sobre);
    formData.append('vaga', novoCandidato.vaga);
    formData.append('status', novoCandidato.status);
    if (novoCandidato.foto) formData.append('foto', novoCandidato.foto);
    if (novoCandidato.curriculo) formData.append('curriculo', novoCandidato.curriculo);

    try {
      const res = await fetch('http://localhost:5000/candidatos', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Erro ao adicionar candidato');
      const candidatoCriado = await res.json();
      setCandidatos(prev => [...prev, candidatoCriado]);

      setNovoCandidato({
        nome: '',
        cidade: '',
        sobre: '',
        vaga: '',
        status: 'não selecionado',
        foto: null,
        curriculo: null,
      });
      if (fotoInputRef.current) fotoInputRef.current.value = null;
      if (curriculoInputRef.current) curriculoInputRef.current.value = null;
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  // Remove candidato pelo id
  const removerCandidato = async id => {
    setError(null);
    if (!window.confirm('Confirma remoção do candidato?')) return;

    try {
      const res = await fetch(`http://localhost:5000/candidatos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao remover candidato');
      setCandidatos(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard - Candidatos</h2>

      {loading && <p>Carregando candidatos...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      <table border="1" cellPadding={5} style={{ width: '100%', marginBottom: 30 }}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Sobre</th>
            <th>Vaga</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.length === 0 && !loading && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                Nenhum candidato encontrado
              </td>
            </tr>
          )}
          {candidatos.map(c => (
            <tr key={c.id}>
              <td>
                {c.foto ? (
                  <img
                    src={`http://localhost:5000/uploads/${c.foto}`}
                    alt="Foto 3x4"
                    style={{ width: 60, height: 80, objectFit: 'cover' }}
                  />
                ) : (
                  'Sem foto'
                )}
              </td>
              <td>{c.nome}</td>
              <td>{c.cidade}</td>
              <td>{c.sobre}</td>
              <td>{c.vaga}</td>
              <td>{c.status}</td>
              <td>{c.criadoEm ? new Date(c.criadoEm).toLocaleDateString() : 'Data indisponível'}</td>
              <td>
                <button onClick={() => removerCandidato(c.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Adicionar Novo Candidato</h3>
      <form
        onSubmit={adicionarCandidato}
        style={{ maxWidth: 500, display: 'flex', flexDirection: 'column' }}
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoCandidato.nome}
          onChange={handleInputChange}
          required
          style={{ marginBottom: 10 }}
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={novoCandidato.cidade}
          onChange={handleInputChange}
          required
          style={{ marginBottom: 10 }}
        />
        <textarea
          name="sobre"
          placeholder="Sobre"
          value={novoCandidato.sobre}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <input
          type="text"
          name="vaga"
          placeholder="Vaga"
          value={novoCandidato.vaga}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <select
          name="status"
          value={novoCandidato.status}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        >
          <option value="não selecionado">Não Selecionado</option>
          <option value="em andamento">Em Andamento</option>
          <option value="contratado">Contratado</option>
          <option value="não apto no momento">Não Apto no Momento</option>
        </select>

        <label>
          Foto 3x4 (jpg/png):
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
            ref={fotoInputRef}
            style={{ marginBottom: 10 }}
          />
        </label>

        <label>
          Currículo (PDF):
          <input
            type="file"
            name="curriculo"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={curriculoInputRef}
            style={{ marginBottom: 10 }}
          />
        </label>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Adicionar Candidato'}
        </button>
      </form>
    </div>
  );
}
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
