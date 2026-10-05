import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../modelos/Medico';

/**
 * Servicio que encapsula las llamadas HTTP a la API de medicos.
 * Los componentes no conocen la URL ni HttpClient: solo piden datos aqui.
 */
@Injectable({ providedIn: 'root' })
export class MedicoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/medicos';

  listar(especialidad?: string, distrito?: string): Observable<Medico[]> {
    let params = new HttpParams();
    if (especialidad) params = params.set('especialidad', especialidad);
    if (distrito) params = params.set('distrito', distrito);
    return this.http.get<Medico[]>(this.apiUrl, { params });
  }

  obtener(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }

  disponibilidad(id: number, dia: string): Observable<string[]> {
    const params = new HttpParams().set('dia', dia);
    return this.http.get<string[]>(`${this.apiUrl}/${id}/disponibilidad`, { params });
  }

  crear(medico: Partial<Medico>): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }

  actualizar(id: number, medico: Partial<Medico>): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/${id}`, medico);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
