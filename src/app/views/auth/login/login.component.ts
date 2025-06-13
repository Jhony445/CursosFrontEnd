import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;
  errorMessage: string | null = null;
  shakeAlert = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.shakeAlert = false;

    const credentials: LoginRequest = {
      correo: this.loginForm.value.email,
      contrasena: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const token = response.token;
        const remember = this.loginForm.value.rememberMe as boolean;
        const expireAt = Date.now() + 20 * 60 * 1000; // 20 minutos

        if (remember) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('auth_expire', expireAt.toString());
          // Borra cualquier sesión previa
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('auth_expire');
        } else {
          sessionStorage.setItem('auth_token', token);
          sessionStorage.setItem('auth_expire', expireAt.toString());
          // Borra cualquier token recordado
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_expire');
        }

        // Ahora redirige según rol
        const role = this.authService.getUserRole();
        if (role === 'Instructor') {
          this.router.navigate(['/instructores']);
        } else if (role === 'Estudiante') {
          this.router.navigate(['/cursos']);
        } else {
          this.showError('Rol no reconocido.');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.showError('Correo o contraseña incorrectos.');
        this.loading = false;
      }
    });
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.shakeAlert = true;

    setTimeout(() => {
      this.shakeAlert = false;
    }, 600);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}