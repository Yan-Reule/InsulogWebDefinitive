import { FaBell, FaChartBar, FaEdit, FaHeart } from "react-icons/fa";

export interface IPaciente {
    id: number;
    nome: string;
    fotoUrl: string;
    glicose: number; // valor em mg/dL
    insulina: number; // valor em UI
    idade?: number;
    //   alerta?: boolean;
    //   statusConexao?: 'online' | 'offline';
}


interface ItemListaPacienteProps {
    paciente?: IPaciente;
    abrirAba: () => void
}

const ItemListaPaciente: React.FC<ItemListaPacienteProps> = ({ paciente }) => {
    return (
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-white rounded-xl shadow p-2 mb-3 hover:shadow-md transition-all gap-2 md:gap-0">
            {/* Avatar e nome */}
            <div className="flex items-center gap-3 min-w-[120px] max-w-[180px] flex-shrink-0">
                <img
                    src={paciente?.fotoUrl}
                    alt={paciente?.nome}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <span className="font-semibold text-gray-800 truncate">{paciente?.nome}</span>
            </div>
            {/* Ícones de ações */}
            <div className="flex gap-2 text-[#5C8354] text-lg justify-center md:justify-start flex-shrink-0">
                <button title="Editar"><FaEdit /></button>
                <button title="Saúde"><FaHeart /></button>
                <button title="Alarme"><FaBell /></button>
                <button title="Status"><FaChartBar /></button>
            </div>
            {/* Glicose */}
            <div className="flex items-center gap-2 bg-[#d6f5d6] rounded-lg px-2 py-1 mx-0 md:mx-2 min-w-[110px] justify-center flex-shrink-0">
                <span className="font-bold text-[#5C8354] text-xs md:text-base">Glicose</span>
                <span className="bg-[#5C8354] text-white rounded-full px-2 py-0.5 text-xs md:text-sm font-semibold">{paciente?.glicose} mg/dL</span>
            </div>
            {/* Insulina */}
            <div className="flex items-center gap-2 bg-[#d6f5d6] rounded-lg px-2 py-1 min-w-[110px] justify-center flex-shrink-0">
                <span className="font-bold text-[#5C8354] text-xs md:text-base">Insulina</span>
                <span className="bg-[#5C8354] text-white rounded-full px-2 py-0.5 text-xs md:text-sm font-semibold">{paciente?.insulina} UI</span>
            </div>
        </div>
    );
};

export default ItemListaPaciente;