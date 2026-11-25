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

  // Métodos añadidos SIN tests para demostrar que la CI bloquea la PR si baja la cobertura.
  completarTodas(): void {
    this.lista.update((tareas) => tareas.map((t) => ({ ...t, hecha: true })));
  }

  borrarCompletadas(): void {
    this.lista.update((tareas) => tareas.filter((t) => !t.hecha));
  }

  renombrar(id: number, titulo: string): void {
    this.lista.update((tareas) => tareas.map((t) => (t.id === id ? { ...t, titulo } : t)));
  }

  buscar(texto: string): Tarea[] {
    return this.lista().filter((t) => t.titulo.toLowerCase().includes(texto.toLowerCase()));
  }

  porcentajeHechas(): number {
    const total = this.lista().length;
    if (total === 0) {
      return 0;
    }
    return Math.round(((total - this.pendientes()) / total) * 100);
  }
}
