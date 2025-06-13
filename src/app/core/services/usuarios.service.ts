// src/app/core/services/usuarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://localhost:7021/api/Usuario';

  constructor(private http: HttpClient) {}

  /**
   * @param payload Datos del nuevo usuario (nombre, correo, contraseña y rol).
   * @returns Observable con la respuesta { tipoError, mensaje }.
   */
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/crear`,
      payload
    );
  }
}
