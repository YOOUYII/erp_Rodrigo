import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule ,ButtonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  
})
export class App {
  protected readonly title = signal('erp_Rodrigo');
}

