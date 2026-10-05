import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../servicios/cita.service';
import { Cita } from '../../modelos/Cita';

@Component({
  selector: 'app-mis-citas',
  imports: [FormsModule],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css',
})
export class MisCitas {
  private citaService = inject(CitaService);

  dni = '';
  citas = signal<Cita[]>([]);
  buscado = signal<boolean>(false);

  buscar(): void {
    if (!/^\d{8}$/.test(this.dni)) return;
    this.citaService.listarPorPaciente(this.dni).subscribe((data) => {
      this.citas.set(data);
      this.buscado.set(true);
    });
  }

  fecha(iso: string): string {
    // "2026-10-10T10:00" -> "10/10/2026 10:00"
    const [f, h] = iso.split('T');
    const [a, m, d] = f.split('-');
    return `${d}/${m}/${a} ${h.substring(0, 5)}`;
  }
}
