import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

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
    PasswordModule
  ],
  templateUrl: './register.html'
})
export class Register {
  title = 'Mi Aplicación';

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: "/" },
    { label: 'Iniciar Sesion', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/register' }
  ];

  usuario: string = '';
  email: string = '';
  nombreCompleto: string = '';
  direccion: string = '';
  password: string = '';
  confirmPassword: string = '';

  register() {
    console.log({
      usuario: this.usuario,
      email: this.email,
      nombreCompleto: this.nombreCompleto,
      direccion: this.direccion,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }
}