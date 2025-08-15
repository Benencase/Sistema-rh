import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Toolbar do editor
const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered'}, { list: 'bullet' }],
  [{ align: [] }],
  ['clean']
];

// Lista de capitais do Brasil
const capitaisBrasil = [
  "Rio Branco", "Maceió", "Macapá", "Manaus", "Salvador", "Fortaleza", "Brasília",
  "Vitória", "Goiânia", "São Luís", "Cuiabá", "Campo Grande", "Belo Horizonte",
  "Belém", "João Pessoa", "Curitiba", "Recife", "Teresina", "Rio de Janeiro",
  "Natal", "Porto Alegre", "Boa Vista", "Florianópolis", "São Paulo", "Aracaju",
  "Palmas"
];

// Componente do Editor
function Editor({ label, value, setValue }) {
  return (
    <div style={{ gridColumn: "1 / span 2", marginBottom: 20 }}>
      <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>{label}</h4>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
        style={{
          height: 150,
          borderRadius: 6,
          background: "#fff",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
}

function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("form");

  // Formulário
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
  const [avaliacaoComportamental, setAvaliacaoComportamental] = useState("");
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

  const handleCurriculoChange = (file) => {
    setCurriculo(URL.createObjectURL(file));
  };

  const adicionarCandidato = () => {
    const id = Date.now();
    setCandidatos([...candidatos, {
      id,
      nome: novoNome,
      sobrenome: novoSobrenome,
      cidade,
      nascimento,
      status: novoStatus,
      vaga: novaVaga,
      formacao,
      telefoneDDD,
      telefoneNumero,
      endereco,
      genero,
      avaliacao,
      avaliacaoComportamental,
      foto,
      curriculo
    }]);

    // Resetar formulário
    setNovoNome(""); setNovoSobrenome(""); setCidade(""); setNascimento("");
    setNovoStatus("Aguardando"); setNovaVaga(""); setFormacao("");
    setTelefoneDDD(""); setTelefoneNumero(""); setEndereco(""); setGenero("");
    setAvaliacao(""); setAvaliacaoComportamental(""); setFoto(null); setPreviewFoto(null); setCurriculo(null);
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

          <Editor label="Avaliação Comportamental" value={avaliacaoComportamental} setValue={setAvaliacaoComportamental} />
          <Editor label="Descrição da Entrevista" value={avaliacao} setValue={setAvaliacao} />

          <div style={{ marginTop: 20 }}>
            <input type="file" accept="image/*" onChange={handleFotoChange} />
            {previewFoto && <img src={previewFoto} alt="Preview" style={{ maxWidth: 150, borderRadius: 8, marginTop: 10 }} />}
          </div>

          <input type="file" accept="application/pdf" onChange={(e) => handleCurriculoChange(e.target.files[0])} />

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
              <div dangerouslySetInnerHTML={{ __html: candidato.avaliacaoComportamental }} style={{ marginBottom: 10 }} />
              <div dangerouslySetInnerHTML={{ __html: candidato.avaliacao }} style={{ marginBottom: 10 }} />
              {candidato.foto && <img src={candidato.foto ? URL.createObjectURL(candidato.foto) : ""} alt="Foto" style={{ maxWidth: 150, borderRadius: 8, display: "block", margin: "10px auto" }} />}
              {candidato.curriculo && (
                <iframe src={candidato.curriculo} width="100%" height="300" title="Currículo"></iframe>
              )}
              <button onClick={() => excluirCandidato(candidato.id)} style={{ display: "block", margin: "10px auto" }}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Candidatos;
