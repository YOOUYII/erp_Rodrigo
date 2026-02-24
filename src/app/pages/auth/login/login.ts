import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

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
    PasswordModule
  ],
  templateUrl: './login.html'
})
export class Login {
  title = 'Mi Aplicación';

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: "/" },
    { label: 'Iniciar Sesion', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/register' }
  ];

  email: string = '';
  password: string = '';

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}