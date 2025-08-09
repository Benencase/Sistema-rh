import React, { useState } from "react";

function Candidatos({ candidatos, setCandidatos }) {
  const [abaAtiva, setAbaAtiva] = useState("form"); // form ou curriculo

  // Dados formulário geral
  const [novoNome, setNovoNome] = useState("");
  const [novaCidade, setNovaCidade] = useState("");
  const [novoSobre, setNovoSobre] = useState("");
  const [novaVaga, setNovaVaga] = useState("");
  const [novoStatus, setNovoStatus] = useState("Não selecionado");
  const [previewFoto, setPreviewFoto] = useState(null);
  const [novaFoto, setNovaFoto] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [observacoes, setObservacoes] = useState("");

  // Dados currículo complementares
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [genero, setGenero] = useState("M");
  const [experiencia, setExperiencia] = useState("");

  const statusOptions = [
    "Não selecionado",
    "Em andamento",
    "Contratado",
    "Não apto no momento",
  ];

  const cidadesDoBrasil = [
    "AC - Rio Branco",
    "AL - Maceió",
    "AP - Macapá",
    "AM - Manaus",
    "BA - Salvador",
    "CE - Fortaleza",
    "DF - Brasília",
    "ES - Vitória",
    "GO - Goiânia",
    "MA - São Luís",
    "MT - Cuiabá",
    "MS - Campo Grande",
    "MG - Belo Horizonte",
    "PA - Belém",
    "PB - João Pessoa",
    "PR - Curitiba",
    "PE - Recife",
    "PI - Teresina",
    "RJ - Rio de Janeiro",
    "RN - Natal",
    "RS - Porto Alegre",
    "RO - Porto Velho",
    "RR - Boa Vista",
    "SC - Florianópolis",
    "SP - São Paulo",
    "SE - Aracaju",
    "TO - Palmas",
  ];

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
  };

  const adicionarOuAtualizarCandidato = () => {
    if (!novoNome.trim() || !novaCidade.trim() || !novaVaga.trim()) {
      alert("Nome, Cidade e Vaga desejada são obrigatórios.");
      return;
    }

    if (!cidadesDoBrasil.some((c) => c === novaCidade || c.endsWith(novaCidade))) {
      alert(
        "Por favor, escolha uma cidade válida no formato 'UF - Cidade' ou deixe somente a cidade sem o UF."
      );
      return;
    }

    const [uf, cidade] = novaCidade.includes(" - ")
      ? novaCidade.split(" - ")
      : ["", novaCidade];

    if (editandoId) {
      setCandidatos((old) =>
        old.map((c) =>
          c.id === editandoId
            ? {
                ...c,
                nome: novoNome.trim(),
                sobrenome: sobrenome.trim(),
                cidade,
                estado: uf,
                dataNascimento,
                sobre: novoSobre.trim(),
                vaga: novaVaga.trim(),
                formacaoAcademica: formacaoAcademica.trim(),
                email: email.trim(),
                telefone: telefone.trim(),
                endereco: endereco.trim(),
                cep: cep.trim(),
                estadoCivil: estadoCivil.trim(),
                genero,
                experiencia: experiencia.trim(),
                status: novoStatus,
                foto: previewFoto || c.foto,
                observacoes: observacoes.trim(),
              }
            : c
        )
      );
    } else {
      setCandidatos((old) => [
        ...old,
        {
          id: Date.now(),
          nome: novoNome.trim(),
          sobrenome: sobrenome.trim(),
          cidade,
          estado: uf,
          dataNascimento,
          sobre: novoSobre.trim(),
          vaga: novaVaga.trim(),
          formacaoAcademica: formacaoAcademica.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          endereco: endereco.trim(),
          cep: cep.trim(),
          estadoCivil: estadoCivil.trim(),
          genero,
          experiencia: experiencia.trim(),
          criadoEm: new Date().toISOString().slice(0, 10),
          status: novoStatus,
          foto: previewFoto,
          observacoes: observacoes.trim(),
        },
      ]);
    }

    limparFormulario();
    setAbaAtiva("form");
  };

  const editarCandidato = (c) => {
    setEditandoId(c.id);
    setNovoNome(c.nome || "");
    setSobrenome(c.sobrenome || "");
    setNovaCidade(
      c.estado && c.cidade ? `${c.estado} - ${c.cidade}` : c.cidade || ""
    );
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
  };

  const excluirCandidato = (id) => {
    if (window.confirm("Excluir candidato?")) {
      setCandidatos((old) => old.filter((c) => c.id !== id));
      if (editandoId === id) limparFormulario();
    }
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "2rem auto",
        padding: "1rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
        fontSize: 14,
        lineHeight: 1.4,
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>👥 Candidatos</h2>

      <div
        style={{
          background: "#f9f9f9",
          padding: "1rem 1.5rem",
          borderRadius: 10,
          boxShadow: "0 6px 18px -4px rgba(0,0,0,0.1)",
          marginBottom: "1.5rem",
        }}
      >
        {/* Abas */}
        <div style={{ marginBottom: 20, display: "flex", gap: 15 }}>
          <button
            onClick={() => setAbaAtiva("form")}
            style={abaAtiva === "form" ? activeTabStyle : inactiveTabStyle}
          >
            Formulário
          </button>
          <button
            onClick={() => setAbaAtiva("curriculo")}
            style={abaAtiva === "curriculo" ? activeTabStyle : inactiveTabStyle}
          >
            Currículo
          </button>
        </div>

        {/* Conteúdo das abas */}
        {abaAtiva === "form" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            <div>
              <input
                placeholder="Nome *"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                style={inputStyle}
              />
              <input
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
                <option value="">Cidade *</option>
                {cidadesDoBrasil.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                style={inputStyle}
                placeholder="Data de nascimento"
              />
              <textarea
                placeholder="Sobre"
                value={novoSobre}
                onChange={(e) => setNovoSobre(e.target.value)}
                style={{ ...inputStyle, height: 80 }}
              />
              <input
                placeholder="Vaga desejada *"
                value={novaVaga}
                onChange={(e) => setNovaVaga(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <textarea
                placeholder="Formação acadêmica"
                value={formacaoAcademica}
                onChange={(e) => setFormacaoAcademica(e.target.value)}
                style={{ ...inputStyle, height: 70 }}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Estado Civil"
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
                style={inputStyle}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 5,
                }}
              >
                <label>
                  <input
                    type="radio"
                    checked={genero === "M"}
                    onChange={() => setGenero("M")}
                  />
                  Masculino
                </label>
                <label>
                  <input
                    type="radio"
                    checked={genero === "F"}
                    onChange={() => setGenero("F")}
                  />
                  Feminino
                </label>
              </div>

              <textarea
                placeholder="Experiência profissional"
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                style={{ ...inputStyle, height: 70 }}
              />

              <select
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
                style={{ ...inputStyle, marginTop: 10 }}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Observações */}
              <div style={{ marginTop: 10 }}>
                <label style={{ display: "block", fontWeight: "600" }}>
                  Observações
                </label>
                <textarea
                  placeholder="Notas sobre o candidato"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  style={{ ...inputStyle, height: 80 }}
                />
              </div>

              {/* Foto + currículo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginTop: 15,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <label
                    htmlFor="inputFoto3x4"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#3b82f6",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: 6,
                      fontWeight: "600",
                      userSelect: "none",
                    }}
                  >
                    Adicionar Foto 3x4
                  </label>
                  <input
                    id="inputFoto3x4"
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    style={{ display: "none" }}
                  />
                  {previewFoto && (
                    <img
                      src={previewFoto}
                      alt="Preview"
                      style={{
                        width: 60,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                      }}
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inputCurriculo"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#22c55e",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: 6,
                      fontWeight: "600",
                      userSelect: "none",
                    }}
                  >
                    Adicionar Currículo
                  </label>
                  <input
                    id="inputCurriculo"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {abaAtiva === "curriculo" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "1rem",
              boxShadow: "0 6px 18px -4px rgba(0,0,0,0.1)",
              marginBottom: 20,
            }}
          >
            <p>
              Use a aba Formulário para adicionar ou editar os dados do candidato,
              incluindo foto 3x4 e currículo. A lista de candidatos está abaixo.
            </p>
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <button
            onClick={adicionarOuAtualizarCandidato}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 18px",
              fontWeight: "600",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            {editandoId ? "Atualizar Candidato" : "Adicionar Candidato"}
          </button>
          {editandoId && (
            <button
              onClick={limparFormulario}
              style={{
                marginLeft: 12,
                backgroundColor: "#ef4444",
                color: "white",
                padding: "12px 18px",
                fontWeight: "600",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </div>

      {/* Lista de candidatos sempre visível */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: "1rem",
          boxShadow: "0 6px 18px -4px rgba(0,0,0,0.1)",
        }}
      >
        {candidatos.length === 0 && <p>Nenhum candidato cadastrado.</p>}
        {candidatos.map((c) => (
          <div
            key={c.id}
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: 12,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            {c.foto && (
              <img
                src={c.foto}
                alt={`${c.nome} ${c.sobrenome}`}
                style={{
                  width: 60,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <strong>
                {c.nome} {c.sobrenome}
              </strong>{" "}
              - {c.estado ? `${c.estado} - ` : ""}
              {c.cidade}
              <br />
              <em>Vaga:</em> {c.vaga}
              <br />
              <em>Status:</em>{" "}
              <span
                style={{
                  color:
                    c.status === "Contratado"
                      ? "green"
                      : c.status === "Não apto no momento"
                      ? "red"
                      : c.status === "Em andamento"
                      ? "orange"
                      : "gray",
                  fontWeight: "600",
                }}
              >
                {c.status}
              </span>
              {c.observacoes && (
                <>
                  <br />
                  <div style={{ marginTop: 4 }}>
                    <strong>Observações:</strong>{" "}
                    <span style={{ display: "inline-block", maxWidth: 300, whiteSpace: "pre-wrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {c.observacoes.length > 120
                        ? c.observacoes.slice(0, 117) + "..."
                        : c.observacoes}
                    </span>
                  </div>
                </>
              )}
            </div>
            <button onClick={() => editarCandidato(c)} style={btnEditStyle}>
              Editar
            </button>
            <button onClick={() => excluirCandidato(c.id)} style={btnDelStyle}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos reutilizáveis
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  boxSizing: "border-box",
};

const activeTabStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 6,
  fontWeight: "600",
  cursor: "pointer",
  border: "none",
};

const inactiveTabStyle = {
  backgroundColor: "#e5e7eb",
  color: "#333",
  padding: "8px 16px",
  borderRadius: 6,
  fontWeight: "600",
  cursor: "pointer",
  border: "none",
};

const btnEditStyle = {
  backgroundColor: "#fbbf24",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "600",
};

const btnDelStyle = {
  backgroundColor: "#ef4444",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "600",
  color: "#fff",
  marginLeft: 8,
};

export default Candidatos;
