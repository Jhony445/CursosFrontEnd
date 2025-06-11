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

    const credentials: LoginRequest = {
      correo: this.loginForm.value.email,
      contrasena: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        const role = this.authService.getUserRole();

        if (role === 'Instructor') {
          this.router.navigate(['/instructores']);
        } else if (role === 'Estudiante') {
          this.router.navigate(['/cursos']);
        } else {
          this.errorMessage = 'Rol no reconocido.';
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Correo o contraseña incorrectos.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
