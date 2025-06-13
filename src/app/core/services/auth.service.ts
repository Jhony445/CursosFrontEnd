import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/usuario.model';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  unique_name: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Instructor' | 'Estudiante';
  exp: number;
  iss: string;
  aud: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7021/api/Usuario/login';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, data).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);

        const decoded = jwtDecode<JwtPayload>(response.token);
        const expirationDate = decoded.exp * 1000; // convertir a milisegundos
        localStorage.setItem('auth_expire', expirationDate.toString());
      })
    );
  }


logout(): void {
  ['auth_token', 'auth_expire'].forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}


  isLoggedIn(): boolean {
    const expire = sessionStorage.getItem('auth_expire') || localStorage.getItem('auth_expire');
    if (!expire) return false;

    if (Date.now() > +expire) {
      this.logout();
      return false;
    }
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
  }

  getUserRole(): 'Instructor' | 'Estudiante' | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
