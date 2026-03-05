import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterModule
  ],
  templateUrl: './landing.html'
})
export class Landing {
  title = 'ERP Rodrigo';

  features = [
    { title: 'Rápido', description: 'Sistema optimizado y eficiente' },
    { title: 'Seguro', description: 'Proteccion avanzada de datos' },
    { title: 'Escalable', description: 'Crece junto a tu negocio' }
  ];

}