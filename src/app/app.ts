import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav><a routerLink="/tasks">🏠 Accueil</a></nav>
    <main>
      <!-- Le composant de la route active s'affiche ici -->
      <router-outlet />
    </main>
  `,
})
export class App {}