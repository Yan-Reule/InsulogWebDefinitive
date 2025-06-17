
import { Navigate, useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import ItemListaPaciente from "../../componentes/intemListaPacientes";
import { FaBell, FaCalendarAlt, FaChartBar, FaChevronDown, FaEdit, FaHeart, FaPlus, FaSearch, FaUser } from "react-icons/fa";


function DadosPaciente() {
    const navigate = useNavigate();

    const medico = { nome: "Dr. Paulo", fotoUrl: "/medico.png" };
    const paciente = { nome: "Paciente 1" };
    const data = "20/03/2025";
    const medicoes = [
        { hora: "00:00", glicose: 100, insulina: 2, periodo: "CAF" },
        { hora: "00:00", glicose: 100, insulina: 2, periodo: "CAF" },
        { hora: "00:00", glicose: 100, insulina: 2, periodo: "CAF" },
        { hora: "00:00", glicose: 100, insulina: 2, periodo: "CAF" },
    ];

    return (

        <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed  from-[#5C8354] to-[#cbffc0]  h-screen w-screen items-center flex flex-col">
            <BarraLateral />
            <div className="flex  flex-col justify-center items-center pt-10 w-full h-screen">
                <div className="flex w-[70%] justify-start ">

                    <button
                        onClick={() => navigate("/paciente")}
                        className="  flex items-center gap-2 px-4  bg-[#ffffff] hover:bg-[#d4d4d4] text-[#386e1e] rounded transition font-semibold shadow"
                    > Voltar
                    </button>
                </div>
                <div className="flex w-[70%] ">
                    <p className=" font-semibold text-white text-lg">
                        Paciente 1
                    </p>
                </div>
                <div className="px-8 py-6 w-[75%] min-h-[70%] border rounded-md bg-white border-gray-400">



                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-[#5C8354] text-xl" />
                            <span className="font-semibold text-lg text-gray-800">{paciente.nome}</span>
                        </div>
                        <div className="flex gap-4 bg-[#f7f9fc] border border-[#5C8354] rounded-full px-4 py-2">
                            <FaChartBar className="text-[#5C8354] text-xl cursor-pointer" />
                            <FaHeart className="text-[#5C8354] text-xl cursor-pointer" />
                            <FaBell className="text-[#5C8354] text-xl cursor-pointer" />
                            <FaCalendarAlt className="text-[#5C8354] text-xl cursor-pointer" />
                            <FaEdit className="text-[#5C8354] text-xl cursor-pointer" />
                        </div>
                    </div>
                    {/* Data e Filtro */}
                    <div className="flex  md:items-center gap-6">
                        <div className="flex items-center gap-2 text-[#5C8354] font-semibold">
                            <FaCalendarAlt />
                            <span>{data}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                            Medições Recentes <FaChevronDown className="text-[#5C8354]" />
                        </div>
                    </div>
                    {/* Tabela de medições */}
                    <div className="overflow-x-auto mt-2 border border-[#36a128] p-4 rounded-lg">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="text-gray-600 text-sm">
                                    <th className="py-2 pr-4">Hora</th>
                                    <th className="py-2 pr-4">Glicose</th>
                                    <th className="py-2 pr-4">Insulina</th>
                                    <th className="py-2 pr-4">Período</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicoes.map((m, i) => (
                                    <tr key={i} className="align-middle">
                                        <td className="py-2 md:pr-2 text-gray-700">{m.hora}</td>
                                        <td className="py-2 pr-2">
                                            <div className="flex flex-col md:flex-row h-[80px] md:h-auto items-center gap-2 bg-[#d6f5d6] rounded-lg px-3 py-1 w-fit">
                                                <div className="md:flex">

                                                    {/* <img src="/iconeNovoPaciente.png" alt="Glicose" className="w-5 h-5" /> */}
                                                    <span className="font-bold text-[#5C8354] text-xs">Glicose</span>
                                                </div>
                                                <span className="bg-[#5C8354] text-white rounded-full px-2 py-0.5 text-xs text-center font-semibold">{m.glicose} mg/dL</span>
                                            </div>
                                        </td>
                                        <td className="py-2 md:pr-2">
                                            <div className="flex flex-col md:flex-row h-[80px] md:h-auto items-center gap-2 bg-[#d6f5d6] rounded-lg px-3 py-1 w-fit">
                                                <div className="md:flex">

                                                    {/* <img src="/iconeNovoPaciente.png" alt="Insulina" className="w-5 h-5" /> */}
                                                    <span className="font-bold text-[#5C8354] text-xs">Insulina</span>
                                                </div>
                                                <span className="bg-[#5C8354] text-white rounded-full px-2 py-0.5 text-center text-xs font-semibold">{m.insulina} UN</span>
                                            </div>
                                        </td>
                                        <td className="py-2 md:pr-2">
                                            <div className="flex flex-col items-center">
                                                <FaCalendarAlt className="text-[#bdbdbd] text-xl" />
                                                <span className="text-xs text-gray-500">{m.periodo}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>




                </div>
            </div>

        </div>
    );
}

export default DadosPaciente;