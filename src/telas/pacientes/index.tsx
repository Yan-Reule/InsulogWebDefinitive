import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import ItemListaPaciente from "../../componentes/intemListaPacientes";
import { FaPlus, FaSearch } from "react-icons/fa";
import { getPacientesPorMedico, type PacienteResumo } from "../../services/api";

function Paciente() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<PacienteResumo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("medicoId");
    if (!stored) {
      // redireciona se não houver médico logado
      navigate("/login");
      return;
    }
    const medicoId = Number(stored);

    getPacientesPorMedico(medicoId)
      .then(data => setPacientes(data))
      .catch(err => {
        console.error(err);
        // opcional: toast de erro
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed h-screen w-screen flex flex-col">
      <BarraLateral />

      <div className="flex flex-col justify-center items-center pt-10 w-full h-screen">
        <div className="flex w-[70%] justify-start">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 bg-white hover:bg-gray-200 text-[#386e1e] rounded transition font-semibold shadow"
          >
            Voltar
          </button>
        </div>

        <div className="flex w-[70%]">
          <p className="font-semibold text-white text-lg">Lista de pacientes</p>
        </div>

        <div className="p-4 w-[75%] min-h-[70%] border rounded-md bg-white border-gray-400">
          <div className="flex mb-4">
            <div className="relative flex-1 ml-14 max-w-xs">
              <input
                type="text"
                placeholder="Pesquisa"
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#5C8354] bg-[#fafbfe]"
                // opcional: onChange para filtro em cliente
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C8354] text-lg pointer-events-none" />
            </div>
            <div className="flex md:flex-grow" />

            <button
              onClick={() => navigate("/cadastroPaciente")}
              className="ml-4 mr-1 flex items-center justify-center w-9 h-9 rounded-full bg-lime-400 hover:bg-lime-500 transition text-white text-xl"
              title="Adicionar paciente"
            >
              <FaPlus />
            </button>
          </div>

          {loading ? (
            <p>Carregando pacientes…</p>
          ) : pacientes.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum paciente encontrado.</p>
          ) : (
            pacientes.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/dadosPaciente/${p.id}`)}
                className="cursor-pointer hover:bg-gray-100 rounded"
              >
                <ItemListaPaciente
                  abrirAba={() => navigate(`/dadosPaciente/${p.id}`)}
                  paciente={{
                    id: p.id,
                    nome: p.nome_completo,
                    fotoUrl: "/paciente.png",
                    glicose: 0,
                    insulina: 0,
                    idade: 0,
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Paciente;
