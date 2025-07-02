import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BarraLateral from '../../componentes/menuBar';// ajuste o caminho se necessário
import { createPaciente, type PacienteData } from '../../services/api';

export default function CadastroPaciente() {
  const navigate = useNavigate();

  // estados para cada campo
  const [email, setEmail] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [planoSaude, setPlanoSaude] = useState('');
  const [numeroProntuario, setNumeroProntuario] = useState('');
  const [medicoId, setMedicoId] = useState<number | null>(null);

  // recupera o ID do médico logado
  useEffect(() => {
    const stored = localStorage.getItem('medicoId');
    if (!stored) {
      toast.error('Sessão expirada. Faça login novamente.');
      navigate('/login');
      return;
    }
    setMedicoId(Number(stored));
  }, [navigate]);

  // handler de submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!medicoId) {
      toast.error('Não foi possível identificar o médico logado.');
      return;
    }

    // validações básicas
    if (!nomeCompleto || !email || !cpf || !senha) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dados: PacienteData = {
      nome_completo:    nomeCompleto,
      email,
      cpf,
      celular:          celular || undefined,
      senha,
      plano_saude:      planoSaude || undefined,
      numero_prontuario: numeroProntuario || undefined,
      id_medico:        medicoId,
    };

    try {
      const resp = await createPaciente(dados);
      toast.success('Paciente cadastrado com sucesso!');
      // redireciona para a lista de pacientes, ou volta à tela anterior
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao cadastrar paciente. Tente novamente.');
    }
  };

    return (
    <div className="bg-gradient-to-br from-[#386e1e] via-[#7bb661] to-[#b6e2b3] min-h-screen w-screen flex flex-col md:flex-row">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#5C8354]/60 via-transparent to-transparent pointer-events-none z-0" />
      {/* Menu lateral */}
      <div className="w-full md:w-[200px] min-h-[60px] md:min-h-screen bg-[#386e1e]/90 shadow-2xl z-10 flex-shrink-0">
        <BarraLateral />
      </div>
      {/* Conteúdo principal */}
      <div className="flex-1 bg-gradient-to-br from-[#386e1e] via-[#7bb661] to-[#b6e2b3] flex flex-col items-center justify-center py-4 px-2 sm:px-4 md:px-0">
        <div className="w-full max-w-3xl">
          {/* Botão voltar */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E3E9DF] hover:bg-[#eafbe6] text-[#38702A] rounded-full shadow mb-4 font-semibold transition float-none md:float-right mx-auto md:mx-0"
          >
            <BiArrowBack size={22} />
            Voltar
          </button>
          {/* Card de cadastro */}
          <div className="clear-both bg-white rounded-2xl shadow-lg border border-[#E3E9DF] p-3 sm:p-6 md:p-8 mt-4 sm:mt-8 md:mt-16">
            <h2 className="text-xl sm:text-3xl font-bold text-[#38702A] mb-1 text-center">
              Cadastro de Paciente
            </h2>
            <p className="text-[#38702A] text-center mb-4 sm:mb-8 font-medium">
              Preencha os dados abaixo para cadastrar um novo paciente.
            </p>
            <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
              {/* Foto e ações */}
              <div className="flex flex-col items-center md:w-1/3 w-full">
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src="medico.png"
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#5C8354] shadow"
                    alt="Foto do paciente"
                  />
                </div>
                <button className="text-[#5C8354] hover:underline mb-1 text-xs sm:text-sm font-semibold">
                  Importar foto
                </button>
                <button className="text-red-500 hover:underline text-xs sm:text-sm font-semibold">
                  Deletar foto
                </button>
              </div>
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="col-span-1 sm:col-span-2 border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <input
              value={nomeCompleto}
              onChange={e => setNomeCompleto(e.target.value)}
              type="text"
              placeholder="Nome Completo"
              className="col-span-1 sm:col-span-2 border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <input
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              type="text"
              placeholder="CPF"
              className="border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <input
              value={celular}
              onChange={e => setCelular(e.target.value)}
              type="text"
              placeholder="Celular"
              className="border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <input
              value={senha}
              onChange={e => setSenha(e.target.value)}
              type="password"
              placeholder="Senha"
              className="border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <input
              value={planoSaude}
              onChange={e => setPlanoSaude(e.target.value)}
              type="text"
              placeholder="Plano de Saúde"
              className="col-span-1 sm:col-span-2 border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <input
              value={numeroProntuario}
              onChange={e => setNumeroProntuario(e.target.value)}
              type="text"
              placeholder="Nº Prontuário"
              className="col-span-1 sm:col-span-2 border rounded-lg px-3 py-2 focus:ring-[#5C8354]"
            />
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-gradient-to-r from-[#5C8354] to-[#38702A] text-white font-bold py-2 rounded-full shadow"
            >
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
