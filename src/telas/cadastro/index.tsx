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
    <div className="bg-gradient-to-br from-[#5C8354] via-[#cbffc0] to-[#e6ffe6] min-h-screen w-screen flex flex-col md:flex-row">
      <div className="w-full md:w-[200px] bg-[#386e1e]/80 shadow-2xl">
        <BarraLateral />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#A8E063] via-[#D0F5C3] to-[#F6F8F3]">
        <button
          onClick={() => navigate(-1)}
          className="self-end mb-4 flex items-center gap-2 px-4 py-2 bg-white border rounded-full shadow font-semibold text-[#38702A]"
        >
          <BiArrowBack size={22} /> Voltar
        </button>

        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border p-8">
          <h2 className="text-3xl font-bold text-[#38702A] mb-2 text-center">
            Cadastro de Paciente
          </h2>
          <p className="text-[#38702A] text-center mb-6">
            Preencha os dados abaixo para cadastrar um novo paciente.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Campos… */}
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
  );
}
