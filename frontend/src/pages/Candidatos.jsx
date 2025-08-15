import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AvaliacaoEntrevista({ avaliacao, setAvaliacao }) {
  const fatores = [
    "Postura",
    "Comunicação",
    "Habilidade Profissional",
    "Comprometimento",
    "Capacidade de Adaptação",
    "Iniciativa / Liderança",
    "Comportamento Ético",
    "Maturidade Emocional",
    "Motivação para o Trabalho",
    "Serenidade Aparente",
    "Assertividade",
    "Organização",
    "Auto Desenvolvimento",
  ];

  const handleNotaChange = (i, valor) => {
    const novasNotas = [...(avaliacao?.notas || Array(fatores.length).fill(""))];
    novasNotas[i] = valor;
    setAvaliacao({ ...avaliacao, notas: novasNotas });
  };

  return (
    <div style={{ marginTop: 20, background: "#f4f4f4", padding: 15, borderRadius: 8 }}>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>Avaliação Comportamental</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Fatores</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px", width: 120 }}>Nota (1 a 5)</th>
          </tr>
        </thead>
        <tbody>
          {fatores.map((fator, i) => (
            <tr key={i}>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{fator}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px", textAlign: "center" }}>
                <select
                  value={avaliacao?.notas?.[i] || ""}
                  onChange={(e) => handleNotaChange(i, e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="">Selecione</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Candidatos() {
  const [candidatos, setCandidatos] = useState(() => {
    const saved = localStorage.getItem("candidatos");
    return saved ? JSON.parse(saved) : [];
  });
  const [abaAtiva, setAbaAtiva] = useState("form");

  const [novoNome, setNovoNome] = useState("");
  const [novoSobrenome, setNovoSobrenome] = useState("");
  const [novaCidade, setNovaCidade] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [novoStatus, setNovoStatus] = useState("Não selecionado");
  const [novaVaga, setNovaVaga] = useState("");
  const [formacao, setFormacao] = useState("");
  const [telefoneDDD, setTelefoneDDD] = useState("");
  const [telefoneNumero, setTelefoneNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [genero, setGenero] = useState("");
  const [sobre, setSobre] = useState("");
  const [curriculoFile, setCurriculoFile] = useState(null);
  const [avaliacao, setAvaliacao] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  const statusOptions = [
    "Não selecionado",
    "Em andamento",
    "Contratado",
    "Não apto no momento",
  ];

  useEffect(() => {
    localStorage.setItem("candidatos", JSON.stringify(candidatos));
  }, [candidatos]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const extrairDadosPDF = async (file) => {
    setCurriculoFile(file);
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let textoCompleto = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      textoCompleto += textContent.items.map((item) => item.str).join(" ") + " ";
    }
    setNovoNome(textoCompleto.match(/Nome:\s*(.*)/)?.[1] || "");
    setNovaCidade(textoCompleto.match(/Cidade:\s*(.*)/)?.[1] || "");
    setNovaVaga(textoCompleto.match(/Vaga:\s*(.*)/)?.[1] || "");
  };

  const adicionarCandidato = () => {
    if (!novoNome.trim() || !novaCidade.trim()) {
      alert("Preencha Nome e Cidade");
      return;
    }
    const novoCandidato = {
      id: Date.now(),
      nome: novoNome,
      sobrenome: novoSobrenome,
      cidade: novaCidade,
      nascimento,
      status: novoStatus,
      vaga: novaVaga,
      formacao,
      telefone: `(${telefoneDDD}) ${telefoneNumero}`,
      endereco,
      genero,
      sobre,
      avaliacao,
      foto: previewFoto,
      curriculo: curriculoFile ? URL.createObjectURL(curriculoFile) : null,
    };
    setCandidatos((old) => [...old, novoCandidato]);
    limparFormulario();
  };

  const limparFormulario = () => {
    setNovoNome("");
    setNovoSobrenome("");
    setNovaCidade("");
    setNascimento("");
    setNovoStatus("Não selecionado");
    setNovaVaga("");
    setFormacao("");
    setTelefoneDDD("");
    setTelefoneNumero("");
    setEndereco("");
    setGenero("");
    setSobre("");
    setCurriculoFile(null);
    setAvaliacao(null);
    setPreviewFoto(null);
  };

  const excluirCandidato = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este candidato?")) {
      setCandidatos((old) => old.filter((c) => c.id !== id));
    }
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
          <input placeholder="Cidade" value={novaCidade} onChange={(e) => setNovaCidade(e.target.value)} />
          <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
          <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
            {statusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input placeholder="Vaga Desejada" value={novaVaga} onChange={(e) => setNovaVaga(e.target.value)} />
          <input placeholder="Formação Acadêmica" value={formacao} onChange={(e) => setFormacao(e.target.value)} />
          <div style={{ display: "flex", gap: "8px" }}>
            <input placeholder="DDD" value={telefoneDDD} onChange={(e) => setTelefoneDDD(e.target.value.replace(/\D/g, ""))} style={{ width: "60px" }} />
            <input placeholder="Número" value={telefoneNumero} onChange={(e) => setTelefoneNumero(e.target.value.replace(/\D/g, ""))} />
          </div>
          <input placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
          {previewFoto && <img src={previewFoto} alt="preview" style={{ maxWidth: 150, marginTop: 8 }} />}
          <AvaliacaoEntrevista avaliacao={avaliacao} setAvaliacao={setAvaliacao} />
          <div style={{ gridColumn: "1 / 3" }}>
            <label>Sobre o candidato:</label>
            <ReactQuill value={sobre} onChange={setSobre} />
          </div>
          <button onClick={adicionarCandidato} style={{ gridColumn: "1 / 3", padding: 10, background: "#333", color: "#fff" }}>Adicionar</button>
        </div>
      )}

      {abaAtiva === "curriculo" && (
        <div>
          <h3>Enviar Currículo PDF</h3>
          <input type="file" accept="application/pdf" onChange={(e) => e.target.files[0] && extrairDadosPDF(e.target.files[0])} />
          {curriculoFile && (
            <a href={URL.createObjectURL(curriculoFile)} download="curriculo.pdf" style={{ display: "block", marginTop: 10 }}>
              📥 Baixar Currículo
            </a>
          )}
        </div>
      )}

      <h3 style={{ marginTop: 20, textAlign: "center" }}>Lista de Candidatos</h3>
      <ul>
        {candidatos.map((c) => (
          <li key={c.id} style={{ marginBottom: 10 }}>
            <strong style={{ textTransform: "uppercase" }}>{c.nome} {c.sobrenome}</strong> - {c.vaga} - {c.cidade} - Status: {c.status}
            {c.curriculo && <a href={c.curriculo} download="curriculo.pdf" style={{ marginLeft: 10 }}>📥</a>}
            <button style={{ marginLeft: 10 }} onClick={() => excluirCandidato(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Candidatos;
