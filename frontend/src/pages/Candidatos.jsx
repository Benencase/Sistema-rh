import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'align': [] }],
  ['clean']
];

const capitaisBrasil = [
  "Rio Branco", "Maceió", "Macapá", "Manaus", "Salvador", "Fortaleza", "Brasília",
  "Vitória", "Goiânia", "São Luís", "Cuiabá", "Campo Grande", "Belo Horizonte",
  "Belém", "João Pessoa", "Curitiba", "Recife", "Teresina", "Rio de Janeiro",
  "Natal", "Porto Alegre", "Boa Vista", "Florianópolis", "São Paulo", "Aracaju",
  "Palmas"
];

function Editor({ label, value, setValue }) {
  return (
    <div style={{ gridColumn: "1 / span 2", marginBottom: 20 }}>
      <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>{label}</h4>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
        style={{ height: 150, borderRadius: 6, background: "#fff", border: "1px solid #ccc" }}
      />
    </div>
  );
}

function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("form");

  const [novoNome, setNovoNome] = useState("");
  const [novoSobrenome, setNovoSobrenome] = useState("");
  const [cidade, setCidade] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [novoStatus, setNovoStatus] = useState("Aguardando");
  const [novaVaga, setNovaVaga] = useState("");
  const [formacao, setFormacao] = useState("");
  const [telefoneDDD, setTelefoneDDD] = useState("");
  const [telefoneNumero, setTelefoneNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [genero, setGenero] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [avaliacaoComportamental, setAvaliacaoComportamental] = useState({
    fator1: 0,
    fator2: 0,
    fator3: 0,
    fator4: 0
  });
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [curriculo, setCurriculo] = useState(null);

  const statusOptions = ["Aguardando", "Aprovado", "Reprovado"];
  const generoOptions = ["Masculino", "Feminino", "Outro"];

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreviewFoto(URL.createObjectURL(file));
  };

  const extrairDadosPDF = (file) => {
    setCurriculo(URL.createObjectURL(file));
  };

  const handleAvaliacaoChange = (fator, value) => {
    setAvaliacaoComportamental(prev => ({
      ...prev,
      [fator]: Number(value)
    }));
  };

  const somaComportamental = Object.values(avaliacaoComportamental).reduce((a, b) => a + b, 0);

  const adicionarCandidato = () => {
    const id = Date.now();
    setCandidatos([...candidatos, {
      id, nome: novoNome, sobrenome: novoSobrenome, cidade,
      nascimento, status: novoStatus, vaga: novaVaga, formacao,
      telefoneDDD, telefoneNumero, endereco, genero,
      avaliacao, avaliacaoComportamental,
      somaComportamental,
      foto, curriculo
    }]);

    // Resetar formulário
    setNovoNome(""); setNovoSobrenome(""); setCidade(""); setNascimento("");
    setNovoStatus("Aguardando"); setNovaVaga(""); setFormacao("");
    setTelefoneDDD(""); setTelefoneNumero(""); setEndereco(""); setGenero("");
    setAvaliacao(""); setAvaliacaoComportamental({ fator1:0, fator2:0, fator3:0, fator4:0 });
    setFoto(null); setPreviewFoto(null); setCurriculo(null);
  };

  const excluirCandidato = (id) => {
    setCandidatos(candidatos.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Gestão de Candidatos</h2>

      <div style={{ marginBottom: 12, textAlign: "center" }}>
        <button onClick={() => setAbaAtiva("form")} disabled={abaAtiva === "form"}>Formulário</button>
        <button onClick={() => setAbaAtiva("curriculo")} disabled={abaAtiva === "curriculo"} style={{ marginLeft: 8 }}>Currículo</button>
      </div>

      {abaAtiva === "form" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "#fafafa", padding: 20, borderRadius: 10 }}>
          <input placeholder="Nome" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
          <input placeholder="Sobrenome" value={novoSobrenome} onChange={(e) => setNovoSobrenome(e.target.value)} />
          <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
            <option value="">Selecione a Cidade</option>
            {capitaisBrasil.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
          <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
            {statusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input placeholder="Vaga Desejada" value={novaVaga} onChange={(e) => setNovaVaga(e.target.value)} />
          <input placeholder="Formação Acadêmica" value={formacao} onChange={(e) => setFormacao(e.target.value)} />
          <div style={{ display: "flex", gap: "8px" }}>
            <input placeholder="DDD" value={telefoneDDD} onChange={(e) => setTelefoneDDD(e.target.value)} style={{ width: 50 }} />
            <input placeholder="Número" value={telefoneNumero} onChange={(e) => setTelefoneNumero(e.target.value)} />
          </div>
          <input placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Selecione o gênero</option>
            {generoOptions.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>

          <div style={{ gridColumn: "1 / span 2" }}>
            <h4>Avaliação Comportamental (1 a 4)</h4>
            {["fator1","fator2","fator3","fator4"].map((fator) => (
              <div key={fator} style={{ marginBottom: 5 }}>
                <label>{fator.toUpperCase()}: </label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={avaliacaoComportamental[fator]}
                  onChange={(e) => handleAvaliacaoChange(fator, e.target.value)}
                  style={{ width: 50 }}
                />
              </div>
            ))}
            <p><strong>Soma:</strong> {somaComportamental}</p>
          </div>

          <Editor label="Descrição da Entrevista" value={avaliacao} setValue={setAvaliacao} />

          <div style={{ marginTop: 20 }}>
            <input type="file" accept="image/*" onChange={handleFotoChange} />
            {previewFoto && <img src={previewFoto} alt="Preview" style={{ maxWidth: 150, borderRadius: 8, marginTop: 10 }} />}
          </div>

          <input type="file" accept="application/pdf" onChange={(e) => extrairDadosPDF(e.target.files[0])} />

          <button onClick={adicionarCandidato} style={{ gridColumn: "1 / span 2", marginTop: 10 }}>Adicionar Candidato</button>
        </div>
      )}

      {abaAtiva === "curriculo" && (
        <div style={{ marginTop: 20 }}>
          {candidatos.length === 0 && <p>Nenhum candidato cadastrado.</p>}
          {candidatos.map((candidato) => (
            <div key={candidato.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10, borderRadius: 8 }}>
              <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>{candidato.nome} {candidato.sobrenome}</h4>
              <p style={{ textAlign: "center" }}>{candidato.cidade}</p>
              <p style={{ textAlign: "center" }}>Gênero: {candidato.genero}</p>
              <p style={{ textAlign: "center" }}>Status: {candidato.status}</p>

              <div style={{ marginBottom: 10 }}>
                <h5>Avaliação Comportamental</h5>
                {["fator1","fator2","fator3","fator4"].map((f) => (
                  <p key={f}>{f.toUpperCase()}: {candidato.avaliacaoComportamental[f]}</p>
                ))}
                <p><strong>Soma:</strong> {candidato.somaComportamental}</p>
              </div>

              <div>
                <h5>Descrição da Entrevista</h5>
                <div dangerouslySetInnerHTML={{ __html: candidato.avaliacao }} style={{ background: "#f9f9f9", padding: 10, borderRadius: 6 }} />
              </div>

              {candidato.foto && <img src={URL.createObjectURL(candidato.foto)} alt="Foto" style={{ maxWidth: 100, borderRadius: 8, marginTop: 5 }} />}
              {candidato.curriculo && <a href={candidato.curriculo} target="_blank" rel="noreferrer">Abrir Currículo</a>}

              <button onClick={() => excluirCandidato(candidato.id)} style={{ marginTop: 10 }}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Candidatos;
