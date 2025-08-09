import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Candidatos from "./pages/Candidatos";
import Vagas from "./pages/Vagas";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Estado dos candidatos
  const [candidatos, setCandidatos] = useState([]);

  // Estado das vagas
  const [vagas, setVagas] = useState([]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={handleLogout}
        style={{ float: "right", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Sair
      </button>

      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setCurrentPage("dashboard")}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: currentPage === "dashboard" ? "#007bff" : "#eee",
            color: currentPage === "dashboard" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            fontWeight: currentPage === "dashboard" ? "bold" : "normal",
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentPage("candidatos")}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: currentPage === "candidatos" ? "#007bff" : "#eee",
            color: currentPage === "candidatos" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            fontWeight: currentPage === "candidatos" ? "bold" : "normal",
          }}
        >
          Candidatos
        </button>
        <button
          onClick={() => setCurrentPage("vagas")}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: currentPage === "vagas" ? "#007bff" : "#eee",
            color: currentPage === "vagas" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            fontWeight: currentPage === "vagas" ? "bold" : "normal",
          }}
        >
          Vagas
        </button>
      </nav>

      <div style={{ clear: "both" }}>
        {currentPage === "dashboard" && (
          <Dashboard candidatos={candidatos} vagas={vagas} />
        )}
        {currentPage === "candidatos" && (
          <Candidatos candidatos={candidatos} setCandidatos={setCandidatos} />
        )}
        {currentPage === "vagas" && <Vagas vagas={vagas} setVagas={setVagas} />}
      </div>
    </div>
  );
}

export default App;
