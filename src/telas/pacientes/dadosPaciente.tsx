import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import {
    FaBell,
    FaCalendarAlt,
    FaChartBar,
    FaEdit,
    FaHeart,
    FaPlus,
    FaUser,
    FaArrowLeft,
    FaTrash,
} from "react-icons/fa";
import {
    getPacientePorId,
    getRegistrosGlicosePorUsuario,
    getPeriodo,
    createRegistroGlicose,
    editRegistroGlicose,
    deleteRegistroGlicose,
    type PacienteResumo,
    type RegistroGlicose,
} from "../../services/api";
import { toast } from "react-toastify";

export default function DadosPaciente() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const pacienteId = Number(id);

    // estados da tela
    const [paciente, setPaciente] = useState<PacienteResumo | null>(null);
    const [loading, setLoading] = useState(true);
    const [medicoes, setMedicoes] = useState<RegistroGlicose[]>([]);
    const [loadingMedicoes, setLoadingMedicoes] = useState(true);

    // modal e campos
    const [isModalOpen, setModalOpen] = useState(false);
    const [dataHora, setDataHora] = useState("");
    const [novaGlicose, setNovaGlicose] = useState("");
    const [novaInsulina, setNovaInsulina] = useState("");
    const [tipoInsulina, setTipoInsulina] = useState<number>(0);
    const [novoPeriodo, setNovoPeriodo] = useState<number>();
    const [periodos, setPeriodos] = useState<{ id_periodo: number; descricao: string }[]>([]);

    // estados para edição
    const [editando, setEditando] = useState<RegistroGlicose | null>(null);

    // busca lista de períodos
    useEffect(() => {
        getPeriodo()
            .then(r => setPeriodos(r))
            .catch(() => setPeriodos([]));
    }, []);

    // busca paciente e medições
    useEffect(() => {
        if (!pacienteId) return;

        getPacientePorId(pacienteId)
            .then(setPaciente)
            .catch(() => setPaciente(null))
            .finally(() => setLoading(false));

        setLoadingMedicoes(true);
        getRegistrosGlicosePorUsuario(pacienteId)
            .then(data => {
                console.log("medicoes recebidas:", data);
                setMedicoes(data);
            })
            .catch(() => setMedicoes([]))
            .finally(() => setLoadingMedicoes(false));
    }, [pacienteId]);

    // cria um novo registro
    async function handleCreateRegistro(e: React.FormEvent) {
        e.preventDefault();
        if (
            dataHora === "" ||
            novaGlicose === "" ||
            tipoInsulina === undefined || tipoInsulina === null ||
            novoPeriodo == null
        ) {
            return;
        }

        try {
            const registro = {
                id_usuario: pacienteId,
                nivel_glicose: Number(novaGlicose),
                data_hora: dataHora,
                id_periodo: novoPeriodo,
                tipo_insulina: Number(tipoInsulina), // garantir número
                unidade_insulina: novaInsulina === "" ? "0" : String(novaInsulina), // garantir string
            };
            console.log("Enviando registro:", registro);
            await createRegistroGlicose(registro);


            const updated = await getRegistrosGlicosePorUsuario(pacienteId);
            setMedicoes(updated);
            setModalOpen(false);
            setDataHora("");
            setNovaGlicose("");
            setNovaInsulina("");
            setTipoInsulina(0);
            setNovoPeriodo(undefined);
        } catch (err) {
            console.error(err);
            // toast de erro, se desejar
        }
    }

    // Função para excluir registro
    async function handleDeleteRegistro(id_registro: number) {
        if (!window.confirm("Tem certeza que deseja excluir este registro?")) return;
        try {
            await deleteRegistroGlicose(id_registro);
            setMedicoes(medicoes.filter(m => m.id_registro !== id_registro));
        } catch (err) {
            alert("Erro ao excluir registro.");
        }
    }

    // Função para editar registro
    async function handleEditRegistro(e: React.FormEvent) {
        e.preventDefault();
        if (!editando) return;
        try {
            await editRegistroGlicose(editando.id_registro, {
                id_usuario: pacienteId,
                nivel_glicose: Number(editando.glicose),
                unidade_insulina: String(editando.insulina),
                tipo_insulina: editando.tipo_insulina,
                id_periodo: editando.id_periodo,
                data_hora: editando.data_hora,
            });
            // Atualiza lista
            const updated = await getRegistrosGlicosePorUsuario(pacienteId);
            setMedicoes(updated);
            setEditando(null);
            toast.success('Registro editado com sucesso!');
        } catch (err) {
            alert("Erro ao editar registro.");
        }
    }

    if (loading) return <div className="p-8">Carregando...</div>;
    if (!paciente) return <div className="p-8">Paciente não encontrado.</div>;

    const hoje = new Date().toLocaleDateString("pt-BR");

    return (
        <div className="bg-gradient-to-br from-[#5C8354] via-[#cbffc0] to-[#e6ffe6] min-h-screen flex">
            <div className="w-full md:w-[200px] bg-[#386e1e]/80 shadow-2xl">
                <BarraLateral />
            </div>
            <div className="flex-1 flex flex-col">
                {/* Banner */}
                <div className="relative flex items-center bg-gradient-to-r from-[#5C8354] via-[#cbffc0] to-[#e6ffe6] h-48 px-8">
                    <img
                        src="/pacientefoto.png"
                        alt="Paciente"
                        className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="ml-6 text-white">
                        <h1 className="text-3xl font-bold drop-shadow">{paciente.nome_completo}</h1>
                        <div className="mt-2 flex gap-3">
                            <span className="flex items-center gap-1 bg-white/90 text-[#386e1e] px-3 py-1 rounded-full">
                                <FaCalendarAlt /> {hoje}
                            </span>
                            <span className="flex items-center gap-1 bg-white/90 text-[#386e1e] px-3 py-1 rounded-full">
                                <FaUser /> Paciente
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/paciente")}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow flex items-center gap-2 text-[#386e1e]"
                    >
                        <FaArrowLeft /> Voltar
                    </button>
                </div>
                {/* Conteúdo */}
                <div className="flex flex-col lg:flex-row flex-1 px-8 py-6 gap-8">
                    {/* Medições */}
                    <div className="flex-1">
                        <h2 className="text-2xl text-white mb-4 flex items-center gap-2">
                            <FaChartBar /> Medições Recentes
                        </h2>
                        {loadingMedicoes ? (
                            <p className="text-white">Carregando medições...</p>
                        ) : medicoes.length === 0 ? (
                            <p className="text-white">Nenhum registro de glicose encontrado.</p>
                        ) : (
                            <div className="space-y-3">
                                {medicoes.map((m, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-bold text-[#386e1e]">{m.hora}</p>
                                            <p className="text-sm bg-[#e6ffe6] px-2 py-0.5 rounded-full inline-block mt-1">
                                                {m.periodo}
                                            </p>
                                        </div>
                                        <div className="flex gap-6 items-center">
                                            <div className="text-center">
                                                <p className="text-xs font-semibold text-[#5C8354]">Glicose</p>
                                                <p className="bg-[#5C8354] text-white px-2 py-0.5 rounded-full">
                                                    {m.glicose} mg/dL
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-semibold text-[#5C8354]">Insulina</p>
                                                <p className="bg-[#5C8354] text-white px-2 py-0.5 rounded-full">
                                                    {m.insulina} UN
                                                </p>
                                            </div>
                                            {/* Ícones de ação */}
                                            <FaEdit
                                                className="text-[#386e1e] text-xl cursor-pointer hover:text-lime-600 transition"
                                                title="Editar registro"
                                                onClick={() => {
                                                    console.log("Clicou para editar:", m);
                                                    setEditando(m);
                                                }}
                                            />
                                            <FaTrash
                                                className="text-[#386e1e] text-xl cursor-pointer hover:text-red-600 transition"
                                                title="Excluir registro"
                                                onClick={() => handleDeleteRegistro(m.id_registro)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Ações & Resumo */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
                            <h3 className="font-bold text-[#386e1e]">Ações</h3>
                            <div className="flex gap-4 items-center">
                                <FaPlus
                                    className="text-[#5C8354] text-2xl cursor-pointer"
                                    title="Novo registro"
                                    onClick={() => setModalOpen(true)}
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="font-bold text-[#386e1e] mb-3">Resumo</h3>
                            <ul className="text-[#386e1e] space-y-2">
                                <li>
                                    Média glicose:{" "}
                                    <strong>
                                        {(
                                            medicoes.reduce((sum, m) => sum + Number(m.glicose), 0) /
                                            (medicoes.length || 1)
                                        ).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                        {" "}mg/dL
                                    </strong>
                                </li>
                                <li>
                                    Média insulina:{" "}
                                    <strong>
                                        {(
                                            medicoes.reduce((sum, m) => sum + Number(m.insulina), 0) /
                                            (medicoes.length || 1)
                                        ).toFixed(1)}{" "}
                                        UN
                                    </strong>
                                </li>
                                <li>
                                    Número de registros:{" "}
                                    <strong>
                                        {medicoes.length}
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de novo registro */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleCreateRegistro}
                        className="bg-white rounded-xl shadow-lg p-6 w-80 space-y-4"
                    >
                        <h3 className="text-lg font-bold text-[#386e1e]">Novo Registro</h3>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Data e Hora</label>
                            <input
                                type="datetime-local"
                                value={dataHora}
                                onChange={e => setDataHora(e.target.value)}
                                className="border rounded px-2 py-1"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Glicose (mg/dL)</label>
                            <input
                                type="number"
                                value={novaGlicose}
                                onChange={e => setNovaGlicose(e.target.value)}
                                className="border rounded px-2 py-1"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Tipo de Insulina</label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipoInsulina"
                                    value={1}
                                    checked={tipoInsulina === 1}
                                    onChange={() => setTipoInsulina(1)}
                                />
                                Rápida
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipoInsulina"
                                    value={2}
                                    checked={tipoInsulina === 2}
                                    onChange={() => setTipoInsulina(2)}
                                />
                                Lenta
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Unidade (UN)</label>
                            <input
                                type="number"
                                value={novaInsulina}
                                onChange={e => setNovaInsulina(e.target.value)}
                                className="border rounded px-2 py-1"
                                placeholder="Opcional"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Período</label>
                            <select
                                value={novoPeriodo ?? ""}
                                onChange={e => setNovoPeriodo(Number(e.target.value))}
                                className="border rounded px-2 py-1"
                                required
                            >
                                <option value="">Selecione…</option>
                                {periodos.map(p => (
                                    <option key={p.id_periodo} value={p.id_periodo}>
                                        {p.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-1 rounded bg-[#5C8354] text-white hover:bg-[#4b6e44]"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal de edição */}
            {editando && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleEditRegistro}
                        className="bg-white rounded-xl shadow-lg p-6 w-80 space-y-4"
                    >
                        <h3 className="text-lg font-bold text-[#386e1e]">Editar Registro</h3>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Data e Hora</label>
                            <input
                                type="datetime-local"
                                value={editando.data_hora}
                                onChange={e => setEditando({ ...editando, data_hora: e.target.value })}
                                className="border rounded px-2 py-1"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Glicose (mg/dL)</label>
                            <input
                                type="number"
                                value={editando.glicose}
                                onChange={e => setEditando({ ...editando, glicose: Number(e.target.value) })}
                                className="border rounded px-2 py-1"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Tipo de Insulina</label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipoInsulinaEdit"
                                    value={1}
                                    checked={editando.tipo_insulina === 1}
                                    onChange={() => setEditando({ ...editando, tipo_insulina: 1 })}
                                />
                                Rápida
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipoInsulinaEdit"
                                    value={2}
                                    checked={editando.tipo_insulina === 2}
                                    onChange={() => setEditando({ ...editando, tipo_insulina: 2 })}
                                />
                                Lenta
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Unidade (UN)</label>
                            <input
                                type="number"
                                value={editando.insulina}
                                onChange={e => setEditando({ ...editando, insulina: Number(e.target.value) })}
                                className="border rounded px-2 py-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Período</label>
                            <select
                                value={editando.id_periodo}
                                onChange={e => setEditando({ ...editando, id_periodo: Number(e.target.value) })}
                                className="border rounded px-2 py-1"
                                required
                            >
                                <option value="">Selecione…</option>
                                {periodos.map(p => (
                                    <option key={p.id_periodo} value={p.id_periodo}>
                                        {p.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setEditando(null)}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-1 rounded bg-[#5C8354] text-white hover:bg-[#4b6e44]"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
