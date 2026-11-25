import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaLista } from './tarea-lista';
import { TareasService } from './tareas.service';

describe('TareaLista', () => {
  let fixture: ComponentFixture<TareaLista>;
  let el: HTMLElement;
  let servicio: TareasService;

  const filas = () => Array.from(el.querySelectorAll('li'));
  const resumen = () => el.querySelector('.resumen')!.textContent!.trim();

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TareaLista] }).compileComponents();
    servicio = TestBed.inject(TareasService);
    fixture = TestBed.createComponent(TareaLista);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('muestra un mensaje cuando no hay tareas', () => {
    expect(el.querySelector('.vacia')?.textContent).toContain('No hay tareas');
    expect(resumen()).toBe('Pendientes: 0');
    expect(filas().length).toBe(0);
  });

  it('pinta una fila por cada tarea del servicio', () => {
    servicio.agregar('Primera');
    servicio.agregar('Segunda');
    fixture.detectChanges();

    expect(filas().map((li) => li.querySelector('.titulo')!.textContent!.trim())).toEqual([
      'Primera',
      'Segunda',
    ]);
    expect(resumen()).toBe('Pendientes: 2');
    expect(el.querySelector('.vacia')).toBeNull();
  });

  it('marca la tarea como hecha al hacer clic en su título', () => {
    servicio.agregar('Leer');
    fixture.detectChanges();

    (el.querySelector('.titulo') as HTMLElement).click();
    fixture.detectChanges();

    expect(filas()[0].classList).toContain('hecha');
    expect(resumen()).toBe('Pendientes: 0');
  });

  it('elimina la tarea al pulsar Eliminar', () => {
    servicio.agregar('Borrar');
    fixture.detectChanges();

    (el.querySelector('li button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(filas().length).toBe(0);
    expect(servicio.tareas()).toEqual([]);
  });
});
