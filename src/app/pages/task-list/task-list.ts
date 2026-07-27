import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { PriorityIconPipe } from '../../pipes/priority-icon-pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  // IMPORTS : un composant standalone déclare ses propres dépendances
  imports: [RouterLink, DatePipe, PriorityIconPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  // inject() : alternative moderne au constructeur pour la DI
  private taskService = inject(TaskService);

  // On expose les données du service au template
  tasks = this.taskService.allTasks;
  remaining = this.taskService.remaining;

  // Filtre local, en signal
  filter = signal<'all' | 'active' | 'done'>('all');

  // Liste filtrée dérivée (computed)
  visibleTasks = computed(() => {
    const f = this.filter();
    return this.tasks().filter(t =>
      f === 'all' ? true : f === 'done' ? t.done : !t.done
    );
  });

  // --- LIFECYCLE HOOK ---
  ngOnInit(): void {
    console.log('TaskListComponent initialisé');
  }

  setFilter(f: 'all' | 'active' | 'done'): void {
    this.filter.set(f);
  }

  toggle(id: number): void {
    this.taskService.toggleDone(id);
  }

  remove(id: number): void {
    this.taskService.removeTask(id);
  }
}

//Concept — Composant : classe + template + styles, associés par le décorateur @Component. Le selector est la balise HTML qui l'insère.

//Concept — Data binding (4 formes visibles ici) :

//Interpolation {{ remaining() }} — affiche une valeur.
//Property binding [class.done]="task.done" — lie une propriété du DOM.
//Event binding (click)="toggle(...)" — réagit à un événement.
//(Le two-way [(ngModel)] arrive à l'étape suivante.)

//Concept — Directives / control flow : @if, @else, @for remplacent les anciens *ngIf/*ngFor. Le track task.id aide Angular à suivre les éléments pour un rendu performant.

//Concept — Lifecycle hooks : ngOnInit() s'exécute une fois, après la création du composant. Autres hooks utiles : ngOnChanges (inputs modifiés), ngOnDestroy (nettoyage).