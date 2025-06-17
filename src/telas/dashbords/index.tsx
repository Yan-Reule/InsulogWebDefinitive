import { useNavigate } from "react-router-dom";
import TopBar from "../../componentes/topBar";
import { Menu } from "@mui/material";
import MenuBar from "../../componentes/menuBar";
import BarraLateral from "../../componentes/menuBar";

export default function Dashboards() {

    const navigate = useNavigate();

    const irParaDash = () => {
        navigate('/dashbords');
    };

    return (
        <main className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed  from-[#5C8354] to-[#cbffc0]  h-screen  min-h-screen ">
            <div className="flex ">

                <BarraLateral />
            </div>
            <div className="h-screen flex flex-col items-center justify-center ">
                
            </div>

        </main>
    );
}