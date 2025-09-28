import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";

function Consultas() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#386e1e] via-[#7bb661] to-[#b6e2b3]">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#5C8354]/60 via-transparent to-transparent pointer-events-none z-0" />
      {/* Barra lateral fixa */}
      <div className="w-[200px] min-h-screen bg-[#386e1e]/80 shadow-2xl z-50">
        <BarraLateral />
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-start mt-12">
        <div className="flex flex-col items-center w-full">
          <div className="flex gap-8 justify-center w-full mb-10" id="consultas-colunas">
            {/* Coluna Paciente */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[220px]">
              <h2 className="text-xl font-bold text-[#386e1e] mb-4">Paciente</h2>
              <button className="w-full mb-2 px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                Pacientes com maior número de registros
              </button>
              <button className="w-full mb-2 px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                Média de glicose por paciente
              </button>
              <button className="w-full px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                Pacientes com maior número de aplicações de insulina
              </button>
            </div>
            {/* Coluna Glicose */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[220px]">
              <h2 className="text-xl font-bold text-[#386e1e] mb-4">Glicose</h2>
              <button className="w-full mb-2 px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                5 maiores registros de glicose no último mês
              </button>
              <button className="w-full mb-2 px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                Média de glicose por faixa etária
              </button>
              <button className="w-full px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                Pacientes com glicose acima do recomendado
              </button>
            </div>
            {/* Coluna Médico */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[220px]">
              <h2 className="text-xl font-bold text-[#386e1e] mb-4">Médico</h2>
              <button className="w-full mb-2 px-4 py-2 bg-[#7bb661] text-white rounded hover:bg-[#386e1e] transition whitespace-normal max-w-xs">
                Médico com maior número de pacientes
              </button>
            </div>
          </div>
          {/* Área de resultados das consultas */}
          <div className="bg-white rounded-xl shadow-lg p-6 min-h-[250px] w-[1160px] max-w-full flex flex-col items-center">
            <h3 className="text-lg font-semibold text-[#386e1e] mb-4">Resultados da Consulta</h3>
            <div className="w-full text-gray-700 text-center">
              Selecione uma consulta para ver os dados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consultas;
