import { Navigate, useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import ItemListaPaciente from "../../componentes/intemListaPacientes";
import { FaPlus, FaSearch } from "react-icons/fa";

function Paciente() {
  const navigate = useNavigate();

  const pacienteExemplo = {
    id: 1,
    nome: "Paciente 1",
    fotoUrl: "/medico.png",
    glicose: 100,
    insulina: 10,
    idade: 35,
  };

  const pacientes = [
    pacienteExemplo,
    pacienteExemplo,
    pacienteExemplo,
    pacienteExemplo,
    pacienteExemplo,
  ];

  return (
    <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed  from-[#5C8354] to-[#cbffc0]  h-screen w-screen items-center flex flex-col">
      <BarraLateral />
      <div className="flex  flex-col justify-center items-center pt-10 w-full h-screen">
        <div className="flex w-[70%] justify-start ">
          <button
            onClick={() => navigate(-1)}
            className="  flex items-center gap-2 px-4  bg-[#ffffff] hover:bg-[#d4d4d4] text-[#386e1e] rounded transition font-semibold shadow"
          >
            {" "}
            Voltar
          </button>
        </div>
        <div className="flex w-[70%] ">
          <p className=" font-semibold text-white text-lg">
            Lista de pacientes
          </p>
        </div>
        <div className="p-4 w-[75%] min-h-[70%] border rounded-md bg-white border-gray-400">
          <div className="flex mb-4">
            <div className="relative flex-1 ml-14 max-w-xs">
              <input
                type="text"
                placeholder="Pesquisa"
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#5C8354] text-gray-700 bg-[#fafbfe] placeholder:text-gray-400"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C8354] text-lg pointer-events-none" />
            </div>
            <div className="flex  md:flex-grow" />
            <button
              onClick={() => {
                navigate("/cadastroPaciente");
              }}
              className="ml-4 mr-1 flex items-center justify-center w-9 h-9 rounded-full bg-lime-400 hover:bg-lime-500 transition text-white text-xl"
              title="Adicionar paciente"
            >
              <FaPlus />
            </button>
          </div>
          {pacientes.map((paciente, index) => (
            <div onClick={() => navigate("/dadosPaciente")}>
              <ItemListaPaciente
                abrirAba={() => {}}
                key={paciente.id + "-" + index}
                paciente={paciente}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Paciente;
