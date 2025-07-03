import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBell, FaChartBar } from "react-icons/fa";
import { getPacientesPorMedico, deletePaciente, type PacienteResumo, editPaciente } from "../../services/api";
import { toast } from "react-toastify";

// Novo tipo para edição
type PacienteEdit = PacienteResumo | null;

function Paciente() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<PacienteResumo[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para modal de edição
  const [pacienteEditando, setPacienteEditando] = useState<PacienteEdit>(null);
  const [editNome, setEditNome] = useState("");
  // Estados para cada campo editável
  const [editEmail, setEditEmail] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editCelular, setEditCelular] = useState("");
  const [editPlano, setEditPlano] = useState("");
  const [editProntuario, setEditProntuario] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("medicoId");
    if (!stored) {
      // redireciona se não houver médico logado
      navigate("/login");
      return;
    }
    const medicoId = Number(stored);

    getPacientesPorMedico(medicoId)
      .then(data => {
        setPacientes(data);
        console.log(data);
      })
      .catch(err => {
        console.error(err);
        // opcional: toast de erro
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // Função para deletar paciente
  async function handleDeletePaciente(id: number) {
    if (!window.confirm("Tem certeza que deseja deletar este paciente?")) return;
    try {
      await deletePaciente(id);
      setPacientes(pacientes.filter(p => p.id !== id));
      toast.success('Paciente excluído com sucesso!');
    } catch (err) {
      alert("Erro ao deletar paciente.");
    }
  }

  // Abre o modal de edição
  function handleEditPaciente(id: number) {
    const paciente = pacientes.find(p => p.id === id);
    if (paciente) {
      setPacienteEditando(paciente);
      setEditNome(paciente.nome_completo || "");
      setEditEmail(paciente.email || "");
      setEditCpf(paciente.cpf || "");
      setEditCelular(paciente.celular || "");
      setEditPlano(paciente.plano_saude || "");
      setEditProntuario(paciente.numero_prontuario || "");
    }
  }

  // Salva a edição (agora atualiza no banco)
  async function handleSaveEdit() {
    if (pacienteEditando) {
      try {
        await editPaciente(pacienteEditando.id, {
          nome_completo: editNome,
          email: editEmail,
          cpf: editCpf,
          celular: editCelular,
          plano_saude: editPlano,
          numero_prontuario: editProntuario,
        });

        setPacientes(pacientes.map(p =>
          p.id === pacienteEditando.id
            ? {
                ...p,
                nome_completo: editNome,
                email: editEmail,
                cpf: editCpf,
                celular: editCelular,
                plano_saude: editPlano,
                numero_prontuario: editProntuario,
              }
            : p
        ));
        setPacienteEditando(null);
        toast.success('Paciente editado com sucesso!');
      } catch (err) {
        console.error("Erro ao editar paciente:", err);
        alert("Erro ao editar paciente.");
      }
    }
  }

  // Fecha o modal
  function handleCloseEdit() {
    setPacienteEditando(null);
  }

  return (
    <div className="bg-gradient-to-br from-[#386e1e] via-[#7bb661] to-[#b6e2b3] min-h-screen w-screen flex">
      {/* Gradiente sutil no topo */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#5C8354]/60 via-transparent to-transparent pointer-events-none z-0" />
      {/* Barra lateral fixa */}
      <div className="w-[200px] min-h-screen bg-[#386e1e]/90 shadow-2xl z-10">
        <BarraLateral />
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center relative z-10">
        {/* Modal de edição */}
        {pacienteEditando && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl min-w-[300px] relative">
              <button
                onClick={handleCloseEdit}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
                title="Fechar"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#386e1e]">Editar Paciente</h2>
              <label className="block mb-2 text-gray-700 font-semibold">Nome completo</label>
              <input
                type="text"
                value={editNome}
                onChange={e => setEditNome(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <label className="block mb-2 text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <label className="block mb-2 text-gray-700 font-semibold">CPF</label>
              <input
                type="text"
                value={editCpf}
                onChange={e => setEditCpf(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <label className="block mb-2 text-gray-700 font-semibold">Celular</label>
              <input
                type="text"
                value={editCelular}
                onChange={e => setEditCelular(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <label className="block mb-2 text-gray-700 font-semibold">Plano de Saúde</label>
              <input
                type="text"
                value={editPlano}
                onChange={e => setEditPlano(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <label className="block mb-2 text-gray-700 font-semibold">Nº Prontuário</label>
              <input
                type="text"
                value={editProntuario}
                onChange={e => setEditProntuario(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseEdit}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded bg-[#5C8354] hover:bg-lime-500 text-white font-semibold"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col pt-10 w-full min-h-screen items-center">
          {/* Cabeçalho */}
          <div className="flex w-full max-w-3xl justify-between items-center mb-8 px-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-[#386e1e] rounded-full transition font-semibold shadow border border-[#5C8354]"
            >
              Voltar
            </button>
            <h1 className="text-3xl font-bold text-white drop-shadow">
              Lista de pacientes
            </h1>
            <button
              onClick={() => navigate("/cadastroPaciente")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500 hover:bg-lime-700 transition text-white text-xl shadow"
              title="Adicionar paciente"
            >
              <FaPlus />
            </button>
          </div>
          {/* Barra de pesquisa */}
          <div className="flex w-full max-w-3xl mb-6 px-2">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Pesquisar paciente"
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#5C8354] text-gray-700 bg-[#fafbfe] placeholder:text-gray-400 shadow"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C8354] text-lg pointer-events-none" />
            </div>
          </div>
          {/* Lista de pacientes */}
          <div className="w-full max-w-3xl flex flex-col gap-4 px-2">
            {loading ? (
              <p className="text-center text-gray-600">Carregando pacientes…</p>
            ) : pacientes.length === 0 ? (
              <p className="text-center text-gray-600">Nenhum paciente encontrado.</p>
            ) : (
              pacientes.map((p, index) => (
                <div
                  key={p.id + "-" + index}
                  onClick={() => navigate(`/dadosPaciente/${p.id}`)}
                  className="cursor-pointer transition-transform hover:scale-[1.015]"
                >
                  <div className="bg-white/95 rounded-2xl border-l-8 border-[#5C8354] p-5 flex items-center shadow-lg hover:shadow-2xl transition-all duration-200 w-full group">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mr-5">
                      <img
                        src={"/pacientefoto.png"}
                        alt={p.nome_completo}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#5C8354] shadow-md group-hover:border-[#5C8354] transition"
                      />
                    </div>
                    {/* Nome */}
                    <div className="flex flex-col flex-1">
                      <span className="font-bold text-xl text-[#386e1e]">
                        {p.nome_completo}
                      </span>
                    </div>
                    {/* Ações */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleEditPaciente(p.id);
                        }}
                        className="bg-[#5C8354] p-2 rounded-full text-white hover:bg-lime-400 hover:text-[#5C8354] transition text-lg shadow"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDeletePaciente(p.id);
                        }}
                        className="bg-[#5C8354] p-2 rounded-full text-white hover:bg-lime-400 hover:text-[#5C8354] transition text-lg shadow"
                        title="Deletar"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={e => e.stopPropagation()}
                        className="bg-[#5C8354] p-2 rounded-full text-white hover:bg-lime-400 hover:text-[#5C8354] transition text-lg shadow"
                        title="Notificação"
                      >
                        <FaBell />
                      </button>
                      <button
                        onClick={e => e.stopPropagation()}
                        className="bg-[#5C8354] p-2 rounded-full text-white hover:bg-lime-400 hover:text-[#5C8354] transition text-lg shadow"
                        title="Gráfico"
                      >
                        <FaChartBar />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paciente;
