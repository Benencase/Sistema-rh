import React, { useState, useEffect } from "react";

export default function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [novaVaga, setNovaVaga] = useState({
    titulo: "",
    descricao: "",
    dataInicioPlanejada: "",
    escolaridade: "",
    estado: "",
    cidade: "",
    status: "não selecionado",
  });

  // Carregar vagas do backend ou localStorage
  useEffect(() => {
    const vagasSalvas = localStorage.getItem("vagas");
    if (vagasSalvas) {
      setVagas(JSON.parse(vagasSalvas));
    } else {
      // Caso exista backend, poderia fazer fetch aqui
      setVagas([]);
    }
  }, []);

  // Salvar vagas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("vagas", JSON.stringify(vagas));
  }, [vagas]);

  const criarVaga = (e) => {
    e.preventDefault();

    if (!novaVaga.titulo.trim() || !novaVaga.descricao.trim()) {
      alert("Preencha título e descrição");
      return;
    }

    const vaga = { ...novaVaga, id: Date.now() };
    setVagas([...vagas, vaga]);

    setNovaVaga({
      titulo: "",
      descricao: "",
      dataInicioPlanejada: "",
      escolaridade: "",
      estado: "",
      cidade: "",
      status: "não selecionado",
    });
  };

  const excluirVaga = (id) => {
    if (window.confirm("Excluir vaga?")) {
      setVagas(vagas.filter((v) => v.id !== id));
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>💼 Vagas ({vagas.length})</h2>

      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}
      >
        <thead style={{ backgroundColor: "#f3f4f6" }}>
          <tr>
            <th>Título da Vaga</th>
            <th>Descrição</th>
            <th>Data Planejada de Início</th>
            <th>Escolaridade</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vagas.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Nenhuma vaga cadastrada.
              </td>
            </tr>
          )}
          {vagas.map((v) => (
            <tr key={v.id}>
              <td>{v.titulo}</td>
              <td>{v.descricao}</td>
              <td>{v.dataInicioPlanejada}</td>
              <td>{v.escolaridade}</td>
              <td>{v.estado}</td>
              <td>{v.cidade}</td>
              <td>{v.status}</td>
              <td>
                <button
                  onClick={() => excluirVaga(v.id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Criar Nova Vaga</h3>
      <form
        onSubmit={criarVaga}
        style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}
      >
        <input
          type="text"
          placeholder="Título da Vaga"
          value={novaVaga.titulo}
          onChange={(e) => setNovaVaga({ ...novaVaga, titulo: e.target.value })}
          required
          style={{ marginBottom: 8, padding: 6 }}
        />
        <textarea
          placeholder="Descrição"
          value={novaVaga.descricao}
          onChange={(e) => setNovaVaga({ ...novaVaga, descricao: e.target.value })}
          required
          style={{ marginBottom: 8, padding: 6 }}
        />
        <input
          type="date"
          placeholder="Data Planejada de Início"
          value={novaVaga.dataInicioPlanejada}
          onChange={(e) =>
            setNovaVaga({ ...novaVaga, dataInicioPlanejada: e.target.value })
          }
          style={{ marginBottom: 8, padding: 6 }}
        />
        <input
          type="text"
          placeholder="Escolaridade"
          value={novaVaga.escolaridade}
          onChange={(e) => setNovaVaga({ ...novaVaga, escolaridade: e.target.value })}
          style={{ marginBottom: 8, padding: 6 }}
        />
        <input
          type="text"
          placeholder="Estado"
          value={novaVaga.estado}
          onChange={(e) => setNovaVaga({ ...novaVaga, estado: e.target.value })}
          style={{ marginBottom: 8, padding: 6 }}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={novaVaga.cidade}
          onChange={(e) => setNovaVaga({ ...novaVaga, cidade: e.target.value })}
          style={{ marginBottom: 8, padding: 6 }}
        />
        <select
          value={novaVaga.status}
          onChange={(e) => setNovaVaga({ ...novaVaga, status: e.target.value })}
          style={{ marginBottom: 8, padding: 6 }}
        >
          <option value="não selecionado">Não Selecionado</option>
          <option value="em andamento">Em Andamento</option>
          <option value="contratado">Contratado</option>
          <option value="não apto no momento">Não Apto no Momento</option>
        </select>
        <button type="submit" style={{ padding: 8, backgroundColor: "#3b82f6", color: "#fff" }}>
          Criar Vaga
        </button>
      </form>
    </div>
  );
}
