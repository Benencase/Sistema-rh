import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Candidatos from "./pages/Candidatos";
import Vagas from "./pages/Vagas";

function App() {
  // Carrega estado do localStorage, ou usa valor padrão
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [currentPage, setCurrentPage] = useState("dashboard");

  const [candidatos, setCandidatos] = useState(() => {
    return JSON.parse(localStorage.getItem("candidatos")) || [];
  });

  const [vagas, setVagas] = useState(() => {
    return JSON.parse(localStorage.getItem("vagas")) || [];
  });

  // Sempre que mudar isLoggedIn, salva no localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Salva candidatos no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("candidatos", JSON.stringify(candidatos));
  }, [candidatos]);

  // Salva vagas no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("vagas", JSON.stringify(vagas));
  }, [vagas]);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    // Se quiser limpar os dados ao sair, descomente abaixo:
    // localStorage.clear();
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
