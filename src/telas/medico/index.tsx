import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import { useEffect, useState } from "react";
import { getPacientesPorMedico } from "../../services/api"; // ajuste o caminho se necessário

function Medico() {
  const navigate = useNavigate();
  const [nomeMedico, setNomeMedico] = useState<string>("");
  const [numPacientes, setNumPacientes] = useState<number>(0);

  useEffect(() => {
    const nome = localStorage.getItem("medicoNome");
    if (nome) setNomeMedico(nome);

    const medicoId = localStorage.getItem("medicoId"); // ou de onde você salva o id do médico
    if (!medicoId) return;

    // Buscar número de pacientes
    const fetchPacientes = async () => {
      try {
        const pacientes = await getPacientesPorMedico(Number(medicoId));
        setNumPacientes(pacientes.length);
      } catch (err) {
        setNumPacientes(0);
      }
    };
    fetchPacientes();
  }, []);

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#386e1e] via-[#7bb661] to-[#b6e2b3]">
      {/* Barra lateral fixa */}
      <div className="w-[200px] min-h-screen bg-[#386e1e]/80 shadow-2xl z-50">
        <BarraLateral />
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center">
        {/* Header com foto e nome */}
        <div className="flex justify-center pt-10 w-full">
          <div className="flex items-center pl-2 w-[70%] h-20 bg-white border border-[#E3E9DF] rounded-2xl shadow-lg">
            <div className="w-20 h-20 overflow-hidden rounded-full shadow-md border-4 border-[#5C8354] bg-[#F6F8F3] -mt-8">
              <img
                src="/medico.png"
                alt="Foto do Médico"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pl-4 text-2xl font-bold text-[#38702A]">
              Dr. {nomeMedico ? capitalizeFirstLetter(nomeMedico) : "Médico"}
            </div>
          </div>
        </div>
        {/* Cards principais */}
        <div className="flex flex-col md:flex-row w-[70%] mt-10 gap-6">
          {/* Card de informações */}
          <div className="md:w-[50%] bg-white border border-[#E3E9DF] rounded-2xl shadow-lg pt-6 pb-6 px-6 md:mr-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#38702A] mb-2">
                Bem-vindo!
              </h1>
              <p className="text-[#38702A] mt-2 ml-2">
                Aqui, você tem acesso em tempo real às informações essenciais sobre seus pacientes.
              </p>
            </div>
            <div className="mt-8">
              <p className="text-[#38702A] mt-2 ml-2 font-medium">
                Número de pacientes: <span className="font-bold">{numPacientes}</span>
              </p>
            </div>
          </div>
          {/* Card de cadastro de paciente */}
          <div className="md:mt-0 mt-4 flex justify-center items-center md:w-[50%] bg-white border border-[#E3E9DF] rounded-2xl shadow-lg pt-6 pb-6 px-6">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden mr-4 border-4 border-[#5C8354] shadow-md bg-[#F6F8F3] flex-shrink-0">
              <img src="/iconeNovoPaciente.png" alt="Novo Paciente" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-2xl font-bold text-[#38702A] mb-2">
                Cadastrar novos Pacientes
              </p>
              <button
                onClick={() => navigate("/cadastroPaciente")}
                className="bg-gradient-to-r from-[#5C8354] to-[#38702A] hover:from-[#38702A] hover:to-[#5C8354] transition-all duration-100 text-white font-bold py-2 px-6 rounded-full mt-2 shadow"
              >
                Cadastro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medico;