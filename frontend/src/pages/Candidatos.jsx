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
    "Auto Desenvolvimento",
  ];

  const handleNotaChange = (i, valor) => {
    const novasNotas = [...(avaliacao?.notas || Array(fatores.length).fill(""))];
    novasNotas[i] = valor;
    setAvaliacao({ ...avaliacao, notas: novasNotas });
  };

  const somaTotal = (avaliacao?.notas || [])
    .map((n) => parseInt(n) || 0)
    .reduce((a, b) => a + b, 0);

  const media = fatores.length > 0 ? (somaTotal / fatores.length).toFixed(2) : "0.00";

  return (
    <div
      style={{
        marginTop: 20,
        gridColumn: "1 / 3",
        background: "#f0f0f0",
        padding: 15,
        borderRadius: 8,
      }}
    >
      <h3>Avaliação Comportamental</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
              Fatores
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px", width: 120 }}>
              Nota (1 a 5)
            </th>
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
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 16 }}>
        <strong>Soma Total:</strong> {somaTotal} <br />
        <strong>Média:</strong> {media}
      </div>
    </div>
  );
}

function Curriculo({ candidatos, setCandidatos, editarCandidato }) {
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

  const handleExcluir = (id) => {
    if (window.confirm("Deseja realmente excluir este candidato?")) {
      setCandidatos((old) => old.filter((c) => c.id !== id));
    }
  };

  const handleEnvioCurriculo = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCandidatos((old) =>
        old.map((c) =>
          c.id === id ? { ...c, curriculo: reader.result, nomeArquivoCurriculo: file.name } : c
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h3>Lista de Candidatos</h3>
      {candidatos.length === 0 && <p>Nenhum candidato cadastrado ainda.</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {candidatos.map((c) => {
          const somaTotal =
            c.avaliacao?.notas?.reduce((a, b) => a + (parseInt(b) || 0), 0) || 0;
          const media = c.avaliacao?.notas?.length
            ? (somaTotal / c.avaliacao.notas.length).toFixed(2)
            : "0.00";

          return (
            <li
              key={c.id}
              style={{
                marginBottom: 20,
                padding: 20,
                border: "1px solid #ddd",
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  paddingBottom: 10,
                  marginBottom: 10,
                }}
              >
                <div>
                  <h4 style={{ margin: 0 }}>
                    {c.nome} {c.sobrenome}
                  </h4>
                  <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                    Vaga: **{c.vaga}** | Status: **{c.status}**
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => editarCandidato(c)}
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(c.id)}
                    style={{
                      marginLeft: 10,
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <p style={{ margin: "0 0 5px 0" }}>
                  **Cidade:** {c.estado} - {c.cidade}
                </p>
                {c.curriculo ? (
                  <p style={{ margin: "0 0 5px 0" }}>
                    **Currículo:**{" "}
                    <a href={c.curriculo} target="_blank" rel="noopener noreferrer">
                      {c.nomeArquivoCurriculo || "Arquivo"}
                    </a>
                  </p>
                ) : (
                  <p style={{ margin: "0 0 5px 0" }}>**Currículo:** Sem arquivo enviado.</p>
                )}
                <label style={{ display: "block", marginTop: 10 }}>
                  Enviar currículo (PDF/DOC):
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleEnvioCurriculo(c.id, e)}
                    style={{ marginLeft: 5 }}
                  />
                </label>
              </div>

              {c.avaliacao && (
                <div
                  style={{
                    marginTop: 15,
                    borderTop: "1px solid #eee",
                    paddingTop: 15,
                  }}
                >
                  <h5 style={{ margin: "0 0 10px 0" }}>Avaliação Comportamental</h5>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "0.9em",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#f8f9fa" }}>
                        <th style={{ border: "1px solid #dee2e6", padding: "8px", textAlign: "left" }}>Fator</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "8px", textAlign: "center", width: "80px" }}>Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fatores.map((fator, idx) => (
                        <tr key={idx}>
                          <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>{fator}</td>
                          <td style={{ border: "1px solid #dee2e6", padding: "8px", textAlign: "center" }}>
                            {c.avaliacao.notas?.[idx] || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ margin: "0 0 5px 0" }}>**Soma Total:** {somaTotal}</p>
                    <p style={{ margin: "0 0 0 0" }}>**Média:** {media}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
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
  const [observacoesEntrevista, setObservacoesEntrevista] = useState("");
  const [novaVaga, setNovaVaga] = useState("");
  const [novoStatus, setNovoStatus] = useState("Não selecionado");
  const [previewFoto, setPreviewFoto] = useState(null);
  const [novaFoto, setNovaFoto] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
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
    setObservacoesEntrevista("");
    setNovaVaga("");
    setNovoStatus("Não selecionado");
    setPreviewFoto(null);
    setNovaFoto(null);
    setEditandoId(null);
    setFormacaoAcademica("");
    setTelefone("");
    setEndereco("");
    setCep("");
    setEstadoCivil("");
    setGenero("M");
    setExperiencia("");
    setAvaliacao(null);
  };

  const salvarCandidato = (e) => {
    e.preventDefault();

    if (!novoNome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    const [estado, cidade] = novaCidade.split(" - ");

    if (editandoId !== null) {
      setCandidatos((old) =>
        old.map((c) =>
          c.id === editandoId
            ? {
                ...c,
                nome: novoNome,
                sobrenome,
                cidade,
                estado,
                dataNascimento,
                observacoesEntrevista,
                vaga: novaVaga,
                status: novoStatus,
                foto: previewFoto,
                formacaoAcademica,
                telefone,
                endereco,
                cep,
                estadoCivil,
                genero,
                experiencia,
                avaliacao,
              }
            : c
        )
      );
    } else {
      const novoCandidato = {
        id: Date.now(),
        nome: novoNome,
        sobrenome,
        cidade,
        estado,
        dataNascimento,
        observacoesEntrevista,
        vaga: novaVaga,
        status: novoStatus,
        foto: previewFoto,
        formacaoAcademica,
        telefone,
        endereco,
        cep,
        estadoCivil,
        genero,
        experiencia,
        avaliacao,
      };
      setCandidatos((old) => [...old, novoCandidato]);
    }

    limparFormulario();
    setAbaAtiva("curriculo");
  };

  const editarCandidato = (candidato) => {
    setNovoNome(candidato.nome || "");
    setSobrenome(candidato.sobrenome || "");
    setNovaCidade(
      candidato.estado && candidato.cidade
        ? `${candidato.estado} - ${candidato.cidade}`
        : ""
    );
    setDataNascimento(candidato.dataNascimento || "");
    setObservacoesEntrevista(candidato.observacoesEntrevista || "");
    setNovaVaga(candidato.vaga || "");
    setNovoStatus(candidato.status || "Não selecionado");
    setPreviewFoto(candidato.foto || null);
    setNovaFoto(null);
    setEditandoId(candidato.id);
    setFormacaoAcademica(candidato.formacaoAcademica || "");
    setTelefone(candidato.telefone || "");
    setEndereco(candidato.endereco || "");
    setCep(candidato.cep || "");
    setEstadoCivil(candidato.estadoCivil || "");
    setGenero(candidato.genero || "M");
    setExperiencia(candidato.experiencia || "");
    setAvaliacao(candidato.avaliacao || null);
    setAbaAtiva("form");
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Gestão de Candidatos</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setAbaAtiva("form")}
          style={{
            marginRight: 10,
            background: abaAtiva === "form" ? "#007bff" : "#eee",
            color: abaAtiva === "form" ? "#fff" : "#000",
            border: "none",
            padding: "10px 20px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Formulário
        </button>
        <button
          onClick={() => setAbaAtiva("curriculo")}
          style={{
            background: abaAtiva === "curriculo" ? "#007bff" : "#eee",
            color: abaAtiva === "curriculo" ? "#fff" : "#000",
            border: "none",
            padding: "10px 20px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Currículos
        </button>
      </div>
      {abaAtiva === "form" && (
        <form
          onSubmit={salvarCandidato}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <div>
            <label>
              Nome: *
              <input
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Sobrenome:
              <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Cidade:
              <select
                value={novaCidade}
                onChange={(e) => setNovaCidade(e.target.value)}
              >
                <option value="">Selecione a cidade</option>
                {cidadesDoBrasil.map((cidade, idx) => (
                  <option key={idx} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Data de Nascimento:
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Observações da Entrevista:
              <textarea
                value={observacoesEntrevista}
                onChange={(e) => setObservacoesEntrevista(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Vaga:
              <input
                type="text"
                value={novaVaga}
                onChange={(e) => setNovaVaga(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <select
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
              >
                {statusOptions.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Foto:
              <input type="file" accept="image/*" onChange={handleFotoChange} />
            </label>
            {previewFoto && (
              <img
                src={previewFoto}
                alt="Pré-visualização"
                style={{ width: 100, marginTop: 10, borderRadius: 8 }}
              />
            )}
          </div>
          <div>
            <label>
              Formação Acadêmica:
              <input
                type="text"
                value={formacaoAcademica}
                onChange={(e) => setFormacaoAcademica(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Telefone:
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Endereço:
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              CEP:
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Estado Civil:
              <input
                type="text"
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Gênero:
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Experiência:
              <textarea
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
              />
            </label>
          </div>
          {/* Avaliação Comportamental */}
          <AvaliacaoEntrevista avaliacao={avaliacao} setAvaliacao={setAvaliacao} />
          <div style={{ gridColumn: "1 / 3" }}>
            <button type="submit" style={{ padding: "10px 20px", marginTop: 10 }}>
              {editandoId !== null ? "Atualizar Candidato" : "Cadastrar Candidato"}
            </button>
            {editandoId !== null && (
              <button
                type="button"
                onClick={limparFormulario}
                style={{ marginLeft: 10, padding: "10px 20px" }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}
      {abaAtiva === "curriculo" && (
        <Curriculo
          candidatos={candidatos}
          setCandidatos={setCandidatos}
          editarCandidato={editarCandidato}
        />
      )}
    </div>
  );
}

export default Candidatos;