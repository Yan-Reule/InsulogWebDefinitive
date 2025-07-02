import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BarraLateral from "../../componentes/menuBar";

function PrescricaoPaciente() {
  const navigate = useNavigate();

  // States para os campos do formulário
  const [tipoDiabetes, setTipoDiabetes] = useState("");
  const [dataDiagnostico, setDataDiagnostico] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState("");
  const [usaInsulina, setUsaInsulina] = useState("");
  const [historicoFamiliar, setHistoricoFamiliar] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [comorbidades, setComorbidades] = useState("");

  useEffect(() => {
    if (peso && altura) {
      const alturaM = parseFloat(altura) / 100;
      if (alturaM > 0) {
        const imcCalc = (parseFloat(peso) / (alturaM * alturaM)).toFixed(2);
        setImc(imcCalc);
      }
    } else {
      setImc("");
    }
  }, [peso, altura]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#386e1e] via-[#7bb661] to-[#b6e2b3]">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#5C8354]/60 via-transparent to-transparent pointer-events-none z-0" />
      {/* Barra lateral fixa */}
      <div className="w-[200px] min-h-screen bg-[#386e1e]/80 shadow-2xl z-50">
        <BarraLateral />
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-start mt-12">
        {/* Header com botão voltar e título */}
        <div className="flex w-full max-w-5xl pt-8 px-4 sm:px-10 md:px-0 items-center justify-between">
          <p className="font-semibold text-[#ffffff] text-2xl mb-0">
            Registro de Pacientes - Informações Médicas
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2 bg-white border border-[#E3E9DF] hover:bg-[#eafbe6] text-[#38702A] rounded-full shadow font-semibold transition"
          >
            <BiArrowBack size={22} />
            Voltar
          </button>
        </div>
        {/* Card principal */}
        <div className="w-full max-w-5xl bg-white border border-[#E3E9DF] rounded-2xl mt-4 p-4 sm:p-8 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar e nome */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/4 mb-6 md:mb-0">
              <img
                src="/medico.png"
                alt="Paciente"
                className="w-24 h-24 rounded-full object-cover bg-[#5C8354] mb-2 border-4 border-[#5C8354] shadow"
              />
              <span className="font-semibold text-[#5C8354] text-lg mb-4">
                Paciente 1
              </span>
            </div>
            {/* Formulário */}
            <form className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Diabetes */}
              <div>
                <label className="font-bold text-[#386e1e]">
                  Tipo de Diabetes
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipoDiabetes"
                      value="pre"
                      checked={tipoDiabetes === "pre"}
                      onChange={() => setTipoDiabetes("pre")}
                      className="accent-[#5C8354]"
                    />
                    Pré-Diabetes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipoDiabetes"
                      value="tipo1"
                      checked={tipoDiabetes === "tipo1"}
                      onChange={() => setTipoDiabetes("tipo1")}
                      className="accent-[#5C8354]"
                    />
                    Diabetes Tipo 1
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipoDiabetes"
                      value="tipo2"
                      checked={tipoDiabetes === "tipo2"}
                      onChange={() => setTipoDiabetes("tipo2")}
                      className="accent-[#5C8354]"
                    />
                    Diabetes Tipo 2
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipoDiabetes"
                      value="gestacional"
                      checked={tipoDiabetes === "gestacional"}
                      onChange={() => setTipoDiabetes("gestacional")}
                      className="accent-[#5C8354]"
                    />
                    Diabetes Gestacional
                  </label>
                </div>
              </div>
              {/* Dados médicos */}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#386e1e]">
                  Data do Diagnóstico
                </label>
                <input
                  type="date"
                  value={dataDiagnostico}
                  onChange={(e) => setDataDiagnostico(e.target.value)}
                  className="border border-[#E3E9DF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C8354]"
                />
                <label className="font-bold text-[#386e1e] mt-2">
                  Peso Atual (kg)
                </label>
                <input
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  className="border border-[#E3E9DF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C8354]"
                />
                <label className="font-bold text-[#386e1e] mt-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="border border-[#E3E9DF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C8354]"
                />
                <label className="font-bold text-[#386e1e] mt-2">IMC</label>
                <input
                  type="text"
                  value={imc}
                  readOnly
                  className="border border-[#E3E9DF] rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>
              {/* Uso de Insulina */}
              <div>
                <label className="font-bold text-[#386e1e]">
                  Uso de Insulina?
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="insulina"
                      value="sim"
                      checked={usaInsulina === "sim"}
                      onChange={() => setUsaInsulina("sim")}
                      className="accent-[#5C8354]"
                    />
                    Sim
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="insulina"
                      value="nao"
                      checked={usaInsulina === "nao"}
                      onChange={() => setUsaInsulina("nao")}
                      className="accent-[#5C8354]"
                    />
                    Não
                  </label>
                </div>
              </div>
              {/* Histórico familiar */}
              <div>
                <label className="font-bold text-[#386e1e]">
                  Histórico familiar de diabetes?
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="historico"
                      value="sim"
                      checked={historicoFamiliar === "sim"}
                      onChange={() => setHistoricoFamiliar("sim")}
                      className="accent-[#5C8354]"
                    />
                    Sim
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="historico"
                      value="nao"
                      checked={historicoFamiliar === "nao"}
                      onChange={() => setHistoricoFamiliar("nao")}
                      className="accent-[#5C8354]"
                    />
                    Não
                  </label>
                </div>
              </div>
              {/* Medicamentos */}
              <div className="md:col-span-2">
                <label className="font-bold text-[#386e1e]">
                  Uso de Medicamentos? Sim/Qual?
                </label>
                <input
                  type="text"
                  value={medicamentos}
                  onChange={(e) => setMedicamentos(e.target.value)}
                  className="w-full border border-[#E3E9DF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C8354]"
                />
              </div>
              {/* Comorbidades */}
              <div className="md:col-span-2">
                <label className="font-bold text-[#386e1e]">
                  Presença de Comorbidades?
                </label>
                <input
                  type="text"
                  value={comorbidades}
                  onChange={(e) => setComorbidades(e.target.value)}
                  className="w-full border border-[#E3E9DF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C8354]"
                />
              </div>
              {/* Botão finalizar */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/dadosPaciente");
                  }}
                  className="bg-gradient-to-r from-[#5C8354] to-[#38702A] hover:from-[#38702A] hover:to-[#5C8354] transition-all duration-100 text-white font-bold py-2 px-8 rounded-full shadow w-full sm:w-auto"
                >
                  FINALIZAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescricaoPaciente;
