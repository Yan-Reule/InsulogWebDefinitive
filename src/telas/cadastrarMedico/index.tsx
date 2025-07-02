import { useNavigate } from "react-router-dom";
import TopBar from "../../componentes/topBar";
import { createMedico } from "../../services/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CadMedico() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [crm, setCrm] = useState('');
    const [senha, setSenha] = useState('');
    const tipo_usuario = 'medico'; // Definindo o tipo como 'medico' para o cadastro

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMedico({ nome, email, senha, crm, tipo_usuario });
           toast.success('Médico cadastrado com sucesso!'); 
            navigate('/');  // ou outra rota de lista/confirm
        } catch (err) {
            console.error(err);
           toast.error('Erro ao cadastrar o médico.');    
        }
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

                    <h1 className="text-4xl font-semibold mb-8 text-center">Cadastro</h1>
                    <form className="w-4/5 max-w-sm flex flex-col gap-5">
                        <input
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#5C8354] text-base"
                        />
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#5C8354] text-base"
                        />
                        <input
                            value={crm}
                            onChange={e => setCrm(e.target.value)}
                            type="text"
                            placeholder="CRM"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#5C8354] text-base"
                        />
                        <input
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#5C8354] text-base"
                        />

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-[#5C8354] text-white py-3 rounded-md text-lg font-medium"
                        >
                            Cadastrar
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

