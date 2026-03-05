import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  
})
export class App {
  title = 'ERP Rodrigo';
}

