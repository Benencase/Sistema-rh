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
  ];

  const handleNotaChange = (i, valor) => {
    const novasNotas = [...(avaliacao?.notas || Array(fatores.length).fill(""))];
    novasNotas[i] = valor;
    setAvaliacao({ ...avaliacao, notas: novasNotas });
  };

  const handleObservacoesChange = (valor) => {
    setAvaliacao({ ...avaliacao, observacoes: valor });
  };

  return (
    <div style={{ marginTop: 20, gridColumn: "1 / 3", background: "#f0f0f0", padding: 15, borderRadius: 8 }}>
      <h3>Avaliação Comportamental</h3>
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
        <label style={{ display: "block", marginBottom: 6 }}>Observações gerais:</label>
        <textarea
          rows={4}
          value={avaliacao?.observacoes || ""}
          onChange={(e) => handleObservacoesChange(e.target.value)}
          style={{ width: "100%" }}
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
                avaliacao: avaliacao || c.avaliacao || null,
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
          avaliacao: avaliacao,
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

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2>Cadastro de Candidatos</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setAbaAtiva("form")} disabled={abaAtiva === "form"}>Formulário</button>
        <button onClick={() => setAbaAtiva("curriculo")} disabled={abaAtiva === "curriculo"} style={{ marginLeft: 8 }}>Currículo</button>
      </div>

      {abaAtiva === "form" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "#fafafa", padding: 20, borderRadius: 10 }}>
          {/* Campos do formulário */}
          {/* ... mesmos campos que você já tinha ... */}

          {/* Foto */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label>
              Foto:<br />
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {previewFoto && <img src={previewFoto} alt="preview" style={{ marginTop: 10, maxWidth: 150, borderRadius: 8 }} />}
            </label>
          </div>

          {/* Avaliação Comportamental */}
          <AvaliacaoEntrevista avaliacao={avaliacao} setAvaliacao={setAvaliacao} />

          {/* Botões */}
          <div style={{ gridColumn: "1 / 3", marginTop: 20 }}>
            <button onClick={adicionarOuAtualizarCandidato}>
              {editandoId ? "Atualizar Candidato" : "Adicionar Candidato"}
            </button>
            {editandoId && <button onClick={limparFormulario} style={{ marginLeft: 10 }} type="button">Cancelar</button>}
          </div>
        </div>
      )}

      {abaAtiva === "curriculo" && (
        <div>
          <h3>Lista de Candidatos</h3>
          {candidatos.length === 0 && <p>Nenhum candidato cadastrado ainda.</p>}
          <ul>
            {candidatos.map((c) => (
              <li key={c.id} style={{ marginBottom: 12 }}>
                <strong>{c.nome} {c.sobrenome}</strong> - {c.vaga} - Status: {c.status}
                <br />Cidade: {c.estado} - {c.cidade}
                {c.avaliacao && (
                  <div style={{ marginTop: 10 }}>
                    <strong>Avaliação Comportamental:</strong>
                    <table border="1" cellPadding="5" style={{ marginTop: 5, borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th>Fator</th>
                          <th>Nota</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
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
                        ].map((fator, idx) => (
                          <tr key={idx}>
                            <td>{fator}</td>
                            <td>{c.avaliacao.notas?.[idx] || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p><strong>Observações:</strong> {c.avaliacao.observacoes || "Nenhuma"}</p>
                  </div>
                )}
                <br />
                <button onClick={() => editarCandidato(c)}>Editar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Candidatos;
