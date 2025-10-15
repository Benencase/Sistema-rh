import React, { useState, useEffect, useRef } from 'react';

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [filtroCidade, setFiltroCidade] = useState('');
  const [novoCandidato, setNovoCandidato] = useState({
    nome: '',
    cidade: '',
    sobre: '',
    vaga: '',
    status: 'não selecionado', // mantém o valor inicial
    foto: null,
    curriculo: null,
  });

  const fotoInputRef = useRef(null);
  const curriculoInputRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/candidatos')
      .then(res => res.json())
      .then(data => setCandidatos(data))
      .catch(() => setCandidatos([]));
  }, []);

  const candidatosFiltrados = candidatos.filter(c =>
    c.cidade?.toLowerCase().includes(filtroCidade.toLowerCase())
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNovoCandidato({ ...novoCandidato, [name]: value });
  };

  const handleFileChange = e => {
    const { name } = e.target;
    const file = e.target.files[0];
    setNovoCandidato({ ...novoCandidato, [name]: file });
  };

  const adicionarCandidato = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', novoCandidato.nome);
    formData.append('cidade', novoCandidato.cidade);
    formData.append('sobre', novoCandidato.sobre);
    formData.append('vaga', novoCandidato.vaga);
    formData.append('status', novoCandidato.status);
    if (novoCandidato.foto) formData.append('foto', novoCandidato.foto);
    if (novoCandidato.curriculo) formData.append('curriculo', novoCandidato.curriculo);

    try {
      const res = await fetch('http://localhost:5000/candidatos', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert(`Erro ao adicionar candidato: ${errorText}`);
        return;
      }

      const candidatoCriado = await res.json();
      setCandidatos([...candidatos, candidatoCriado]);

      setNovoCandidato({
        nome: '',
        cidade: '',
        sobre: '',
        vaga: '',
        status: 'não selecionado', // mantém "Não Selecionado" após reset
        foto: null,
        curriculo: null,
      });
      if (fotoInputRef.current) fotoInputRef.current.value = null;
      if (curriculoInputRef.current) curriculoInputRef.current.value = null;
    } catch (error) {
      console.error(error);
      alert('Erro inesperado ao adicionar candidato');
    }
  };

  const removerCandidato = async id => {
    if (!window.confirm('Confirma remoção do candidato?')) return;

    try {
      const res = await fetch(`http://localhost:5000/candidatos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCandidatos(candidatos.filter(c => c.id !== id));
      } else {
        alert('Erro ao remover candidato');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de rede ao remover candidato');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Candidatos</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          Filtrar por Cidade:{' '}
          <input
            type="text"
            value={filtroCidade}
            onChange={e => setFiltroCidade(e.target.value)}
            placeholder="Digite a cidade"
          />
        </label>
      </div>

      <table border="1" cellPadding={5} style={{ width: '100%', marginBottom: 30 }}>
        <thead>
          <tr>
            <th>Foto 3x4</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Sobre</th>
            <th>Criado Em</th>
            <th>Vaga</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatosFiltrados.map(c => (
            <tr key={c.id}>
              <td>
                {c.foto ? (
                  <img
                    src={`http://localhost:5000/uploads/${c.foto}`}
                    alt="Foto 3x4"
                    style={{ width: 60, height: 80, objectFit: 'cover' }}
                  />
                ) : (
                  'Sem foto'
                )}
              </td>
              <td>{c.nome}</td>
              <td>{c.cidade}</td>
              <td>{c.sobre}</td>
              <td>{new Date(c.criadoEm).toLocaleDateString()}</td>
              <td>{c.vaga}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => removerCandidato(c.id)}>Remover</button>
              </td>
            </tr>
          ))}
          {candidatosFiltrados.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                Nenhum candidato encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Adicionar Novo Candidato</h3>
      <form onSubmit={adicionarCandidato} style={{ maxWidth: 500, display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoCandidato.nome}
          onChange={handleInputChange}
          required
          style={{ marginBottom: 10 }}
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={novoCandidato.cidade}
          onChange={handleInputChange}
          required
          style={{ marginBottom: 10 }}
        />
        <textarea
          name="sobre"
          placeholder="Sobre"
          value={novoCandidato.sobre}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <input
          type="text"
          name="vaga"
          placeholder="Vaga"
          value={novoCandidato.vaga}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <select
          name="status"
          value={novoCandidato.status}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        >
          <option value="não selecionado">Não Selecionado</option>
          <option value="em andamento">Em Andamento</option>
          <option value="contratado">Contratado</option>
          <option value="não apto no momento">Não Apto no Momento</option>
          <option value="desistiu da vaga">Desistiu da vaga</option> {/* nova opção */}
        </select>

        <label>
          Foto 3x4 (jpg/png):
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
            ref={fotoInputRef}
            style={{ marginBottom: 10 }}
          />
        </label>

        <label>
          Currículo (PDF):
          <input
            type="file"
            name="curriculo"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={curriculoInputRef}
            style={{ marginBottom: 10 }}
          />
        </label>

        <button type="submit" style={{ marginTop: 10 }}>
          Adicionar Candidato
        </button>
      </form>
    </div>
  );
}
