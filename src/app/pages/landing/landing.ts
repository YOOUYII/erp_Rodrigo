import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule
  ],
  templateUrl: './landing.html'
})
export class Landing {
  title = 'Mi Aplicación';

  features = [
    { title: 'Rápido', description: 'Sistema optimizado y eficiente.' },
    { title: 'Seguro', description: 'Protección avanzada de datos.' },
    { title: 'Escalable', description: 'Crece junto a tu negocio.' }
  ];

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: "/" },
    { label: 'Iniciar Sesion', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/register' }
  ];
}