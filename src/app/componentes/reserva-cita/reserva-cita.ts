import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MedicoService } from '../../servicios/medico.service';
import { CitaService } from '../../servicios/cita.service';
import { Medico } from '../../modelos/Medico';

@Component({
  selector: 'app-reserva-cita',
  imports: [FormsModule, RouterLink],
  templateUrl: './reserva-cita.html',
  styleUrl: './reserva-cita.css',
})
export class ReservaCita implements OnInit {
  private ruta = inject(ActivatedRoute);
  private medicoService = inject(MedicoService);
  private citaService = inject(CitaService);

  medico = signal<Medico | null>(null);
  horarios = signal<string[]>([]);
  horarioElegido = signal<string | null>(null);

  // Datos del formulario
  dia = '';
  dni = '';
  nombre = '';
  celular = '';

  mensajeError = signal<string | null>(null);
  mensajeExito = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('medicoId'));
    this.medicoService.obtener(id).subscribe((m) => this.medico.set(m));
  }

  buscarHorarios(): void {
    this.mensajeError.set(null);
    this.horarioElegido.set(null);
    const id = this.medico()?.id;
    if (!id || !this.dia) return;
    this.medicoService.disponibilidad(id, this.dia).subscribe({
      next: (h) => this.horarios.set(h),
      error: () => this.mensajeError.set('No se pudo cargar la disponibilidad.'),
    });
  }

  elegir(horario: string): void {
    this.horarioElegido.set(horario);
  }

  // Muestra solo la hora (ej: "10:00") a partir del ISO que devuelve el backend.
  soloHora(iso: string): string {
    return iso.substring(11, 16);
  }

  get formularioValido(): boolean {
    return (
      this.horarioElegido() !== null &&
      /^\d{8}$/.test(this.dni) &&
      this.nombre.trim().length > 0 &&
      /^9\d{8}$/.test(this.celular)
    );
  }

  confirmar(): void {
    this.mensajeError.set(null);
    this.mensajeExito.set(null);
    const medico = this.medico();
    const horario = this.horarioElegido();
    if (!medico || !horario) return;

    this.citaService
      .reservar({
        medicoId: medico.id,
        fechaHora: horario,
        pacienteDni: this.dni,
        pacienteNombre: this.nombre,
        pacienteCelular: this.celular,
      })
      .subscribe({
        next: () => {
          this.mensajeExito.set('Cita reservada correctamente. Revisa "Mis citas".');
          this.buscarHorarios(); // refresca: el horario tomado ya no aparece
        },
        error: (err) => {
          // 409 = horario ocupado, 400 = validacion, etc. El backend manda el mensaje.
          const msg = err?.error?.mensaje ?? 'No se pudo reservar la cita.';
          this.mensajeError.set(msg);
        },
      });
  }
}
