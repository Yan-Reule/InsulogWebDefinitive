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
    <div className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed from-[#5C8354] to-[#cbffc0] min-h-screen w-full flex flex-col items-center">
      <BarraLateral />
      <div className="flex flex-col justify-center items-center pt-6 w-full min-h-screen">
        <div className="flex w-full max-w-6xl px-4 sm:px-6 md:px-8 justify-start">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 bg-[#ffffff] hover:bg-[#d4d4d4] text-[#386e1e] rounded transition font-semibold shadow"
          >
            <BiArrowBack size={22} /> Voltar
          </button>
        </div>
        <div className="flex w-full max-w-6xl px-4 sm:px-6 md:px-8 mt-2">
          <p className="font-semibold text-white text-lg">
            Registro de Pacientes - Informações Médicas
          </p>
        </div>
        <div className="w-full max-w-6xl bg-white border border-gray-400 rounded-md mt-4 p-4 sm:p-6 md:p-10 min-h-[70%]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar e nome */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/4 mb-6 md:mb-0">
              <img
                src="/medico.png"
                alt="Paciente"
                className="w-24 h-24 rounded-full object-cover bg-[#5C8354] mb-2"
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
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                />
                <label className="font-bold text-[#386e1e] mt-2">
                  Peso Atual (kg)
                </label>
                <input
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                />
                <label className="font-bold text-[#386e1e] mt-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                />
                <label className="font-bold text-[#386e1e] mt-2">IMC</label>
                <input
                  type="text"
                  value={imc}
                  readOnly
                  className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5C8354]"
                />
              </div>
              {/* Botão finalizar */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={() => {
                    navigate("/dadosPaciente");
                  }}
                  className="bg-[#5C8354] hover:bg-[#456340] transition-all duration-100 text-white font-bold py-2 px-8 rounded shadow w-full sm:w-auto"
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
