
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";

function CadastroPaciente() {
    const navigate = useNavigate();

    return (

        <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed  from-[#5C8354] to-[#cbffc0]  h-screen w-screen items-center flex flex-col">
            <BarraLateral />
            <div className="flex  flex-col justify-center items-center pt-10 w-full h-screen">
                <div className="flex w-[70%] justify-start ">

                    <button
                        onClick={() => navigate(-1)}
                        className="  flex items-center gap-2 px-4  bg-[#ffffff] hover:bg-[#d4d4d4] text-[#386e1e] rounded transition font-semibold shadow"
                    > Voltar
                    </button>
                </div>
                <div className="flex w-[70%] ">
                    <p className=" font-semibold text-white text-lg">
                        Cadastrar pacientes
                    </p>
                </div>
                <div className="p-4 w-[75%] min-h-[70%] border rounded-md bg-white border-gray-400">


                   

                      
                            

                            {/* Formulário */}
                            <div className="md:flex  pt-4 pb-6 px-6">
                                <form className="w-full grid grid-cols-1 gap-4 mr-4">
                                    {/* Email */}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />

                                    {/* Nome Completo */}
                                    <input
                                        type="text"
                                        placeholder="Nome Completo"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />

                                    {/* CPF */}
                                    <input
                                        type="text"
                                        placeholder="CPF"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />

                                    {/* Celular */}
                                    <input
                                        type="text"
                                        placeholder="Celular"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />

                                    {/* Senha */}
                                    <input
                                        type="password"
                                        placeholder="Senha"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />

                                    {/* Confirmar Senha */}
                                    <input
                                        type="password"
                                        placeholder="Confirmar Senha"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />
                                </form>
                                <div className="w-full">
                                    <div>
                                        <div className="flex items-center mb-4 mt-4 md:mt-0">
                                            <img
                                                src="maisUsuario.png"
                                                className="w-24 h-24 rounded-full object-cover bg-[#5C8354] mr-4"
                                            />
                                            <div className="text-left text-[#5C8354]">
                                                <p className="text-gray-00 font-medium hover:cursor-pointer">Importar foto</p>
                                                <p className="text-gray-00 font-medium hover:cursor-pointer">Deletar foto</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Plano de Saúde"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354] mb-4"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Nº Prontuário"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                                    />
                                    <button
                                        onClick={() => {
                                            navigate("/dadosPaciente")
                                        }}
                                        className="bg-[#5C8354] hover:bg-[#456340] transition-all duration-100 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </div>
                       
                    


                </div>
            </div>

        </div>
    );
}

export default CadastroPaciente;
