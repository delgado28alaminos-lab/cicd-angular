import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TareaForm } from './tarea-form';
import { TareaLista } from './tarea-lista';
import { TareasService } from './tareas.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TareaForm, TareaLista],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Práctica 4 CI/CD - Fernando Delgado');
  protected readonly tareas = inject(TareasService);
}
