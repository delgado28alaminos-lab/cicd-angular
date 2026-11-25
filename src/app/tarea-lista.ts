import { Component, inject } from '@angular/core';
import { TareasService } from './tareas.service';

@Component({
  selector: 'app-tarea-lista',
  template: `
    <p class="resumen">Pendientes: {{ servicio.pendientes() }}</p>
    @if (servicio.tareas().length === 0) {
      <p class="vacia">No hay tareas</p>
    } @else {
      <ul>
        @for (tarea of servicio.tareas(); track tarea.id) {
          <li [class.hecha]="tarea.hecha">
            <span class="titulo" (click)="servicio.alternar(tarea.id)">{{ tarea.titulo }}</span>
            <button type="button" (click)="servicio.eliminar(tarea.id)">Eliminar</button>
          </li>
        }
      </ul>
    }
  `,
  styles: `
    .hecha .titulo {
      text-decoration: line-through;
      opacity: 0.6;
    }
    .titulo {
      cursor: pointer;
      margin-right: 0.5rem;
    }
  `,
})
export class TareaLista {
  protected readonly servicio = inject(TareasService);
}
