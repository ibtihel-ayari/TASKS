import { Routes } from '@angular/router';
import { TaskList } from './pages/task-list/task-list';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  {
    path: 'tasks/new',
    // LAZY LOADING : le composant n'est chargé qu'à la visite de la route
    loadComponent: () =>
      import('./pages/task-form/task-form')
        .then(m => m.TaskForm),
  },
  { path: '**', redirectTo: 'tasks' }, // route "catch-all"
];

//Concept — Routing : le Router associe une URL à un composant. redirectTo redirige, ** attrape les URLs inconnues. loadComponent fait du lazy loading : le code n'est téléchargé que quand on en a besoin, ce qui allège le chargement initial. Des guards (non montrés ici) permettent de protéger des routes (ex. authentification).