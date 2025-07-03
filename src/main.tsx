import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./telas/home/index.tsx";
import Dashboards from "./telas/dashbords/index.tsx";
import Medico from "./telas/medico/index.tsx";
import Paciente from "./telas/pacientes/index.tsx";
import DadosPaciente from "./telas/pacientes/dadosPaciente.tsx";
import CadastroPaciente from "./telas/cadastro/index.tsx";
import PrescricaoPaciente from "./telas/prescricao/index.tsx";
import CadMedico from "./telas/cadastrarMedico/index.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadMedico" element={<CadMedico />} />
        <Route path="/dashbords" element={<Dashboards />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/dadosPaciente/:id" element={<DadosPaciente />} />
        <Route path="/cadastroPaciente" element={<CadastroPaciente />} />
        <Route path="/prescricaoPaciente" element={<PrescricaoPaciente />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  </StrictMode>
);
