import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import { FaBell, FaCalendarAlt, FaChartBar, FaChevronDown, FaEdit, FaHeart, FaUser, FaArrowLeft } from "react-icons/fa";

function DadosPaciente() {
    const navigate = useNavigate();

    const paciente = { nome: "Paciente 1", fotoUrl: "/medico.png" };
    const data = "20/03/2025";
    const medicoes = [
        { hora: "00:00", glicose: 100, insulina: 2, periodo: "Café" },
        { hora: "06:00", glicose: 110, insulina: 3, periodo: "Almoço" },
        { hora: "12:00", glicose: 95, insulina: 2, periodo: "Janta" },
        { hora: "18:00", glicose: 105, insulina: 2, periodo: "Janta" },
    ];

    return (
        <div className="bg-gradient-to-br from-[#5C8354] via-[#cbffc0] to-[#e6ffe6] min-h-screen w-screen flex flex-col md:flex-row">
            {/* Menu lateral */}
            <div className="w-full md:w-[200px] min-h-[60px] md:min-h-screen bg-[#386e1e]/80 shadow-2xl z-50">
                <BarraLateral />
            </div>
            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col">
                {/* Topo estilo banner */}
                <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-r from-[#5C8354] via-[#cbffc0] to-[#e6ffe6] h-auto md:h-48 shadow-lg px-4 md:px-12 py-6 md:py-0">
                    <img
                        src={paciente.fotoUrl}
                        alt="Paciente"
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#5C8354] shadow-xl bg-white"
                    />
                    <div className="ml-0 md:ml-8 mt-4 md:mt-0 text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow">{paciente.nome}</h1>
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
                            <span className="flex items-center gap-2 text-[#386e1e] bg-white/95 px-4 py-1 rounded-full font-semibold shadow">
                                <FaCalendarAlt /> {data}
                            </span>
                            <span className="flex items-center gap-2 text-[#386e1e] bg-white/95 px-4 py-1 rounded-full font-semibold shadow">
                                <FaUser /> Paciente
                            </span>
                        </div>
                    </div>
                    {/* Botão Voltar no lado direito */}
                    <button
                        onClick={() => navigate("/paciente")}
                        className="absolute right-4 md:right-8 top-4 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/80 text-[#386e1e] rounded-full transition font-semibold shadow border border-[#5C8354] z-20"
                    >
                        <FaArrowLeft /> Voltar
                    </button>
                </div>
                {/* Conteúdo em colunas */}
                <div className="flex flex-col lg:flex-row flex-1 px-4 md:px-12 py-6 md:py-8 gap-6 md:gap-8">
                    {/* Lista de medições */}
                    <div className="flex-1 w-full">
                        <h2 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-4 flex items-center gap-2">
                            <FaChartBar /> Medições Recentes
                        </h2>
                        <div className="flex flex-col gap-3 w-full max-w-full md:max-w-2xl">
                            {medicoes.map((m, i) => (
                                <div
                                    key={i}
                                    className="bg-white/90 rounded-xl shadow-lg border-l-4 border-[#5C8354] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:scale-[1.01] transition w-full"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-base font-bold text-[#386e1e]">{m.hora}</span>
                                        <span className="text-xs bg-[#e6ffe6] text-[#386e1e] px-2 py-0.5 rounded-full font-semibold w-fit mt-1">{m.periodo}</span>
                                    </div>
                                    <div className="flex gap-6 mt-2 sm:mt-0">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-[#5C8354] font-semibold">Glicose</span>
                                            <span className="text-sm font-bold text-white bg-[#5C8354] rounded-full px-2 py-0.5 shadow">{m.glicose} mg/dL</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-[#5C8354] font-semibold">Insulina</span>
                                            <span className="text-sm font-bold text-white bg-[#5C8354] rounded-full px-2 py-0.5 shadow">{m.insulina} UN</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Coluna lateral direita */}
                    <div className="w-full lg:w-80 flex flex-col gap-6 items-start mt-8 lg:mt-12">
                        {/* Ações rápidas */}
                        <div className="bg-white/90 rounded-xl shadow-lg border border-[#5C8354] p-5 flex flex-col gap-4 w-full">
                            <h3 className="text-lg font-bold text-[#386e1e] mb-2">Ações</h3>
                            <div className="flex gap-4 justify-between flex-wrap">
                                <FaChartBar className="text-[#5C8354] text-2xl cursor-pointer hover:scale-110 transition" title="Gráficos"/>
                                <FaHeart className="text-[#5C8354] text-2xl cursor-pointer hover:scale-110 transition" title="Saúde"/>
                                <FaBell className="text-[#5C8354] text-2xl cursor-pointer hover:scale-110 transition" title="Alertas"/>
                                <FaCalendarAlt className="text-[#5C8354] text-2xl cursor-pointer hover:scale-110 transition" title="Calendário"/>
                                <FaEdit className="text-[#5C8354] text-2xl cursor-pointer hover:scale-110 transition" title="Editar"/>
                            </div>
                        </div>
                        {/* Conquistas/Resumo */}
                        <div className="bg-white/90 rounded-xl shadow-lg border border-[#5C8354] p-5 w-full">
                            <h3 className="text-lg font-bold text-[#386e1e] mb-2">Resumo</h3>
                            <ul className="text-[#386e1e] text-sm font-medium space-y-2">
                                <li>Última medição: <span className="font-bold">{medicoes[medicoes.length-1].hora}</span></li>
                                <li>Média glicose: <span className="font-bold">{(medicoes.reduce((a, b) => a + b.glicose, 0) / medicoes.length).toFixed(1)} mg/dL</span></li>
                                <li>Média insulina: <span className="font-bold">{(medicoes.reduce((a, b) => a + b.insulina, 0) / medicoes.length).toFixed(1)} UN</span></li>
                                <li>Períodos registrados: <span className="font-bold">{[...new Set(medicoes.map(m => m.periodo))].length}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DadosPaciente;