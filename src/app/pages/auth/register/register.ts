import { Component, inject } from '@angular/core';
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
  selector: 'app-register',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './register.html'
})
export class Register {
  title = 'ERP Rodrigo';

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: "/" },
    { label: 'Iniciar Sesion', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/register' }
  ];

private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  // - mínimo 10 caracteres
  // - al menos 1 símbolo especial: !@#$%^&*
  private readonly passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

  readonly registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [, [Validators.required, Validators.min(18)]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/)
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern(this.passwordPattern)
    ]]
  });

  register(): void {
    if (this.registerForm.invalid) return;

    const userData = this.registerForm.getRawValue();

    console.log('Usuario registrado:', userData);

    // SE GUARDARIA EL REGISTRO EN LLOCAL STORAGE
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    // REDIRECCION
    this.router.navigate(['/login']);
  }
}