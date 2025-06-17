import { useNavigate } from "react-router-dom";
import Dashboards from "../dashbords";
import TopBar from "../../componentes/topBar";

export default function Home() {
    const navigate = useNavigate();

    const irParaDash = () => {
        navigate('/medico');
    };

    return (
        <main className="w-full min-h-screen bg-gradient-to-br from-[#5C8354] to-[#cbffc0]">
            <div className="flex ">

                <TopBar />
            </div>
            <div className="h-screen flex flex-col items-center justify-center ">
                <div className="bg-white m-20 md:w-[500px] w-[400px]  py-10 rounded-[20px] flex flex-col justify-center items-center
                shadow-lg shadow-[#474747]
                ">

                    <h1 className="text-4xl font-semibold mb-8 text-center">Login</h1>
                    <form className="w-4/5 max-w-sm flex flex-col gap-5">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#5C8354] text-base"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#5C8354] text-base"
                        />
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="accent-[#5C8354]" />
                                Lembrar de mim
                            </label>
                            <a href="#" className="text-[#5C8354] hover:underline">Esqueci a senha!</a>
                        </div>
                        <button
                            type="submit"
                            onClick={irParaDash}
                            className="w-full bg-[#5C8354] text-white py-3 rounded-none rounded-md text-lg font-medium mt-2 hover:bg-[#46633e] transition"
                        >
                            Entrar
                        </button>
                    </form>
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Novo Aqui?{' '}
                        <a href="#" className="text-[#5C8354] hover:underline">Criar uma nova conta</a>
                    </div>
                </div>
            </div>

        </main>
    );
}