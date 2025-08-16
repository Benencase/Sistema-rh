import React, { useState } from "react";

function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [vaga, setVaga] = useState("");
  const [status, setStatus] = useState("");
  const [avaliacaoComportamental, setAvaliacaoComportamental] = useState({
    postura: 0,
    comunicacao: 0,
    proatividade: 0,
    trabalhoEquipe: 0,
    pontualidade: 0,
    adaptabilidade: 0,
    criatividade: 0,
    lideranca: 0
  });

  const adicionarCandidato = () => {
    if (!nome || !email) return;
    const novoCandidato = {
      id: Date.now(),
      nome,
      email,
      cidade,
      vaga,
      status,
      avaliacaoComportamental
    };
    setCandidatos([...candidatos, novoCandidato]);
    setNome("");
    setEmail("");
    setCidade("");
    setVaga("");
    setStatus("");
    setAvaliacaoComportamental({
      postura: 0,
      comunicacao: 0,
      proatividade: 0,
      trabalhoEquipe: 0,
      pontualidade: 0,
      adaptabilidade: 0,
      criatividade: 0,
      lideranca: 0
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h2>Cadastrar Candidato</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Cidade</label>
          <input value={cidade} onChange={(e) => setCidade(e.target.value)} />
        </div>
        <div>
          <label>Vaga</label>
          <input value={vaga} onChange={(e) => setVaga(e.target.value)} />
        </div>
        <div>
          <label>Status</label>
          <input value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>

        {/* Avaliação Comportamental */}
        <div style={{ gridColumn: "1 / span 2" }}>
          <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>Avaliação Comportamental</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              "postura",
              "comunicacao",
              "proatividade",
              "trabalhoEquipe",
              "pontualidade",
              "adaptabilidade",
              "criatividade",
              "lideranca"
            ].map((campo) => (
              <div key={campo}>
                <label style={{ textTransform: "capitalize" }}>{campo} (1-4)</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={avaliacaoComportamental[campo] || 0}
                  onChange={(e) =>
                    setAvaliacaoComportamental({
                      ...avaliacaoComportamental,
                      [campo]: e.target.value
                    })
                  }
                />
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 10 }}>
            Total: {Object.values(avaliacaoComportamental).reduce((a, b) => a + Number(b || 0), 0)}
          </p>
        </div>
      </div>

      <button
        onClick={adicionarCandidato}
        style={{ marginTop: 10, padding: "0.5rem 1rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: 5 }}
      >
        Adicionar Candidato
      </button>

      {/* Tabela dos candidatos */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Candidatos Cadastrados</h3>
        <table
          border="1"
          cellPadding="5"
          style={{ width: "100%", borderCollapse: "collapse", borderRadius: 8, overflow: "hidden" }}
        >
          <thead style={{ backgroundColor: "#f3f4f6" }}>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cidade</th>
              <th>Vaga</th>
              <th>Status</th>
              <th>Avaliação Comportamental</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Nenhum candidato cadastrado.
                </td>
              </tr>
            )}
            {candidatos.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.email}</td>
                <td>{c.cidade}</td>
                <td>{c.vaga || "—"}</td>
                <td>{c.status}</td>
                <td>
                  {Object.entries(c.avaliacaoComportamental)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ")}{" "}
                  (Total: {Object.values(c.avaliacaoComportamental).reduce((a, b) => a + Number(b || 0), 0)})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidatos;
