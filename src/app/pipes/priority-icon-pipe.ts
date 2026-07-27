import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({ name: 'priorityIcon', standalone: true })
export class PriorityIconPipe implements PipeTransform {
  transform(priority: Task['priority']): string {
    const icons = { low: '🟢', medium: '🟡', high: '🔴' };
    return icons[priority] ?? '⚪';
  }
}


//Utilisation dans un template : {{ task.priority | priorityIcon }}.

//Concept — Pipes : ils transforment l'affichage sans modifier la donnée. Angular en fournit des intégrés (date, currency, uppercase, async…) et on peut créer les siens en implémentant PipeTransform.