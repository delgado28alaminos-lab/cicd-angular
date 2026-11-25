import { Injectable, computed, signal } from '@angular/core';

export interface Tarea {
  id: number;
  titulo: string;
  hecha: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private siguienteId = 1;
  private readonly lista = signal<Tarea[]>([]);

  readonly tareas = this.lista.asReadonly();
  readonly pendientes = computed(() => this.lista().filter((t) => !t.hecha).length);

  agregar(titulo: string): Tarea | null {
    const limpio = titulo.trim();
    if (!limpio) {
      return null;
    }
    const tarea: Tarea = { id: this.siguienteId++, titulo: limpio, hecha: false };
    this.lista.update((tareas) => [...tareas, tarea]);
    return tarea;
  }

  alternar(id: number): void {
    this.lista.update((tareas) => tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  eliminar(id: number): void {
    this.lista.update((tareas) => tareas.filter((t) => t.id !== id));
  }
}
