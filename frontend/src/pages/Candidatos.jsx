<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Font = Quill.import('formats/font');
Font.whitelist = ['Arial', 'sans-serif', 'serif', 'monospace'];
Quill.register(Font, true);

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
    novasNotas.splice(i, 1, valor);
    setAvaliacao({ ...avaliacao, notas: novasNotas });
  };

  const somaTotal = (avaliacao?.notas || [])
    .map((n) => parseInt(n) || 0)
    .reduce((a, b) => a + b, 0);

  const media = fatores.length > 0 ? (somaTotal / fatores.length).toFixed(2) : "0.00";

  return (
    <div style={{ marginTop: 20, gridColumn: "1 / 3", background: "#F7F9FC", padding: 15, borderRadius: 8 }}>
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
                    <option key={num} value={num}>{num}</option>
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
    "Postura","Comunicação","Habilidade Profissional","Comprometimento","Capacidade de Adaptação",
    "Iniciativa / Liderança","Comportamento Ético","Maturidade Emocional","Motivação para o Trabalho",
    "Serenidade Aparente","Assertividade","Organização","Auto Desenvolvimento",
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
          const somaTotal = c.avaliacao?.notas?.reduce((a, b) => a + (parseInt(b) || 0), 0) || 0;
          const media = c.avaliacao?.notas?.length ? (somaTotal / c.avaliacao.notas.length).toFixed(2) : "0.00";

          return (
            <li key={c.id} style={{
              marginBottom: 20, padding: 20, border: "1px solid #ddd", borderRadius: 8,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: 15
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  {c.foto && (
                    <img src={c.foto} alt="Foto do candidato" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', border: '2px solid #007bff' }} />
                  )}
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>{c.nome} {c.sobrenome}</h4>
                    <p style={{ margin: "0", color: "#666" }}>Vaga: <b>{c.vaga}</b> | Status: <b>{c.status}</b></p>
                    {c.motivoStatus && (
                      <p style={{ margin: "5px 0", color: "#b02a37" }}>
                        <strong>Motivo:</strong> {c.motivoStatus}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <button onClick={() => editarCandidato(c)} style={{ background: "#007bff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer" }}>Editar</button>
                  <button onClick={() => handleExcluir(c.id)} style={{ marginLeft: 10, background: "#dc3545", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer" }}>Excluir</button>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #dee2e6", paddingTop: 10 }}>
                <p style={{ margin: "0 0 5px 0", color: "#343A40" }}><b>Cidade:</b> {c.estado} - {c.cidade}</p>
                {c.curriculo ? (
                  <p><b>Currículo:</b> <a href={c.curriculo} target="_blank" rel="noopener noreferrer">{c.nomeArquivoCurriculo || "Arquivo"}</a></p>
                ) : (
                  <p><b>Currículo:</b> Sem arquivo enviado.</p>
                )}
                <label style={{ display: "block", marginTop: 10 }}>
                  Enviar currículo (PDF/DOC):
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleEnvioCurriculo(c.id, e)} style={{ marginLeft: 5 }} />
                </label>
              </div>

              {c.avaliacao && (
                <div style={{ marginTop: 15, borderTop: "1px solid #dee2e6", paddingTop: 15 }}>
                  <h5 style={{ margin: "0 0 10px 0", color: "#343A40" }}>Avaliação Comportamental</h5>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#F7F9FC" }}>
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
                    <p><b>Soma Total:</b> {somaTotal}</p>
                    <p><b>Média:</b> {media}</p>
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
  const [motivoStatus, setMotivoStatus] = useState("");
  const [mostrarMotivo, setMostrarMotivo] = useState(false);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [novaFoto, setNovaFoto] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [genero, setGenero] = useState("M");
  const [avaliacao, setAvaliacao] = useState(null);

  const statusOptions = ["Não selecionado","Em andamento","Contratado","Não apto no momento"];
  const cidadesDoBrasil = ["AC - Rio Branco","AL - Maceió","AP - Macapá","AM - Manaus","BA - Salvador","CE - Fortaleza","DF - Brasília","ES - Vitória","GO - Goiânia","MA - São Luís","MT - Cuiabá","MS - Campo Grande","MG - Belo Horizonte","PA - Belém","PB - João Pessoa","PR - Curitiba","PE - Recife","PI - Teresina","RJ - Rio de Janeiro","RN - Natal","RS - Porto Alegre","RO - Porto Velho","RR - Boa Vista","SC - Florianópolis","SP - São Paulo","SE - Aracaju","TO - Palmas"];

  useEffect(() => { localStorage.setItem("candidatos", JSON.stringify(candidatos)); }, [candidatos]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNovaFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFoto(reader.result);
      reader.readAsDataURL(file);
    } else { setNovaFoto(null); setPreviewFoto(null); alert("Por favor, envie um arquivo de imagem válido."); }
  };

  const limparFormulario = () => {
    setNovoNome(""); setSobrenome(""); setNovaCidade(""); setDataNascimento("");
    setObservacoesEntrevista(""); setNovaVaga(""); setNovoStatus("Não selecionado");
    setMotivoStatus(""); setMostrarMotivo(false);
    setPreviewFoto(null); setNovaFoto(null); setEditandoId(null);
    setFormacaoAcademica(""); setTelefone(""); setEndereco("");
    setCep(""); setEstadoCivil(""); setGenero("M"); setAvaliacao(null);
  };

  const salvarCandidato = (e) => {
    e.preventDefault();
    if (!novoNome.trim()) { alert("Nome é obrigatório"); return; }
    const [estado, cidade] = novaCidade.split(" - ");

    if (editandoId !== null) {
      setCandidatos((old) =>
        old.map((c) =>
          c.id === editandoId ? {
            ...c, nome: novoNome, sobrenome, cidade, estado, dataNascimento,
            observacoesEntrevista, vaga: novaVaga, status: novoStatus, motivoStatus,
            foto: previewFoto, formacaoAcademica, telefone, endereco, cep,
            estadoCivil, genero, avaliacao,
          } : c
        )
      );
    } else {
      const novoCandidato = {
        id: Date.now(), nome: novoNome, sobrenome, cidade, estado, dataNascimento,
        observacoesEntrevista, vaga: novaVaga, status: novoStatus, motivoStatus,
        foto: previewFoto, formacaoAcademica, telefone, endereco, cep,
        estadoCivil, genero, avaliacao,
      };
      setCandidatos((old) => [...old, novoCandidato]);
    }
    limparFormulario(); setAbaAtiva("curriculo");
  };

  const editarCandidato = (candidato) => {
    setNovoNome(candidato.nome || ""); setSobrenome(candidato.sobrenome || "");
    setNovaCidade(candidato.estado && candidato.cidade ? `${candidato.estado} - ${candidato.cidade}` : "");
    setDataNascimento(candidato.dataNascimento || ""); setObservacoesEntrevista(candidato.observacoesEntrevista || "");
    setNovaVaga(candidato.vaga || ""); setNovoStatus(candidato.status || "Não selecionado");
    setMotivoStatus(candidato.motivoStatus || ""); setMostrarMotivo(!!candidato.motivoStatus);
    setPreviewFoto(candidato.foto || null); setNovaFoto(null); setEditandoId(candidato.id);
    setFormacaoAcademica(candidato.formacaoAcademica || ""); setTelefone(candidato.telefone || "");
    setEndereco(candidato.endereco || ""); setCep(candidato.cep || ""); setEstadoCivil(candidato.estadoCivil || "");
    setGenero(candidato.genero || "M"); setAvaliacao(candidato.avaliacao || null); setAbaAtiva("form");
  };

  const handleDownloadCurriculo = () => {
    if (!observacoesEntrevista) { alert("Não há conteúdo para baixar."); return; }
    const blob = new Blob([observacoesEntrevista], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url;
    link.download = `${novoNome.replace(/\s+/g, '_')}_curriculo.html`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const modules = {
    toolbar: [
      [{ 'font': ['Arial','sans-serif','serif','monospace'] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }],[{ 'background': [] }],
      ['bold','italic','underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  };
  const formats = ['font','size','color','background','bold','italic','underline','list','bullet'];

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif", backgroundColor: "#F7F9FC", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Gestão de Candidatos</h2>

      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <button onClick={() => setAbaAtiva("form")} disabled={abaAtiva === "form"} style={{ padding: "10px 20px", marginRight: 10, background: abaAtiva === "form" ? "#007bff" : "#e9ecef", color: abaAtiva === "form" ? "#fff" : "#000", border: "none", borderRadius: 4, cursor: "pointer" }}>Formulário</button>
        <button onClick={() => setAbaAtiva("curriculo")} disabled={abaAtiva === "curriculo"} style={{ padding: "10px 20px", background: abaAtiva === "curriculo" ? "#007bff" : "#e9ecef", color: abaAtiva === "curriculo" ? "#fff" : "#000", border: "none", borderRadius: 4, cursor: "pointer" }}>Currículos</button>
      </div>

      {abaAtiva === "form" && (
        <form onSubmit={salvarCandidato} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <div>
            <label>Nome*:</label>
            <input type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          </div>
          <div>
            <label>Sobrenome:</label>
            <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          </div>
          <div>
            <label>Cidade*:</label>
            <input list="cidadesDoBrasil" value={novaCidade} onChange={(e) => setNovaCidade(e.target.value)} placeholder="UF - Cidade" required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <datalist id="cidadesDoBrasil">{cidadesDoBrasil.map((c, i) => (<option key={i} value={c} />))}</datalist>
          </div>
          <div>
            <label>Data Nascimento:</label>
            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          </div>
          <div style={{ gridColumn: "1 / 3" }}>
            <label>Observações gerais:</label>
            <ReactQuill value={observacoesEntrevista} onChange={setObservacoesEntrevista} modules={modules} formats={formats} style={{ background: "#fff", borderRadius: 4 }} />
            <button type="button" onClick={handleDownloadCurriculo} style={{ marginTop: 10, background: "#28a745", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer" }}>Baixar Currículo HTML</button>
          </div>
          <div>
            <label>Vaga*:</label>
            <input type="text" value={novaVaga} onChange={(e) => setNovaVaga(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          </div>

          {/* STATUS + MOTIVO */}
          <div style={{ gridColumn: "1 / 2" }}>
            <label>Status:</label>
            <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}>
              {statusOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
            </select>

            <button type="button" onClick={() => setMostrarMotivo(!mostrarMotivo)} style={{ marginTop: 6, background: "#ffc107", color: "#000", border: "none", padding: "5px 10px", borderRadius: 4, cursor: "pointer", fontSize: "0.85em" }}>
              {mostrarMotivo ? "Esconder motivo" : "Adicionar motivo"}
            </button>

            {mostrarMotivo && (
              <textarea rows={2} placeholder="Digite o motivo do status..." value={motivoStatus} onChange={(e) => setMotivoStatus(e.target.value)} style={{ width: "100%", marginTop: 8, padding: 6, borderRadius: 4, border: "1px solid #ccc" }} />
            )}
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <label>Foto:</label>
            <input type="file" accept="image/*" onChange={handleFotoChange} />
            {previewFoto && (<img src={previewFoto} alt="preview" style={{ marginTop: 10, maxWidth: 150, borderRadius: 8 }} />)}
          </div>

          <AvaliacaoEntrevista avaliacao={avaliacao} setAvaliacao={setAvaliacao} />

          <div style={{ gridColumn: "1 / 3", textAlign: "center", marginTop: 20 }}>
            <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer" }}>
              {editandoId ? "Atualizar Candidato" : "Adicionar Candidato"}
            </button>
            {editandoId && (
              <button type="button" onClick={limparFormulario} style={{ marginLeft: 10, background: "#6c757d", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer" }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      {abaAtiva === "curriculo" && (
        <Curriculo candidatos={candidatos} setCandidatos={setCandidatos} editarCandidato={editarCandidato} />
      )}
    </div>
  );
}

export default Candidatos;
=======
import React, { useState, useEffect, useRef } from 'react';

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [filtroCidade, setFiltroCidade] = useState('');
  const [novoCandidato, setNovoCandidato] = useState({
    nome: '',
    cidade: '',
    sobre: '',
    vaga: '',
    status: 'não selecionado',
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
    c.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
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

      // Reset form e arquivos
      setNovoCandidato({
        nome: '',
        cidade: '',
        sobre: '',
        vaga: '',
        status: 'não selecionado',
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
>>>>>>> 5af7171 (Atualiza .gitignore e remove node_modules do Git)
