import React, { useState, useEffect } from "react";

function Candidatos() {
  // Inicializa do localStorage ou começa com array vazio
  const [candidatos, setCandidatos] = useState(() => {
    const saved = localStorage.getItem("candidatos");
    return saved ? JSON.parse(saved) : [];
  });

  const [abaAtiva, setAbaAtiva] = useState("form"); // form ou curriculo

  // Dados formulário geral
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
  const [novaAvaliacao, setNovaAvaliacao] = useState(""); // avaliação comportamental

  // Dados currículo complementares
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

  // SALVA no localStorage sempre que candidatos mudar
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
    setNovaAvaliacao(""); // limpar avaliação
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
                avaliacaoComportamental: novaAvaliacao.trim(), // salva avaliação
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
          avaliacaoComportamental: novaAvaliacao.trim(), // salva avaliação
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
    setNovaAvaliacao(c.avaliacaoComportamental || ""); // carrega avaliação
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
              gap: 15,
              marginBottom: 10,
            }}
          >
            {/* Dados básicos */}
            <input
              type="text"
              placeholder="Nome*"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
            <select
              value={novaCidade}
              onChange={(e) => setNovaCidade(e.target.value)}
            >
              <option value="">Escolha a cidade*</option>
              {cidadesDoBrasil.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Data de nascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <textarea
              placeholder="Sobre (breve descrição)"
              value={novoSobre}
              onChange={(e) => setNovoSobre(e.target.value)}
              rows={3}
              style={{ gridColumn: "1 / 3" }}
            />
            <input
              type="text"
              placeholder="Vaga desejada*"
              value={novaVaga}
              onChange={(e) => setNovaVaga(e.target.value)}
            />
            <textarea
              placeholder="Observações"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              style={{ gridColumn: "1 / 3" }}
            />
            <textarea
              placeholder="Avaliação Comportamental"
              value={novaAvaliacao}
              onChange={(e) => setNovaAvaliacao(e.target.value)}
              rows={3}
              style={{ gridColumn: "1 / 3" }}
            />
            <select
              value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value)}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div>
              <input type="file" onChange={handleFotoChange} />
              {previewFoto && (
                <img
                  src={previewFoto}
                  alt="Preview"
                  style={{ maxWidth: 120, marginTop: 5, borderRadius: 6 }}
                />
              )}
            </div>
            <button
              style={{ gridColumn: "1 / 3" }}
              onClick={adicionarOuAtualizarCandidato}
            >
              {editandoId ? "Atualizar" : "Adicionar"} candidato
            </button>
            {editandoId && (
              <button
                style={{ gridColumn: "1 / 3", backgroundColor: "#999" }}
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}
          </div>
        )}

        {abaAtiva === "curriculo" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 15,
              marginBottom: 10,
            }}
          >
            <input
              type="text"
              placeholder="Formação Acadêmica"
              value={formacaoAcademica}
              onChange={(e) => setFormacaoAcademica(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <input
              type="text"
              placeholder="Estado civil"
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value)}
            />
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              style={{ gridColumn: "1 / 2" }}
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <textarea
              placeholder="Experiência profissional"
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
              rows={3}
              style={{ gridColumn: "1 / 3" }}
            />
          </div>
        )}
      </div>

      <h3>Candidatos cadastrados</h3>
      {candidatos.length === 0 && <p>Nenhum candidato cadastrado ainda.</p>}
      {candidatos.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 15,
            marginBottom: 15,
            display: "flex",
            gap: 15,
            alignItems: "center",
          }}
        >
          <img
            src={c.foto || "https://via.placeholder.com/80x80?text=Foto"}
            alt={c.nome}
            style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: 18 }}>
              {c.nome} {c.sobrenome}
            </div>
            <div>
              {c.estado} - {c.cidade}
            </div>
            <div>Vaga: {c.vaga}</div>
            <div>Status: {c.status}</div>
            <div>Avaliação: {c.avaliacaoComportamental || "Não avaliado"}</div>
            {c.observacoes && (
              <div style={{ fontStyle: "italic", color: "#555" }}>
                Observações: {c.observacoes}
              </div>
            )}
          </div>
          <div>
            <button onClick={() => editarCandidato(c)}>✏️ Editar</button>{" "}
            <button onClick={() => excluirCandidato(c.id)}>❌ Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const activeTabStyle = {
  borderBottom: "2px solid #000",
  fontWeight: "bold",
  background: "none",
  border: "none",
  cursor: "pointer",
  paddingBottom: 5,
};

const inactiveTabStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  paddingBottom: 5,
  color: "#555",
};

export default Candidatos;
