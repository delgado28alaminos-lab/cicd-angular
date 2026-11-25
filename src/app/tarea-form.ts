import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-tarea-form',
  template: `
    <form (submit)="enviar($event)">
      <input
        name="titulo"
        placeholder="Nueva tarea"
        [value]="texto()"
        (input)="texto.set($any($event.target).value)"
      />
      <button type="submit" [disabled]="!texto().trim()">Añadir</button>
    </form>
  `,
})
export class TareaForm {
  readonly texto = signal('');
  readonly nueva = output<string>();

  enviar(evento: Event): void {
    evento.preventDefault();
    const valor = this.texto().trim();
    if (!valor) {
      return;
    }
    this.nueva.emit(valor);
    this.texto.set('');
  }
}
