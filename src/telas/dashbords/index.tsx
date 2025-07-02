import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";
import { useEffect, useState } from "react";

export default function Dashboards() {
    const navigate = useNavigate();
    const [nomeMedico, setNomeMedico] = useState<string>("");

    useEffect(() => {
        // Recupera o nome do médico do localStorage
        const nome = localStorage.getItem("medicoNome");
        if (nome) setNomeMedico(nome);
    }, []);

    return (
        <main className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed  from-[#5C8354] to-[#cbffc0]  h-screen  min-h-screen ">
            <div className="flex ">

                <BarraLateral />
            </div>
            <div className="h-screen flex flex-col items-center justify-center ">
                {nomeMedico && (
                  <h2 className="text-2xl font-bold text-[#38702A] mb-4">Bem-vindo, {nomeMedico}!</h2>
                )}
            </div>

        </main>
    );
}