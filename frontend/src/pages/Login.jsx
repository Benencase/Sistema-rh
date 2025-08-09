import React, { useState } from "react";
import axios from "axios";

// A URL do servidor é definida por uma variável de ambiente do Vite
// Em desenvolvimento, usa localhost:3001. Em produção, usa a URL do Render.
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function Login({ onLogin }) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    if (!key.trim()) {
      setError("Digite a chave.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Agora usa a variável BASE_URL
      const res = await axios.post(`${BASE_URL}/auth`, { key });
      if (res.data.valid) {
        onLogin(res.data.expiresAt);
      } else {
        setError("❌ Chave inválida.");
      }
    } catch (err) {
      setError("⚠️ Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: "2rem", fontSize: "0.9rem", textAlign: "center" }}>
        <h2>🔐 Login com Chave</h2>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Digite sua chave"
          disabled={loading}
          autoFocus
          style={{ padding: "0.5rem", fontSize: "0.9rem", width: "200px" }}
        />
        <br />
        <button
          onClick={login}
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;