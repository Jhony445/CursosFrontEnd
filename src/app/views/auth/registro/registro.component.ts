// src/app/views/auth/registro/registro.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { RegisterRequest, RegisterResponse } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  currentStep = 1;
  selectedRole: 'Instructor' | 'Estudiante' | null = null;
  showPassword = false;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  nextStep() {
    if (
      this.currentStep === 1 &&
      this.registerForm.get('name')?.valid &&
      this.registerForm.get('email')?.valid &&
      this.registerForm.get('password')?.valid
    ) {
      this.currentStep = 2;
    } else {
      this.registerForm.get('name')?.markAsTouched();
      this.registerForm.get('email')?.markAsTouched();
      this.registerForm.get('password')?.markAsTouched();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectRole(role: 'Instructor' | 'Estudiante') {
    this.selectedRole = role;
    this.registerForm.patchValue({ role });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    if (this.registerForm.invalid || !this.selectedRole) {
      this.errorMessage = 'Por favor completa todos los campos y selecciona un rol.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const payload: RegisterRequest = {
      nombre: this.registerForm.value.name,
      correo: this.registerForm.value.email,
      contrasena: this.registerForm.value.password,
      rol: this.selectedRole
    };

    this.usuariosService.register(payload).subscribe({
      next: (res: RegisterResponse) => {
        this.loading = false;
        if (res.tipoError === 1) {
          this.successMessage = res.mensaje;
          this.currentStep = 3;
        } else {
          this.errorMessage = res.mensaje;
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Ocurrió un error al registrar. Intenta de nuevo más tarde.';
      }
    });
  }

  finalRedirect() {
    if (this.selectedRole === 'Instructor') {
      this.router.navigate(['/instructores']);
    } else {
      this.router.navigate(['/cursos']);
    }
  }
}
