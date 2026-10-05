import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita, NuevaCita } from '../modelos/Cita';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/citas';

  reservar(cita: NuevaCita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  listarPorPaciente(dni: string): Observable<Cita[]> {
    const params = new HttpParams().set('dni', dni);
    return this.http.get<Cita[]>(this.apiUrl, { params });
  }
}
