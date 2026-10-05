import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../servicios/medico.service';
import { Medico } from '../../modelos/Medico';

@Component({
  selector: 'app-lista-medicos',
  imports: [RouterLink, FormsModule],
  templateUrl: './lista-medicos.html',
  styleUrl: './lista-medicos.css',
})
export class ListaMedicos implements OnInit {
  private medicoService = inject(MedicoService);

  medicos = signal<Medico[]>([]);
  cargando = signal<boolean>(false);

  especialidad = '';
  distrito = '';

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.cargando.set(true);
    this.medicoService.listar(this.especialidad, this.distrito).subscribe({
      next: (data) => {
        this.medicos.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  limpiar(): void {
    this.especialidad = '';
    this.distrito = '';
    this.buscar();
  }
}
