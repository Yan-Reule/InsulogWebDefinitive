import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BarraLateral: React.FC = () => {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState<boolean>(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full ${
          !aberto ? "" : "w-0"
        } overflow-hidden h-min bg-white shadow-lg z-50`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => {
              setAberto(!aberto);
            }}
            className="bg-[#5C8354] hover:bg-[#456340] transition-all duration-100 text-white font-bold w-9 h-9 text-center text-2xl"
          >
            <BiChevronRight />
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full ${
          aberto ? "w-[200px]" : "w-[0px]"
        } transition-all duration-100 overflow-hidden bg-white shadow-lg z-50`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => {
              setAberto(!aberto);
            }}
            className="bg-[#5C8354] hover:bg-[#456340] transition-all duration-100 text-white font-bold w-9 h-9 text-center"
          >
            X
          </button>
        </div>
        <div className="p-4 pt-0 font-bold   border-gray-600 text-[#5C8354] text-3xl">
          INSULOG
        </div>
        <ul className="p-4 space-y-2 font-bold">
          <li
            onClick={() => {
              navigate("/medico");
            }}
            className="text-left p-2 hover:bg-[#5C8354] hover:text-white hover:cursor-pointer transition-all duration-150"
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/paciente");
            }}
            className="text-left p-2 hover:bg-[#5C8354] hover:text-white hover:cursor-pointer transition-all duration-150"
          >
            Meus Pacientes
          </li>
          <li
            onClick={() => {
              navigate("/cadastroPaciente");
            }}
            className="text-left p-2 hover:bg-[#5C8354] hover:text-white hover:cursor-pointer transition-all duration-150"
          >
            Cadastro
          </li>
          <li
            onClick={() => {
              navigate("/consulta");
            }}
            className="text-left p-2 hover:bg-[#5C8354] hover:text-white hover:cursor-pointer transition-all duration-150"
          >
            Consultas
          </li>
          <li
            onClick={() => {
              navigate("/");
            }}
            className="text-left p-2 hover:bg-[#5C8354] hover:text-white hover:cursor-pointer transition-all duration-150"
          >
            Sair
          </li>
        </ul>
      </div>
    </>
  );
};

export default BarraLateral;
