
import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";


function Medico() {
  const navigate = useNavigate();


  return (
    <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed  from-[#5C8354] to-[#cbffc0]  h-screen w-screen items-center flex flex-col">
     <BarraLateral/>
      <div className="flex justify-center pt-10 w-full">
        <div className="flex justify-start items-center pl-2  w-[70%] h-14 border rounded-md bg-white border-gray-400">
          <div className="w-20 h-20  overflow-hidden rounded-full   shadow-md">
            <img
              src="/medico.png"
              alt="Foto do Médico"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pl-2 text-lg font-semibold">
            DR. Paulo
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-[70%]  mt-10">
        <div className="md:w-[50%] shadow-lg shadow-[#0000005d] border rounded-md bg-white border-gray-400 pt-2 pb-4 px-4 md:mr-4">
          <div className="text-start">
            <h1 className="text-4xl font-bold text-gray-900">
              Bem-vindo!
            </h1>
            <p className="text-gray-800 mt-2 ml-4">
              Aqui, você tem acesso em tempo real às
              informações essenciais sobre seus pacientes
            </p>
          </div>
          <div className="text-start mt-8">
            <p className="text-gray-800 mt-2 ml-4">
              Numero de pacientes: 10
            </p>
            <p className="text-gray-800 mt-2 ml-4">
              Ultima Atualização: 10 min
            </p>
          </div>
        </div>
        <div className="md:mt-0 mt-4  flex justify-center  shadow-lg shadow-[#0000005d] items-center md:w-[50%] border rounded-md bg-white border-gray-400 pt-2 pb-4 px-4">
          <div className="w-[150px] rounded-full overflow-hidden mr-3">
            <img src="/iconeNovoPaciente.png" alt="Foto do Médico" className="w-full h-full object-cover" />
          </div>
          <div className="">
            <p className="text-2xl text-start font-bold text-gray-900">
              Cadastrar novos
              Pacientes
            </p>
            <button
              onClick={() => {
                navigate("/cadastroPaciente")
              }}
              className="bg-[#5C8354] hover:bg-[#456340] transition-all duration-100 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medico;