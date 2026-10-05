import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../servicios/medico.service';
import { Medico } from '../../modelos/Medico';

@Component({
  selector: 'app-admin-medicos',
  imports: [FormsModule],
  templateUrl: './admin-medicos.html',
  styleUrl: './admin-medicos.css',
})
export class AdminMedicos implements OnInit {
  private medicoService = inject(MedicoService);

  medicos = signal<Medico[]>([]);

  // Formulario: si editandoId es null, es alta; si tiene valor, es edicion.
  editandoId = signal<number | null>(null);
  nombre = '';
  especialidad = '';
  distrito = '';
  sede = '';
  calificacion = 0;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.medicoService.listar().subscribe((data) => this.medicos.set(data));
  }

  get formularioValido(): boolean {
    return (
      this.nombre.trim().length > 0 &&
      this.especialidad.trim().length > 0 &&
      this.distrito.trim().length > 0
    );
  }

  guardar(): void {
    if (!this.formularioValido) return;
    const datos = {
      nombre: this.nombre,
      especialidad: this.especialidad,
      distrito: this.distrito,
      sede: this.sede,
      calificacion: this.calificacion,
    };
    const id = this.editandoId();
    const peticion = id
      ? this.medicoService.actualizar(id, datos)
      : this.medicoService.crear(datos);
    peticion.subscribe(() => {
      this.limpiar();
      this.cargar();
    });
  }

  editar(m: Medico): void {
    this.editandoId.set(m.id);
    this.nombre = m.nombre;
    this.especialidad = m.especialidad;
    this.distrito = m.distrito;
    this.sede = m.sede;
    this.calificacion = m.calificacion;
  }

  eliminar(id: number): void {
    this.medicoService.eliminar(id).subscribe(() => this.cargar());
  }

  limpiar(): void {
    this.editandoId.set(null);
    this.nombre = '';
    this.especialidad = '';
    this.distrito = '';
    this.sede = '';
    this.calificacion = 0;
  }
}
