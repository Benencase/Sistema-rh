import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error || 'Erro ao fazer login');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Senha:
          <input 
            type="password" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
