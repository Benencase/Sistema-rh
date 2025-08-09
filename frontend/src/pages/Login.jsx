import React, { useState } from "react";
import axios from "axios";

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
      const res = await axios.post("http://localhost:3001/auth", { key });
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
