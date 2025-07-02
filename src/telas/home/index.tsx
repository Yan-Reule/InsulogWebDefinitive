import { useNavigate } from "react-router-dom";
import TopBar from "../../componentes/topBar";
import { login } from "../../services/api";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { id, nome } = await login({ email, senha });
            toast.success('Login efetuado com sucesso!');
            // opcional: salvar id/token em localStorage
            localStorage.setItem('medicoId', String(id));
            localStorage.setItem('medicoNome', nome);
            navigate('/medico');  // rota do dashboard
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                toast.error('E-mail ou senha inválidos');
            } else {
                toast.error('Erro no login. Tente novamente.');
            }
        }
    };

    const irParaCadMedico = () => {
        navigate('/cadMedico');
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full
                         focus:outline-none focus:border-[#5C8354] text-base"
                        />
                        <input
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full
                         focus:outline-none focus:border-[#5C8354] text-base"
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
                            onClick={handleSubmit}
                            className="w-full bg-[#5C8354] text-white py-3 rounded-md text-lg
                         font-medium hover:bg-[#46633e] transition"
                        >
                            Entrar
                        </button>
                    </form>
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Novo Aqui?{' '}
                        <a href="#" onClick={irParaCadMedico} className="text-[#5C8354] hover:underline">Criar uma nova conta</a>
                    </div>
                </div>
            </div>

        </main>
    );
}