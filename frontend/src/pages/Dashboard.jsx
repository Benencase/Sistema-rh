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
