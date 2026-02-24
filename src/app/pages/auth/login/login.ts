import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

import {ReactiveFormsModule,NonNullableFormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html'
})
export class Login {
  title = 'ERP Rodrigo';

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: "/" },
    { label: 'Iniciar Sesion', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/register' }
  ];

  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);


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
      this.router.navigate(['/']); 

    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}