import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';

import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
});


//Concept — <router-outlet> : c'est l'emplacement où Angular injecte le composant correspondant à l'URL courante.

//Concept — bootstrap standalone : bootstrapApplication démarre l'app à partir du composant racine, sans NgModule. Les services globaux (routing, HttpClient…) sont fournis dans le tableau providers.