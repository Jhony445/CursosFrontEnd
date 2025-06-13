export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  rol: 'Instructor' | 'Estudiante';
}

export interface RegisterResponse {
  tipoError: number;
  mensaje: string;
}