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
  };

  return (
    <div>
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
          <tr>
            <th>Título da Vaga</th>
            <th>Descrição</th>
            <th>Data Planejada de Início</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vagas;
