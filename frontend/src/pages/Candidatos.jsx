import React, { useState, useEffect } from "react";

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
    "Auto Desenvolvimento"
  ];

  const handleNotaChange = (i, valor) => {
    const novasNotas = [...(avaliacao?.notas || Array(fatores.length).fill(""))];
    novasNotas[i] = valor;
    setAvaliacao({ ...avaliacao, notas: novasNotas });
  };

  const handleObservacoesChange = (valor) => {
    setAvaliacao({ ...avaliacao, observacoes: valor });
  };

  const somaTotal = (avaliacao?.notas || [])
    .map((n) => parseInt(n) || 0)
    .reduce((a, b) => a + b, 0);

  const media = fatores.length > 0 ? (somaTotal / fatores.length).toFixed(2) : "0.00";

  return (
    <div style={{
      marginTop: 20,
      background: "#f9fafb",
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginBottom: 12, color: "#2c3e50" }}>Avaliação Comportamental</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #2980b9", textAlign: "left", padding: "8px", color: "#2980b9" }}>Fatores</th>
            <th style={{ borderBottom: "2px solid #2980b9", padding: "8px", width: 120, color: "#2980b9" }}>Nota (1 a 5)</th>
          </tr>
        </thead>
        <tbody>
          {fatores.map((fator, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ecf0f1" : "white" }}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px", fontWeight: "500" }}>{fator}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                <select
                  value={avaliacao?.notas?.[i] || ""}
                  onChange={(e) => handleNotaChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: 5,
                    border: "1px solid #ccc",
                    fontSize: 14,
                    cursor: "pointer"
                  }}
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

      <div style={{ marginTop: 16, fontSize: 15, color: "#34495e" }}>
        <strong>Soma Total:</strong> {somaTotal} <br />
        <strong>Média:</strong> {media}
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: "600", color: "#34495e" }}>Observações gerais:</label>
        <textarea
          rows={4}
          value={avaliacao?.observacoes || ""}
          onChange={(e) => handleObservacoesChange(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 14,
            resize: "vertical",
            fontFamily: "inherit"
          }}
          placeholder="Escreva observações aqui..."
        />
      </div>
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
  const [sobrenome, setSobrenome] = useState("");
  const [novaCidade, setNovaCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [novoSobre, setNovoSobre] = useState("");
  const [novaVaga, setNovaVaga] = useState("");
  const [novoStatus, setNovoStatus] = useState("Não selecionado");
  const [previewFoto, setPreviewFoto] = useState(null);
  const [novaFoto, setNovaFoto] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [observacoes, setObservacoes] = useState("");
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [genero, setGenero] = useState("M");
  const [experiencia, setExperiencia] = useState("");
  const [avaliacao, setAvaliacao] = useState(null);

  const statusOptions = [
    "Não selecionado",
    "Em andamento",
    "Contratado",
    "Não apto no momento",
  ];

  const cidadesDoBrasil = [
    "AC - Rio Branco","AL - Maceió","AP - Macapá","AM - Manaus","BA - Salvador","CE - Fortaleza",
    "DF - Brasília","ES - Vitória","GO - Goiânia","MA - São Luís","MT - Cuiabá","MS - Campo Grande",
    "MG - Belo Horizonte","PA - Belém","PB - João Pessoa","PR - Curitiba","PE - Recife","PI - Teresina",
    "RJ - Rio de Janeiro","RN - Natal","RS - Porto Alegre","RO - Porto Velho","RR - Boa Vista","SC - Florianópolis",
    "SP - São Paulo","SE - Aracaju","TO - Palmas"
  ];

  useEffect(() => {
    localStorage.setItem("candidatos", JSON.stringify(candidatos));
  }, [candidatos]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNovaFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFoto(reader.result);
      reader.readAsDataURL(file);
    } else {
      setNovaFoto(null);
      setPreviewFoto(null);
      alert("Por favor, envie um arquivo de imagem válido.");
    }
  };

  const limparFormulario = () => {
    setNovoNome("");
    setSobrenome("");
    setNovaCidade("");
    setDataNascimento("");
    setNovoSobre("");
    setNovaVaga("");
    setFormacaoAcademica("");
    setEmail("");
    setTelefone("");
    setEndereco("");
    setCep("");
    setEstadoCivil("");
    setGenero("M");
    setExperiencia("");
    setNovoStatus("Não selecionado");
    setNovaFoto(null);
    setPreviewFoto(null);
    setEditandoId(null);
    setObservacoes("");
    setAvaliacao(null);
  };

  const adicionarOuAtualizarCandidato = () => {
    if (!novoNome.trim() || !novaCidade.trim() || !novaVaga.trim()) {
      alert("Nome, Cidade e Vaga desejada são obrigatórios.");
      return;
    }

    if (!cidadesDoBrasil.some((c) => c === novaCidade || c.endsWith(novaCidade))) {
      alert("Escolha uma cidade válida no formato 'UF - Cidade' ou somente a cidade.");
      return;
    }

    const [uf, cidade] = novaCidade.includes(" - ") ? novaCidade.split(" - ") : ["", novaCidade];

    if (editandoId) {
      setCandidatos((old) =>
        old.map((c) =>
          c.id === editandoId
            ? { ...c, nome: novoNome.trim(), sobrenome: sobrenome.trim(), cidade, estado: uf, dataNascimento,
                sobre: novoSobre.trim(), vaga: novaVaga.trim(), formacaoAcademica: formacaoAcademica.trim(),
                email: email.trim(), telefone: telefone.trim(), endereco: endereco.trim(), cep: cep.trim(),
                estadoCivil: estadoCivil.trim(), genero, experiencia: experiencia.trim(), status: novoStatus,
                foto: previewFoto || c.foto, observacoes: observacoes.trim(),
                avaliacao: avaliacao || c.avaliacao || null }
            : c
        )
      );
    } else {
      setCandidatos((old) => [
        ...old,
        { id: Date.now(), nome: novoNome.trim(), sobrenome: sobrenome.trim(), cidade, estado: uf,
          dataNascimento, sobre: novoSobre.trim(), vaga: novaVaga.trim(), formacaoAcademica: formacaoAcademica.trim(),
          email: email.trim(), telefone: telefone.trim(), endereco: endereco.trim(), cep: cep.trim(),
          estadoCivil: estadoCivil.trim(), genero, experiencia: experiencia.trim(), criadoEm: new Date().toISOString().slice(0, 10),
          status: novoStatus, foto: previewFoto, observacoes: observacoes.trim(), avaliacao: avaliacao }
      ]);
    }

    limparFormulario();
    setAbaAtiva("curriculo");
  };

  const editarCandidato = (c) => {
    setEditandoId(c.id);
    setNovoNome(c.nome || "");
    setSobrenome(c.sobrenome || "");
    setNovaCidade(c.estado && c.cidade ? `${c.estado} - ${c.cidade}` : c.cidade || "");
    setDataNascimento(c.dataNascimento || "");
    setNovoSobre(c.sobre || "");
    setNovaVaga(c.vaga || "");
    setFormacaoAcademica(c.formacaoAcademica || "");
    setEmail(c.email || "");
    setTelefone(c.telefone || "");
    setEndereco(c.endereco || "");
    setCep(c.cep || "");
    setEstadoCivil(c.estadoCivil || "");
    setGenero(c.genero || "M");
    setExperiencia(c.experiencia || "");
    setNovoStatus(c.status || "Não selecionado");
    setPreviewFoto(c.foto || null);
    setNovaFoto(null);
    setObservacoes(c.observacoes || "");
    setAvaliacao(c.avaliacao || null);
    setAbaAtiva("form");
  };

  const excluirCandidato = (id) => {
    if(window.confirm("Tem certeza que deseja excluir este candidato?")) {
      setCandidatos((old) => old.filter(c => c.id !== id));
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 960, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#34495e" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#2c3e50" }}>Gestão de Candidatos</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 30 }}>
        <button
          onClick={() => setAbaAtiva("form")}
          disabled={abaAtiva === "form"}
          style={{
            padding: "10px 25px",
            fontSize: 16,
            fontWeight: "600",
            borderRadius: 8,
            border: "none",
            cursor: abaAtiva === "form" ? "default" : "pointer",
            backgroundColor: abaAtiva === "form" ? "#2980b9" : "#bdc3c7",
            color: "white",
            boxShadow: abaAtiva === "form" ? "0 4px 8px rgba(41, 128, 185, 0.5)" : "none",
            transition: "background-color 0.3s"
          }}
        >
          Formulário
        </button>
        <button
          onClick={() => setAbaAtiva("curriculo")}
          disabled={abaAtiva === "curriculo"}
          style={{
            padding: "10px 25px",
            fontSize: 16,
            fontWeight: "600",
            borderRadius: 8,
            border: "none",
            cursor: abaAtiva === "curriculo" ? "default" : "pointer",
            backgroundColor: abaAtiva === "curriculo" ? "#2980b9" : "#bdc3c7",
            color: "white",
            boxShadow: abaAtiva === "curriculo" ? "0 4px 8px rgba(41, 128, 185, 0.5)" : "none",
            transition: "background-color 0.3s"
          }}
        >
          Currículos & Candidatos
        </button>
      </div>

      {abaAtiva === "form" && (
        <div style={{
          background: "white",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginBottom: 20, color: "#34495e" }}>{editandoId ? "Editar Candidato" : "Novo Candidato"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <input
              type="text"
              placeholder="Nome"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              style={inputStyle}
            />
            <select
              value={novaCidade}
              onChange={(e) => setNovaCidade(e.target.value)}
              style={inputStyle}
            >
              <option value="">Cidade/UF</option>
              {cidadesDoBrasil.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Formação Acadêmica"
              value={formacaoAcademica}
              onChange={(e) => setFormacaoAcademica(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Estado Civil"
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value)}
              style={inputStyle}
            />

            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              style={inputStyle}
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>

            <input
              type="text"
              placeholder="Experiência"
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Vaga Desejada"
              value={novaVaga}
              onChange={(e) => setNovaVaga(e.target.value)}
              style={inputStyle}
            />

            <select
              value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value)}
              style={inputStyle}
            >
              {statusOptions.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>

            <div style={{ gridColumn: "span 2" }}>
              <label
                htmlFor="fotoUpload"
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  backgroundColor: "#2980b9",
                  color: "white",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: "600",
                  userSelect: "none"
                }}
              >
                {previewFoto ? "Alterar Foto" : "Enviar Foto"}
              </label>
              <input
                type="file"
                id="fotoUpload"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: "none" }}
              />
              {previewFoto && (
                <img
                  src={previewFoto}
                  alt="Prévia"
                  style={{ marginLeft: 15, maxHeight: 60, borderRadius: 6, verticalAlign: "middle" }}
                />
              )}
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <textarea
                placeholder="Sobre o candidato..."
                rows={4}
                value={novoSobre}
                onChange={(e) => setNovoSobre(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  fontSize: 14,
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          <AvaliacaoEntrevista avaliacao={avaliacao} setAvaliacao={setAvaliacao} />

          <div style={{ marginTop: 30, textAlign: "right" }}>
            {editandoId && (
              <button
                onClick={limparFormulario}
                style={{
                  padding: "10px 25px",
                  marginRight: 12,
                  borderRadius: 8,
                  border: "1px solid #e74c3c",
                  backgroundColor: "white",
                  color: "#e74c3c",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.3s"
                }}
              >
                Cancelar
              </button>
            )}

            <button
              onClick={adicionarOuAtualizarCandidato}
              style={{
                padding: "12px 30px",
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: 10,
                fontWeight: "700",
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 5px 12px rgba(39,174,96,0.4)",
                transition: "background-color 0.3s"
              }}
            >
              {editandoId ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </div>
      )}

      {abaAtiva === "curriculo" && (
        <div style={{ display: "grid", gap: 18 }}>
          {candidatos.length === 0 && (
            <p style={{ textAlign: "center", color: "#7f8c8d", fontStyle: "italic" }}>
              Nenhum candidato cadastrado ainda.
            </p>
          )}

          {candidatos.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 15,
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={c.foto || "https://via.placeholder.com/80x80?text=Sem+Foto"}
                alt={c.nome}
                style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginRight: 20, border: "2px solid #2980b9" }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: "#2c3e50" }}>
                  {c.nome} {c.sobrenome}
                </h3>
                <p style={{ margin: "6px 0", fontWeight: "600", color: "#2980b9" }}>
                  Vaga: {c.vaga} — Status: <span style={{ color: statusColor(c.status) }}>{c.status}</span>
                </p>
                <p style={{ margin: "6px 0", fontSize: 14, color: "#666" }}>
                  Cidade: {c.estado ? `${c.estado} - ` : ""}{c.cidade}
                </p>
                {c.email && <p style={{ margin: "4px 0", fontSize: 14, color: "#666" }}>Email: {c.email}</p>}
                {c.telefone && <p style={{ margin: "4px 0", fontSize: 14, color: "#666" }}>Telefone: {c.telefone}</p>}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => editarCandidato(c)}
                  style={btnEditarStyle}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => excluirCandidato(c.id)}
                  style={btnExcluirStyle}
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const statusColor = (status) => {
  switch (status) {
    case "Contratado": return "#27ae60";
    case "Em andamento": return "#2980b9";
    case "Não selecionado": return "#c0392b";
    case "Não apto no momento": return "#7f8c8d";
    default: return "#34495e";
  }
};

const inputStyle = {
  padding: "12px 15px",
  fontSize: 15,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const btnEditarStyle = {
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  boxShadow: "0 3px 8px rgba(52,152,219,0.5)",
  transition: "background-color 0.3s"
};

const btnExcluirStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  boxShadow: "0 3px 8px rgba(231,76,60,0.5)",
  transition: "background-color 0.3s"
};

export default Candidatos;
