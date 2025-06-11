import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 👈 Importar Router

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  currentStep = 1;
  selectedRole: string | null = null;
  showPassword = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { // 👈 Inyectar Router
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['']
    });
  }

  nextStep() {
    console.log('>> nextStep llamado. Validaciones:', {
      name: this.registerForm.get('name')?.valid,
      email: this.registerForm.get('email')?.valid,
      password: this.registerForm.get('password')?.valid,
      formStatus: this.registerForm.status
    });
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

  selectRole(role: string) {
    this.selectedRole = role;
    this.registerForm.patchValue({ role });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Datos enviados:', this.registerForm.value);
      // Aquí puedes llamar a tu servicio de registro o lo que necesites
    }
  }

  submitForm() {
    if (this.selectedRole) {
      console.log('Form submitted:', this.registerForm.value);
      setTimeout(() => {
        this.currentStep = 3;
      }, 500);
    }
  }

  // 👇 Redirección final basada en el rol
  finalRedirect() {
    if (this.selectedRole === 'instructor') {
      this.router.navigate(['/instructores']);
    } else {
      this.router.navigate(['/cursos']);
    }
  }
}
