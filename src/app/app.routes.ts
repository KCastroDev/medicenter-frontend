import { Routes } from '@angular/router';
import { ListaMedicos } from './componentes/lista-medicos/lista-medicos';
import { ReservaCita } from './componentes/reserva-cita/reserva-cita';
import { MisCitas } from './componentes/mis-citas/mis-citas';
import { AdminMedicos } from './componentes/admin-medicos/admin-medicos';

export const routes: Routes = [
  { path: '', redirectTo: 'medicos', pathMatch: 'full' },
  { path: 'medicos', component: ListaMedicos },
  { path: 'reservar/:medicoId', component: ReservaCita },
  { path: 'mis-citas', component: MisCitas },
  { path: 'admin/medicos', component: AdminMedicos },
];
