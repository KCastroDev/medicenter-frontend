import { Medico } from './Medico';

export interface Cita {
  id: number;
  medico: Medico;
  fechaHora: string;
  pacienteDni: string;
  pacienteNombre: string;
  pacienteCelular: string;
  estado: 'CONFIRMADA' | 'ATENDIDA' | 'CANCELADA';
}

export interface NuevaCita {
  medicoId: number;
  fechaHora: string;
  pacienteDni: string;
  pacienteNombre: string;
  pacienteCelular: string;
}
