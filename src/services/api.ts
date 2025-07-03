// api.ts
import axios from 'axios';

// Use o endereço do backend (ajuste a porta se necessário)
const baseURL = 'http://localhost:3000'; // ou o IP do servidor se for remoto

export const api = axios.create({
  baseURL,
});



export interface RegistroGlicose {
  id_registro: number;
  id_usuario: number;
  glicose: number;
  insulina: number;
  tipo_insulina: number;
  id_periodo: number;
  periodo: string;
  data_hora: string;
  hora: string;
}

export const getRegistrosGlicosePorUsuario = async (id_usuario: number): Promise<RegistroGlicose[]> => {
  const resp = await api.get<RegistroGlicose[]>(`/RegistroGlicose/usuario/${id_usuario}`);
  return resp.data;
};


export const getPacientePorId = async (id: number): Promise<PacienteResumo> => {
  const resp = await api.get<PacienteResumo>(`/Paciente/${id}`);
  return resp.data;
};

// Dados de login
export interface LoginData {
  email: string;
  senha:  string;
}

// Esperamos de volta pelo menos o ID do usuário
export interface LoginResponse {
  id: number;
  nome: string;
}

// Função de login
export const login = async (data: LoginData): Promise<LoginResponse> => {
  const resp = await api.post<LoginResponse>('/login', data);
  return resp.data;
};

// Defina a interface dos dados que vai enviar:
export interface MedicoData {
  nome: string;
  email: string;
  senha: string;
  crm:   string;
  tipo_usuario: string; // 'medico' ou outro tipo se necessário
}

// E o que espera de volta:
export interface MedicoResponse {
  id:      number;
  message: string;
}

// Função para chamar o endpoint:
export const createMedico = async (
  data: MedicoData
): Promise<MedicoResponse> => {
  const response = await api.post<MedicoResponse>('/Medico', data);
  return response.data;
};



// api.ts (no final do arquivo)

export interface PacienteResumo {
  id: number;
  email: string;
  nome_completo: string;
  cpf: string;
  celular?: string;
  plano_saude?: string;
  numero_prontuario?: string;
}

export const getPacientesPorMedico = async (
  medicoId: number
): Promise<PacienteResumo[]> => {
  const resp = await api.get<PacienteResumo[]>(`/Paciente/medico/${medicoId}`);
  return resp.data;
};


export interface PacienteData {
  nome_completo: string;
  email:         string;
  cpf:           string;
  celular?:      string;
  senha:         string;
  plano_saude?:  string;
  numero_prontuario?: string;
  id_medico:     number;
}

export interface PacienteResponse {
  id:      number;
  message: string;
}

/**
 * Chama POST /Paciente para criar um novo paciente
 */
export const createPaciente = async (
  data: PacienteData
): Promise<PacienteResponse> => {
  const resp = await api.post<PacienteResponse>('/Paciente', data);
  return resp.data;
};

// Funções de acesso à API (mantidas iguais)
export const getUsuarios = async () => {
  try {
    const response = await api.get('/Usuarios');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Usuario:', error);
    throw error;
  }
};

export const getPeriodo = async () => {
  try {
    const response = await api.get('/Periodo');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Periodos:', error);
    throw error;
  }
};

export const getRegistroGlicose = async () => {
  try {
    const response = await api.get('/RegistroGlicose');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar registros de glicose:', error);
    throw error;
  }
};

 export interface RegistroGlicoseData {
   id_usuario:       number;
   nivel_glicose:    number;
   data_hora:        string;
   id_periodo:       number;
  tipo_insulina:    number;
  unidade_insulina: string;
}


export interface RegistroGlicoseResponse {
  id:      number;
  message: string;
}

export const createRegistroGlicose = async (
  data: RegistroGlicoseData
): Promise<RegistroGlicoseResponse> => {
  const resp = await api.post<RegistroGlicoseResponse>(
    '/RegistrarGlicose',
    data
  );
  return resp.data;
};

export interface DeleteRegistroGlicoseResponse {
    // Defina os campos retornados pela API ao excluir, se houver
    message?: string;
    success?: boolean;
}

export const deleteRegistroGlicose = async (id: number): Promise<DeleteRegistroGlicoseResponse> => {
    try {
        const response = await api.delete<DeleteRegistroGlicoseResponse>(`/ExcluirRegistroGlicose/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir registro de glicose:', error);
        throw error;
    }
};

export interface EditRegistroGlicoseData {
    id_usuario: number;
    nivel_glicose: number;
    data_hora: string;
    id_periodo: number;
    tipo_insulina: number;
    unidade_insulina: string;
}

export const editRegistroGlicose = async (
    id: number,
    data: EditRegistroGlicoseData
) => {
    try {
        const response = await api.put(`/EditarRegistroGlicose/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao editar registro de glicose:', error);
        throw error;
    }
};

export async function deletePaciente(id: number) {
  try {
    const resp = await api.delete(`/Paciente/${id}`);
    return resp.data;
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    throw error;
  }
}

export async function editPaciente(id: number, data: any) {
  try {
    const resp = await api.put(`/Paciente/${id}`, data);
    return resp.data;
  } catch (error) {
    console.error('Erro ao editar paciente:', error);
    throw error;
  }
}

export default api;