import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Candidatos from "./pages/Candidatos";
import Vagas from "./pages/Vagas";

export default function App() {
  // Estado de login e persistência
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [candidatos, setCandidatos] = useState(() => {
    return JSON.parse(localStorage.getItem("candidatos")) || [];
  });

  const [vagas, setVagas] = useState(() => {
    return JSON.parse(localStorage.getItem("vagas")) || [];
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("candidatos", JSON.stringify(candidatos));
  }, [candidatos]);

  useEffect(() => {
    localStorage.setItem("vagas", JSON.stringify(vagas));
  }, [vagas]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    // localStorage.clear(); // opcional: limpar tudo ao sair
  };

  // Renderiza a página de login se não estiver logado
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
        <Link to="/" style={{ textDecoration: "none" }}>
          Início
        </Link>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/candidatos" style={{ textDecoration: "none" }}>
          Candidatos
        </Link>
        <Link to="/vagas" style={{ textDecoration: "none" }}>
          Vagas
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/dashboard"
          element={<Dashboard candidatos={candidatos} vagas={vagas} />}
        />
        <Route
          path="/candidatos"
          element={<Candidatos candidatos={candidatos} setCandidatos={setCandidatos} />}
        />
        <Route
          path="/vagas"
          element={<Vagas vagas={vagas} setVagas={setVagas} />}
        />
      </Routes>
    </div>
  );
}
