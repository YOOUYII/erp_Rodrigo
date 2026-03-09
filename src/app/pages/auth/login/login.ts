import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule,NonNullableFormBuilder,Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html'
})
export class Login {

  private fb = inject(NonNullableFormBuilder);
  constructor(
    private router: Router, 
    private messageService: MessageService
  ) {}

  private readonly USER_EMAIL = 'rodri@gmail.com';
  private readonly USER_PASSWORD = 'Rodri12!';

readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage = '';

  login(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    if (email === this.USER_EMAIL && password === this.USER_PASSWORD) {

      // SE GUARDARIA LA SESION EN LLOCAL STORAGE
      localStorage.setItem('isLoggedIn', 'true');
      // REDIRECCION

      this.router.navigate(['/admin']).then(() => {
        this.messageService.add({ 
          key: 'loginAlerts',
          severity: 'success', 
          summary: '¡Bienvenido!', 
          detail: 'Sesión Iniciada Correctamente' 
        });
      });

    } else {2
      this.messageService.add({ 
        key: 'loginAlerts',
        severity: 'error', 
        summary: 'Error al Iniciar Sesion', 
        detail: 'Credenciales Incorrectas' 
      });
    }
  }
}