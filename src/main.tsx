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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashbords" element={<Dashboards />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/dadosPaciente" element={<DadosPaciente />} />
        <Route path="/cadastroPaciente" element={<CadastroPaciente />} />
        <Route path="/prescricaoPaciente" element={<PrescricaoPaciente />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
