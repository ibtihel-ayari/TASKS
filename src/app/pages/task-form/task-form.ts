import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    priority: ['medium' as 'low' | 'medium' | 'high', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, priority } = this.form.getRawValue();

    this.taskService.addTask(title.trim(), priority);
    this.router.navigate(['/tasks']);
  }
}


//N'oublie pas d'importer RouterLink dans les imports du composant si tu utilises routerLink ici aussi.

//Concept — Formulaires réactifs : la structure du formulaire vit dans la classe (FormGroup/FormControl via FormBuilder). On y attache la validation (Validators.required, minLength…). Le template s'y connecte avec [formGroup] et formControlName. C'est l'approche recommandée pour tout ce qui dépasse le formulaire trivial (l'autre approche, template-driven, utilise [(ngModel)] — le two-way binding).