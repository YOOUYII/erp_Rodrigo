import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ToastModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  
})
export class App {
  title = 'ERP Rodrigo';
}

