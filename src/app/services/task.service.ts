import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // --- SIGNAL : source de vérité réactive ---
  private tasks = signal<Task[]>([
    { id: 1, title: 'Apprendre Angular', priority: 'high',   done: false, createdAt: new Date() },
    { id: 2, title: 'Boire un café',     priority: 'low',    done: true,  createdAt: new Date() },
  ]);

  // Exposition en lecture seule
  readonly allTasks = this.tasks.asReadonly();

  // --- COMPUTED : dérivé automatiquement des signals ---
  readonly remaining = computed(() =>
    this.tasks().filter(t => !t.done).length
  );

  addTask(title: string, priority: Task['priority']): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      done: false,
      createdAt: new Date(),
    };
    // update() reçoit l'ancienne valeur et renvoie la nouvelle
    this.tasks.update(list => [...list, newTask]);
  }

  toggleDone(id: number): void {
    this.tasks.update(list =>
      list.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }

  removeTask(id: number): void {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }
}


 //Concept — Service + Injection de dépendances (DI) : @Injectable({ providedIn: 'root' }) enregistre le service comme singleton disponible dans toute l'app. On ne fait jamais new TaskService() : c'est Angular qui crée l'instance et l'injecte là où on la demande.

 //Concept — Signals : signal() contient une valeur réactive. On la lit en l'appelant comme une fonction (this.tasks()) et on la modifie avec .set() ou .update(). computed() recalcule automatiquement quand les signals dont il dépend changent — ici remaining se met à jour tout seul dès qu'une tâche change.