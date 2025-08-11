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

  const somaTotal = (avaliacao?.notas || [])
    .map((n) => parseInt(n) || 0)
    .reduce((a, b) => a + b, 0);

  const media = fatores.length > 0 ? (somaTotal / fatores.length).toFixed(2) : "0.00";

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
        <strong>Soma Total:</strong> {somaTotal} <br />
        <strong>Média:</strong> {media}
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
  const [novaVaga, setNovaVaga] = useState("");
  const [novoStatus, setNovoStatus] = useState("Não selecionado");
  const [previewFoto, setPreviewFoto] = useState(null);
  const [novaFoto, setNovaFoto] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [genero, setGenero] = useState("M");
  const [avaliacao, setAvaliacao] = useState(null);
  const [sobre, setSobre] = useState("");

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
    setNovaVaga("");
    setFormacaoAcademica("");
    setEmail("");
    setTelefone("");
    setEndereco("");
    setGenero("M");
    setNovoStatus("Não selecionado");
    setNovaFoto(null);
    setPreviewFoto(null);
    setEditandoId(null);
    setAvaliacao(null);
    setSobre("");
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
            ? {
                ...c,
                nome: novoNome.trim(),
                sobrenome: sobrenome.trim(),
                cidade,
                estado: uf,
                dataNascimento,
                vaga: novaVaga.trim(),
                formacaoAcademica: formacaoAcademica.trim(),
                email: email.trim(),
                telefone: telefone.trim(),
                endereco: endereco.trim(),
                genero,
                status: novoStatus,
                foto: previewFoto || c.foto,
                avaliacao: avaliacao || c.avaliacao || null,
                sobre: sobre.trim(),
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
          vaga: novaVaga.trim(),
          formacaoAcademica: formacaoAcademica.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          endereco: endereco.trim(),
          genero,
          criadoEm: new Date().toISOString().slice(0, 10),
          status: novoStatus,
          foto: previewFoto,
          avaliacao: avaliacao,
          sobre: sobre.trim(),
        },
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
    setNovaVaga(c.vaga || "");
    setFormacaoAcademica(c.formacaoAcademica || "");
    setEmail(c.email || "");
    setTelefone(c.telefone || "");
    setEndereco(c.endereco || "");
    setGenero(c.genero || "M");
    setNovoStatus(c.status || "Não selecionado");
    setPreviewFoto(c.foto || null);
    setNovaFoto(null);
    setAvaliacao(c.avaliacao || null);
    setSobre(c.sobre || "");
    setAbaAtiva("form");
  };

  const excluirCandidato = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este candidato?")) {
      setCandidatos((old) => old.filter((c) => c.id !== id));
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Gestão de Candidatos</h2>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setAbaAtiva("form")} disabled={abaAtiva === "form"} style={{ padding: "8px 16px", cursor: abaAtiva === "form" ? "default" : "pointer" }}>Formulário</button>
        <button onClick={() => setAbaAtiva("curriculo")} disabled={abaAtiva === "curriculo"} style={{ padding: "8px 16px", cursor: abaAtiva === "curriculo" ? "default" : "pointer" }}>Currículo</button>
      </div>

      {abaAtiva === "form" && (
        <div style={{ background: "#fafafa", padding: 20, borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Nome*:<br />
                <input type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
              </label>
            </div>
            <div>
              <label>Sobrenome:<br />
                <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
              </label>
            </div>
            <div>
              <label>Cidade*:<br />
                <input list="cidadesDoBrasil" value={novaCidade} onChange={(e) => setNovaCidade(e.target.value)} />
                <datalist id="cidadesDoBrasil">
                  {cidadesDoBrasil.map((c, i) => <option key={i} value={c} />)}
                </datalist>
              </label>
            </div>
            <div>
              <label>Data Nascimento:<br />
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              </label>
            </div>

            <div>
              <label>Vaga Desejada*:<br />
                <input type="text" value={novaVaga} onChange={(e) => setNovaVaga(e.target.value)} />
              </label>
            </div>

            <div>
              <label>Status:<br />
                <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                  {statusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </label>
            </div>

            <div style={{ gridColumn: "1 / 3" }}>
              <label>Foto:<br />
                <input type="file" accept="image/*" onChange={handleFotoChange} />
                {previewFoto && <img src={previewFoto} alt="preview" style={{ marginTop: 10, maxWidth: 150, borderRadius: 8 }} />}
              </label>
            </div>

            <div>
              <label>Formação Acadêmica:<br />
                <input type="text" value={formacaoAcademica} onChange={(e) => setFormacaoAcademica(e.target.value)} />
              </label>
            </div>

            <div>
              <label>Email:<br />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>

            <div>
              <label>Telefone:<br />
                <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </label>
            </div>

            <div>
              <label>Endereço:<br />
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
              </label>
            </div>

            <div>
              <label>Gênero:<br />
                <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </label>
            </div>

            <AvaliacaoEntrevista avaliacao={avaliacao} setAvaliacao={setAvaliacao} />

            <div style={{ gridColumn: "1 / 3", marginTop: 10 }}>
              <label>Sobre o Candidato:<br />
                <textarea
                  rows={4}
                  style={{ width: "100%", resize: "vertical" }}
                  value={sobre}
                  onChange={(e) => setSobre(e.target.value)}
                  placeholder="Escreva uma breve descrição sobre o candidato..."
                />
              </label>
            </div>

            <div style={{ gridColumn: "1 / 3", marginTop: 20, textAlign: "center" }}>
              <button onClick={adicionarOuAtualizarCandidato} style={{ padding: "10px 30px", fontSize: 16 }}>
                {editandoId ? "Atualizar Candidato" : "Adicionar Candidato"}
              </button>
              {editandoId && (
                <button onClick={limparFormulario} style={{ marginLeft: 10, padding: "10px 30px", fontSize: 16 }}>
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {abaAtiva === "curriculo" && (
        <div>
          {candidatos.length === 0 && <p>Nenhum candidato cadastrado.</p>}
          {candidatos.map((c) => (
            <div
              key={c.id}
              style={{
                marginBottom: 20,
                padding: 15,
                border: "1px solid #ddd",
                borderRadius: 10,
                display: "flex",
                gap: 15,
                alignItems: "center",
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              {c.foto ? (
                <img
                  src={c.foto}
                  alt={`${c.nome} ${c.sobrenome}`}
                  style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#666",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  ?
                </div>
              )}
              <div style={{ flex: 1 }}>
                <strong>{c.nome} {c.sobrenome}</strong><br />
                <small>{c.estado} - {c.cidade}</small><br />
                <small>Data Nasc.: {c.dataNascimento}</small><br />
                <small>Vaga Desejada: {c.vaga}</small><br />
                <small>Status: {c.status}</small><br />
                <small>Formação Acadêmica: {c.formacaoAcademica}</small><br />
                <small>Email: {c.email}</small><br />
                <small>Telefone: {c.telefone}</small><br />
                <small>Endereço: {c.endereco}</small><br />
                <small>Gênero: {c.genero === "M" ? "Masculino" : c.genero === "F" ? "Feminino" : "Outro"}</small><br />

                {c.avaliacao && (
                  <div style={{ marginTop: 8, padding: 8, background: "#eef", borderRadius: 6 }}>
                    <strong>Avaliação Comportamental:</strong>
                    <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                      {(c.avaliacao.notas || []).map((nota, idx) => (
                        <li key={idx}>
                          {[
                            "Postura", "Comunicação", "Habilidade Profissional", "Comprometimento",
                            "Capacidade de Adaptação", "Iniciativa / Liderança", "Comportamento Ético",
                            "Maturidade Emocional", "Motivação para o Trabalho", "Serenidade Aparente",
                            "Assertividade", "Organização", "Auto Desenvolvimento"
                          ][idx]}: {nota}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {c.sobre && (
                  <div style={{ marginTop: 8, padding: 8, background: "#f7f7f7", borderRadius: 6, whiteSpace: "pre-wrap" }}>
                    <strong>Sobre o Candidato:</strong>
                    <p>{c.sobre}</p>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => editarCandidato(c)} style={{ padding: "6px 12px", cursor: "pointer" }}>
                  Editar
                </button>
                <button onClick={() => excluirCandidato(c.id)} style={{ padding: "6px 12px", backgroundColor: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" }}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Candidatos;
