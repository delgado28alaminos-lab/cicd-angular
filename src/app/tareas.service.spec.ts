import { TestBed } from '@angular/core/testing';
import { TareasService } from './tareas.service';

describe('TareasService', () => {
  let servicio: TareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(TareasService);
  });

  it('empieza sin tareas', () => {
    expect(servicio.tareas()).toEqual([]);
    expect(servicio.pendientes()).toBe(0);
  });

  it('agrega tareas quitando espacios y con ids consecutivos', () => {
    const a = servicio.agregar('  Estudiar Angular  ');
    const b = servicio.agregar('Entregar práctica');

    expect(a).toEqual({ id: 1, titulo: 'Estudiar Angular', hecha: false });
    expect(b?.id).toBe(2);
    expect(servicio.tareas().length).toBe(2);
    expect(servicio.pendientes()).toBe(2);
  });

  it('no agrega tareas vacías', () => {
    expect(servicio.agregar('   ')).toBeNull();
    expect(servicio.tareas()).toEqual([]);
  });

  it('alterna el estado solo de la tarea indicada', () => {
    const leer = servicio.agregar('Leer')!;
    servicio.agregar('Escribir');

    servicio.alternar(leer.id);
    expect(servicio.tareas()[0].hecha).toBe(true);
    expect(servicio.tareas()[1].hecha).toBe(false);
    expect(servicio.pendientes()).toBe(1);

    servicio.alternar(leer.id);
    expect(servicio.tareas()[0].hecha).toBe(false);
  });

  it('elimina una tarea por id', () => {
    const a = servicio.agregar('A')!;
    servicio.agregar('B');

    servicio.eliminar(a.id);

    expect(servicio.tareas().map((t) => t.titulo)).toEqual(['B']);
  });
});
